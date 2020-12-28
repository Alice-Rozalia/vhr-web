import {
  fetchRolesApi,
  fetchMenusApi
} from '@/api/permission'
import {
  reactive
} from 'vue'

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
    slots: {
      customRender: 'action'
    }
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
  }
})

// 分配权限
const assignPermissions = data => {
  state.visible = true
  initMenus()
}

// 展开表格
const open = (flag, record) => {
  if (flag) {
    console.log('展开' + record.id);
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

export {
  state,
  assignPermissions,
  initRoles,
  initMenus,
  open
}