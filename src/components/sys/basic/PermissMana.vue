<template>
  <div>
    <!-- 添加角色区域 -->
    <div>
      <a-input addon-before="ROLE_" v-model:value="permission.name" placeholder="请输入角色英文名..." size="small"
        style="width: 280px;" />
      <a-input v-model:value="permission.nameZh" placeholder="请输入角色的中文名称..." size="small" style="width: 220px;"
        class="permission-name-input" />
      <a-button type="primary" size="small">添加角色</a-button>
    </div>

    <!-- 表格区域 -->
    <div class="table-container">
      <a-table :columns="columns" @expand="open" :data-source="roles" :pagination="false" bordered rowKey="id" size="middle">
        <template #action="{ record }">
          <a-button type="danger" size="small" @click="assignPermissions(record)" class="delelet-btn">
            删除
          </a-button>
          <a-button type="primary" size="small" @click="assignPermissions(record)">
            分配权限
          </a-button>
        </template>
        <template #expandedRowRender="{ record }">
          <p style="margin: 0">
            {{ record }}
          </p>
        </template>
      </a-table>
    </div>

    <a-modal title="分配权限" v-model:visible="visible" ok-text="确定" cancel-text="取消">
      <a-tree checkable :tree-data="menus" :replace-fields="replaceFields" />
    </a-modal>
  </div>
</template>

<script>
  import {
    state,
    assignPermissions,
    initRoles,
    open
  } from '@/hooks/system/permission'
  import {
    toRefs,
    onMounted
  } from 'vue'

  export default {
    name: 'PermissMana',
    setup() {
      onMounted(() => {
        initRoles()
      })

      return {
        ...toRefs(state),
        assignPermissions,
        open
      }
    }
  }
</script>

<style lang="less" scoped>
  .permission-name-input {
    margin: 0 15px;
  }

  .table-container {
    margin: 15px 0;

    .delelet-btn {
      margin-right: 8px;
    }
  }
</style>