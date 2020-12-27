import {
  fetchJobLevelsApi,
  addJobLevelApi,
  deleteJobLevelApi,
  editJobLevelApi,
  deleteManyApi
} from '@/api/jobLevel'
import { reactive, computed, createVNode } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

const columns = [{
    title: '编号',
    dataIndex: 'id',
    align: 'center',
    width: 70
  },
  {
    title: '职称名称',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true
  },
  {
    title: '职称级别',
    dataIndex: 'titleLevel',
    align: 'center',
    width: 110,
    ellipsis: true
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    align: 'center',
    width: 140,
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'enabled',
    width: 100,
    align: 'center',
    slots: {
      customRender: 'tags'
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 140,
    align: 'center',
    slots: {
      customRender: 'action'
    }
  }
]

const state = reactive({
  joblevel: {
    name: '',
    titleLevel: '员级'
  },
  titleLevel: ['正高级', '副高级', '中级', '初级', '员级'],
  columns: columns,
  selectedRowKeys: [],
  hasSelected: computed(() => state.selectedRowKeys.length > 0),
  jobs: [],
  visible: false,
  updateJobLevel: {
    name: '',
    titleLevel: '',
    enabled: false
  }
})

const addJobLevel = async () => {
  if (state.joblevel.name) {
    const { data } = await addJobLevelApi(state.joblevel)
    if (data.success) {
      message.success(data.message)
      initJobLevel()
      state.joblevel.name = ''
    }
  } else {
    message.warning('职称名称不能为空！')
  }
}

const handleDelete = job => {
  Modal.confirm({
    title: '此操作将删除【' + job.name + '】职称，是否继续？',
    icon: createVNode(ExclamationCircleOutlined),
    cancelText: '取消',
    okText: '删除',
    async onOk() {
      const { data } = await deleteJobLevelApi(job.id)
      if (data.success) {
        message.success(data.message)
        initJobLevel()
      }
    },
    onCancel() {
      message.info('操作已取消！')
    }
  })
}

const showEditView = data => {
  Object.assign(state.updateJobLevel, data)
  state.visible = true
}

const handleEdit = async () => {
  const { data } = await editJobLevelApi(state.updateJobLevel)
  if (data.success) {
    message.success(data.message)
    initJobLevel()
    state.visible = false
  }
}

const deleteMany = () => {
  Modal.confirm({
    title: '此操作将删除【' + state.selectedRowKeys.length + '】条记录，是否继续？',
    icon: createVNode(ExclamationCircleOutlined),
    cancelText: '取消',
    okText: '删除',
    async onOk() {
      const { data } = await deleteManyApi(state.selectedRowKeys)
      if (data.success) {
        message.success(data.message)
        initJobLevel()
      }
    },
    onCancel() {
      message.info('操作已取消！')
    }
  })
}

const onSelectChange = selectedRowKeys => {
  state.selectedRowKeys = selectedRowKeys
}

const initJobLevel = async () => {
  const { data } = await fetchJobLevelsApi()
  state.jobs = data.data.job_level
}

export {
  state,
  addJobLevel,
  onSelectChange,
  initJobLevel,
  handleDelete,
  handleEdit,
  showEditView,
  deleteMany
}