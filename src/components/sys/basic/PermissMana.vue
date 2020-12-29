<template>
  <div>
    <!-- 添加角色区域 -->
    <div>
      <a-input addon-before="ROLE_" v-model:value="permission.name" placeholder="请输入角色英文名..." size="small"
        style="width: 280px;" />
      <a-input v-model:value="permission.nameZh" placeholder="请输入角色的中文名称..." size="small" style="width: 220px;"
        class="permission-name-input" />
      <a-button type="primary" size="small" @click="doAddRole">添加角色</a-button>
    </div>

    <!-- 表格区域 -->
    <div class="table-container">
      <a-table :columns="columns" @expand="open" :data-source="roles" :pagination="false" bordered rowKey="id"
        size="middle" style="width: 840px;">
        <template #action="{ record }">
          <a-button type="danger" size="small" @click="deleteRole(record)" class="delelet-btn">
            删除
          </a-button>
          <a-button type="primary" size="small" @click="assignPermissions(record)">
            分配权限
          </a-button>
        </template>
        <template #expandedRowRender="{}">
          <a-row :class="['bdbottom', i === 0 ? 'bdtop' : '', 'vcenter']" v-for="(item, i) in roleMenus" :key="i">
            <a-col :span="5">
              <a-tag color="#2db7f5">{{ item.name }} </a-tag> <CaretRightOutlined />
            </a-col>
            <a-col :span="19">
              <a-row :class="[index === 0 ? '' : 'bdtop', 'vcenter']" v-for="(val, index) in item.children" :key="val.id">
                <a-col>
                  <a-tag color="#87d068">{{ val.name }} </a-tag>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </template>
      </a-table>
    </div>

    <a-modal title="分配权限" @ok="doAssign" v-model:visible="visible" ok-text="确定" cancel-text="取消">
      <a-tree checkable :tree-data="menus" v-model:selectedKeys="selectMenus" v-model:checkedKeys="selectMenus" :replace-fields="replaceFields" />
    </a-modal>
  </div>
</template>

<script>
  import {
    state,
    assignPermissions,
    initRoles,
    open,
    doAssign,
    doAddRole,
    deleteRole
  } from '@/hooks/system/permission'
  import { CaretRightOutlined } from '@ant-design/icons-vue'
  import { toRefs, onMounted } from 'vue'

  export default {
    name: 'PermissMana',
    components: {
      CaretRightOutlined
    },
    setup() {
      onMounted(() => {
        initRoles()
      })

      return {
        ...toRefs(state),
        assignPermissions,
        open,
        doAssign,
        doAddRole,
        deleteRole
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

  .ant-tag {
    margin: 7px;
  }

  .bdtop {
    border-top: 1px solid #eee;
  }

  .bdbottom {
    border-bottom: 1px solid #eee;
  }

  .vcenter {
    display: flex;
    align-items: center;
  }
</style>