<template>
  <div>
    <!-- 表单输入框 -->
    <a-input placeholder="添加职位" class="add-input" v-model:value="positionName" ref="addInput">
      <template #prefix>
        <PlusOutlined />
      </template>
    </a-input>

    <!-- 添加按钮 -->
    <a-button type="primary">
      <template #icon>
        <PlusOutlined /></template>添加
    </a-button>
  </div>

  <div class="table-container">
    <a-table :columns="columns" :rowKey="() => {}" :data-source="positions" bordered style="width: 840px">
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #operation="{ record }">
        <a-button type="primary" size="small" style="margin-right: 5px">
          编辑
        </a-button>
        <a-button type="danger" size="small" @click="test(record)">
          删除
        </a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
  import {
    PlusOutlined
  } from '@ant-design/icons-vue'
  import {
    toRefs,
    reactive,
    onMounted
  } from 'vue'
  import { getPositionsApi } from '@/api/position'

  const columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: 70
    },
    {
      title: '职位名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      ellipsis: true
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 135,
      slots: { customRender: 'operation' }
    }
  ]

  export default {
    name: 'PosMana',
    components: {
      PlusOutlined
    },
    setup() {
      const state = reactive({
        positionName: '',
        positions: [],
        columns: columns
      })

      const test = (data) => {
        console.log(data.age);
      }

      const initPositions = async () => {
        const { data } = await getPositionsApi()
        state.positions = data.data.positions
      }

      onMounted(() => {
        initPositions()
      })

      return {
        ...toRefs(state),
        test
      }
    }
  }
</script>

<style lang="less" scoped>
  .add-input {
    width: 380px;
    margin-right: 15px;
  }

  .table-container {
    margin: 15px 0;
  }
</style>