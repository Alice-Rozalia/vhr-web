import {
  fetchRolesApi,
  fetchMenusApi,
  fetchMenusByRidApi,
  fetchMidsByRidApi,
  updateMenuRoleApi,
  addRoleApi,
  deleteRoleByIdApi
} from '@/api/permission'
import { reactive, createVNode } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

const columns = [{
    title: '编号',
    align: 'center',
    dataIndex: 'id',
    width: 60
  },
  {
    title: '权限标识',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '角色名称',
    align: 'center',
    dataIndex: 'nameZh'
  },
  {
    title: '操作',
    align: 'center',
    width: 180,
    slots: { customRender: 'action' }
  }
]

const state = reactive({
  permission: {
    name: '',
    nameZh: ''
  },
  columns: columns,
  roles: [],
  visible: false,
  menus: [],
  replaceFields: {
    title: 'name',
    key: 'id'
  },
  roleMenus: [],
  selectMenus: [],
  // 用户点击的是那个角色的分配权限按钮
  roleId: 0
})

// 分配权限
const assignPermissions = data => {
  state.visible = true
  initMenus()
  initSelectedMenus(data.id)
  state.roleId = data.id
}

// 展开表格
const open = async (flag, record) => {
  if (flag) {
    const { data } = await fetchMenusByRidApi(record.id)
    state.roleMenus = data.data.menus
  }
}

const initRoles = async () => {
  const { data } = await fetchRolesApi()
  state.roles = data.data.roles
}

const initMenus = async () => {
  const { data } = await fetchMenusApi()
  state.menus = data.data.menus
}

const initSelectedMenus = async rid => {
  const { data } = await fetchMidsByRidApi(rid)
  state.selectMenus = data.data.mids
}

// 分配权限
const doAssign = async () => {
  state.visible = false
  state.selectMenus.forEach((item, index) => {
    if (item === 2 || item === 3 || item === 4 || item === 5 || item === 6) {
      state.selectMenus.splice(index, 1)
    }
  })
  const { data } = await updateMenuRoleApi(state.roleId, state.selectMenus)
  if (data.success) {
    message.success(data.message)
  }
}

const doAddRole = async () => {
  if (state.permission.name.trim() === '' || state.permission.nameZh.trim() === '') return message.warning('请输入必要的数据！')
  const { data } = await addRoleApi(state.permission)
  if (data.success) {
    message.success(data.message)
    initRoles()
    state.permission.name = ''
    state.permission.nameZh = ''
  }
}

const deleteRole = role => {
  Modal.confirm({
    title: '此操作将删除【' + role.nameZh + '】角色，是否继续？',
    icon: createVNode(ExclamationCircleOutlined),
    cancelText: '取消',
    okText: '删除',
    async onOk() {
      const { data } = await deleteRoleByIdApi(role.id)
      if (data.success) {
        message.success(data.message)
        initRoles()
      }
    },
    onCancel() {
      message.info('操作已取消！')
    }
  })
}

export {
  state,
  assignPermissions,
  initRoles,
  initMenus,
  open,
  doAssign,
  doAddRole,
  deleteRole
}