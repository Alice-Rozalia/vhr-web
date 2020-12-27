<template>
  <div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-input v-model:value="value" @pressEnter="check" />
      <check-outlined class="editable-cell-icon-check" @click="check" />
    </div>
    <div v-else class="editable-cell-text-wrapper">
      {{value || ' '}}
      <edit-outlined class="editable-cell-icon" @click="edit" />
    </div>
  </div>
</template>

<script>
  import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
  import { toRefs, reactive } from 'vue'

  export default {
    name: 'EditableCell',
    components: {
      CheckOutlined,
      EditOutlined
    },
    props: {
      text: String,
      record: Object,
      onChange: Function
    },
    setup(props, { emit }) {
      const state = reactive({
        value: props.text,
        editable: false
      })

      const check = () => {
        state.editable = false
        if (state.value === props.record.name) return
        emit('change', state.value)
      }

      const edit = e => {
        const value = e.target.value
        state.editable = true
      }

      return {
        ...toRefs(state),
        check,
        edit
      }
    }
  }
</script>

<style lang="less" scoped>
  .editable-cell {
    position: relative;

    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
      padding-right: 24px;
    }

    .editable-cell-text-wrapper {
      padding: 5px 24px 5px 5px;
    }

    .editable-cell-icon,
    .editable-cell-icon-check {
      position: absolute;
      right: 0;
      width: 20px;
      cursor: pointer;
    }

    .editable-cell-icon {
      line-height: 18px;
      display: none;
    }

    .editable-cell-icon-check {
      line-height: 28px;
    }

    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
      color: #108ee9;
    }

    .editable-add-btn {
      margin-bottom: 8px;
    }
  }

  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }
</style>