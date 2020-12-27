import {
  reactive
} from 'vue'

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
    ellipsis: true
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
})

const addJobLevel = () => {

}

export {
  state,
  addJobLevel
}