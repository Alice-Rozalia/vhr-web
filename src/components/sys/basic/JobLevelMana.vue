<template>
  <div>
    <!-- 添加菜单栏 -->
    <div>
      <!-- 表单输入框 -->
      <a-input placeholder="添加职称" style="width: 360px;" v-model:value="joblevel.name">
        <template #prefix>
          <PlusOutlined />
        </template>
      </a-input>
      <!-- 职称等级选择框 -->
      <a-select v-model:value="joblevel.titleLevel" class="add-select">
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
      <a-table :columns="columns" :pagination="false" rowKey="id" size="middle"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" :data-source="jobs" bordered
        style="width: 840px">
        <template #name="{text}">
          <a>{{ text }}</a>
        </template>
        <template #tags="{ text: enabled }">
          <a-tag v-if="enabled" color="success">启用</a-tag>
          <a-tag v-else color="error">禁用</a-tag>
        </template>
        <template #action="{ record }">
          <a-button type="primary" size="small" @click="showEditView(record)" style="margin-right:8px;">
            修改
          </a-button>
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

    <a-modal v-model:visible="visible" title="修改职称" ok-text="修改" cancel-text="取消" @ok="handleEdit">
      <a-row align="middle" :gutter="[50, 20]">
        <a-col :span="4">
          <a-tag color="cyan">职称名称</a-tag>
        </a-col>
        <a-col :span="20">
          <a-input v-model:value="updateJobLevel.name" />
        </a-col>
      </a-row>

      <a-row align="middle" :gutter="[0, 20]">
        <a-col>
          <a-tag color="cyan">职称等级</a-tag>
        </a-col>
        <a-col>
          <a-select v-model:value="updateJobLevel.titleLevel" class="add-select">
            <a-select-option :value="item" v-for="item in titleLevel" :key="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-col>
      </a-row>

      <a-row align="middle" :gutter="[50, 20]">
        <a-col :span="4">
          <a-tag color="cyan">是否启用</a-tag>
        </a-col>
        <a-col :span="20">
          <a-switch v-model:checked="updateJobLevel.enabled" />
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
  import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'
  import { toRefs, onMounted } from 'vue'
  import {
    state,
    addJobLevel,
    onSelectChange,
    initJobLevel,
    handleDelete,
    handleEdit,
    showEditView,
    deleteMany
  } from '@/hooks/system/jobLevel'

  export default {
    name: 'JobLevelMana',
    components: {
      PlusOutlined,
      DeleteOutlined
    },
    setup() {
      onMounted(() => {
        initJobLevel()
      })

      return {
        ...toRefs(state),
        addJobLevel,
        onSelectChange,
        handleDelete,
        handleEdit,
        showEditView,
        deleteMany
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