<template>
  <div>
    <!-- 表单输入框 -->
    <a-input placeholder="添加职位" class="add-input" v-model:value="position.name" ref="addInput">
      <template #prefix>
        <PlusOutlined />
      </template>
    </a-input>

    <!-- 添加按钮 -->
    <a-button type="primary" @click="addPosition">
      <template #icon><PlusOutlined /></template>添加
    </a-button>
  </div>

  <div class="table-container">
    <a-alert message="鼠标移动到职位名称单元格上可进行修改" type="info" style="width: 840px" showIcon>
      <template #icon><smile-outlined /></template>
    </a-alert>
    <a-table
      :columns="columns"
      :pagination="false"
      rowKey="id"
      size="middle"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :data-source="positions"
      bordered
      style="width: 840px"
    >
      <template #name="{ text, record }">
        <editable-cell :text="text" :record="record" @change="val => handleEdit(record.id, val)" />
      </template>
      <template #tags="{ text: enabled }">
        <a-tag v-if="enabled" color="success">启用</a-tag>
        <a-tag v-else color="error">禁用</a-tag>
      </template>
      <template #action="{ record }">
        <a-button type="danger" size="small" @click="handleDelete(record)">
          删除
        </a-button>
      </template>
    </a-table>
  </div>

  <!-- 批量删除按钮 -->
  <a-button type="danger" @click="deleteMany" :disabled="!hasSelected">
    <template #icon><DeleteOutlined /></template>批量删除
  </a-button>
</template>

<script>
  import { PlusOutlined, SmileOutlined, DeleteOutlined } from '@ant-design/icons-vue'
  import { toRefs, onMounted } from 'vue'
  import EditableCell from '@/components/EditableCell.vue'
  import {
    state,
    handleEdit,
    handleDelete,
    addPosition,
    initPositions,
    deleteMany,
    onSelectChange
} from '@/hooks/system/position'

  export default {
    name: 'PosMana',
    components: {
      PlusOutlined,
      EditableCell,
      SmileOutlined,
      DeleteOutlined
    },
    setup() {
      onMounted(() => {
        initPositions()
      })

      return {
        ...toRefs(state),
        handleEdit,
        handleDelete,
        addPosition,
        deleteMany,
        onSelectChange
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