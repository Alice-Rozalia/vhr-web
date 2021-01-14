import {
  fetchHrListApi,
  updateHrStatusApi,
  fetchAllRolesApi,
  deleteHrByIdApi
} from '@/api/user'
import { message, Modal } from 'ant-design-vue'
import { reactive, createVNode } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

const state = reactive({
  keywords: '',
  hrs: [],
  allRoles: [],
  seletedRoles: []
})

const hrStatusChange = async hr => {
  delete hr.roles
  hr.enabled = !hr.enabled
  const { data } = await updateHrStatusApi(hr)
  if (data.success) {
    message.success(data.message)
    initHrs()
  }
}

const initHrs = async () => {
  const { data } = await fetchHrListApi(state.keywords)
  if (data.success) {
    state.hrs = data.data.hrs
  }
}

const initAllRoles = async () => {
  const { data } = await fetchAllRolesApi()
  if (data.success) {
    state.allRoles = data.data.roles
  }
}

const showPop = hr => {
  initAllRoles()
  let roles = hr.roles
  state.seletedRoles = []
  roles.forEach(r => {
    state.seletedRoles.push(r.id)
  })
}

const search = () => {
  initHrs()
}

const deleteHr = hr => {
  Modal.confirm({
    title: '此操作将删除【' + hr.name + '】用户，是否继续？',
    icon: createVNode(ExclamationCircleOutlined),
    cancelText: '取消',
    okText: '删除',
    async onOk() {
      const { data } = await deleteHrByIdApi(hr.id)
      if (data.success) {
        message.success(data.message)
        initHrs()
      }
    },
    onCancel() {
      message.info('操作已取消！')
    }
  })
}

export {
  state,
  initHrs,
  hrStatusChange,
  showPop,
  search,
  deleteHr
}