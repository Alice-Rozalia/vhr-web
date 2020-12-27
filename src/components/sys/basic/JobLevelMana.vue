<template>
  <div>
    <!-- 添加菜单栏 -->
    <div>
      <!-- 表单输入框 -->
      <a-input placeholder="添加职称" style="width: 360px;" v-model:value="joblevel.name" ref="addInput">
        <template #prefix>
          <PlusOutlined />
        </template>
      </a-input>
      <!-- 职称等级选择框 -->
      <a-select v-model:value="joblevel.titleLevel" class="add-select" @change="handleChange">
        <a-select-option :value="item" v-for="item in titleLevel" :key="item">
          {{ item }}
        </a-select-option>
      </a-select>
      <!-- 添加按钮 -->
      <a-button type="primary" @click="addJobLevel">
        <template #icon><PlusOutlined /></template>添加
      </a-button>
    </div>

    <!-- 表格区域 -->
    <div class="table-container">
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
        <template #name="{text}">
          <a>{{ text }}</a>
        </template>
        <template #action="{ record }">
          <a-button type="danger" size="small" @click="handleDelete(record)">
            删除
          </a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import {
    PlusOutlined
  } from '@ant-design/icons-vue'
  import {
    toRefs,
    onMounted
  } from 'vue'
  import {
    state,
    addJobLevel
  } from '@/hooks/system/jobLevel'

  export default {
    name: 'JobLevelMana',
    components: {
      PlusOutlined
    },
    setup() {
      const handleChange = (value) => {
        console.log(value);
      }

      return {
        ...toRefs(state),
        handleChange,
        addJobLevel
      }
    }
  }
</script>

<style lang="less" scoped>
  .add-select {
    width: 200px;
    margin: 0 15px;
  }

  .table-container {
    margin: 15px 0;
  }
</style>