<template>
  <div>
    <!-- 表单输入框 -->
    <a-input placeholder="添加职位" class="add-input" v-model:value="position" ref="addInput">
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
    <a-table :columns="columns" :data-source="data" bordered>
      <template #name="{text}">
        <a>{{ text }}</a>
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
    reactive
  } from 'vue'

  const columns = [{
      title: '编号',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: '职位名称',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '创建时间',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    }
  ];

  const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park, New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 2 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park'
    },
  ];

  export default {
    name: 'PosMana',
    components: {
      PlusOutlined
    },
    setup() {
      const state = reactive({
        position: '',
        data: data,
        columns: columns
      })

      return {
        ...toRefs(state)
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