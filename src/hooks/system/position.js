import {
  getPositionsApi,
  addPositionsApi,
  deletePositionsApi,
  editPositionsApi,
  deleteManyApi
} from '@/api/position'
import { reactive, createVNode, computed } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

const columns = [{
    title: '编号',
    dataIndex: 'id',
    align: 'center',
    width: 70
  },
  {
    title: '职位名称',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'name' }
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    align: 'center',
    width: 180,
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'enabled',
    width: 120,
    align: 'center',
    slots: { customRender: 'tags' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 100,
    align: 'center',
    slots: { customRender: 'action' }
  }
]

const state = reactive({
  position: {
    name: ''
  },
  positions: [],
  columns: columns,
  selectedRowKeys: [],
  hasSelected: computed(() => state.selectedRowKeys.length > 0)
})

const handleEdit = async (id, name) => {
  const { data } = await editPositionsApi({ id: id, name: name })
  if (data.success) {
    message.success(data.message)
    initPositions()
  }
}

const handleDelete = (pos) => {
  Modal.confirm({
    title: '此操作将删除【' + pos.name + '】职位，是否继续？',
    icon: createVNode(ExclamationCircleOutlined),
    cancelText: '取消',
    okText: '删除',
    async onOk() {
      const { data } = await deletePositionsApi(pos.id)
      if (data.success) {
        message.success(data.message)
        initPositions()
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
        initPositions()
      }
    },
    onCancel() {
      message.info('操作已取消！')
    }
  })
}

const addPosition = async () => {
  if (state.position.name) {
    const { data } = await addPositionsApi(state.position)
    if (data.success) {
      message.success(data.message)
      initPositions()
      state.position.name = ''
    }
  } else {
    message.warning('职位名称不能为空！')
  }
}

const initPositions = async () => {
  const { data } = await getPositionsApi()
  state.positions = data.data.positions
}

export {
  state,
  handleEdit,
  handleDelete,
  addPosition,
  initPositions,
  deleteMany,
  onSelectChange
}