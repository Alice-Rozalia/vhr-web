import { reactive, createVNode } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import {
  fetchEmployeeApi,
  fetchNationsApi,
  fetchPoliticsstatusApi,
  fetchMaxWorkIdApi,
  addEmployeeApi
} from '@/api/employee'
import { fetchJobLevelsApi } from '@/api/jobLevel'
import { getPositionsApi} from '@/api/position'
import { fetchDepartmentsApi } from '@/api/department'

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  align: 'center',
  width: 100,
  fixed: true
},
{
  title: '工号',
  dataIndex: 'workId',
  align: 'center',
  width: 80
},
{
  title: '状态',
  dataIndex: 'workState',
  align: 'center',
  width: 70,
  ellipsis: true
},
{
  title: '性别',
  dataIndex: 'gender',
  align: 'center',
  width: 50
},
{
  title: '出生日期',
  dataIndex: 'birthday',
  align: 'center',
  width: 90
},
{
  title: '身份证号码',
  dataIndex: 'idCard',
  width: 160,
  align: 'center'
},
{
  title: '婚姻状况',
  dataIndex: 'wedlock',
  align: 'center',
  width: 80
},
{
  title: '民族',
  dataIndex: ['nation', 'name'],
  align: 'center',
  width: 55
},
{
  title: '籍贯',
  dataIndex: 'nativePlace',
  align: 'center',
  width: 100,
},
{
  title: '政治面貌',
  dataIndex: ['politicsstatus', 'name'],
  align: 'center',
  width: 80
},
{
  title: '电子邮件',
  dataIndex: 'email',
  align: 'center',
  width: 130,
  ellipsis: true
},
{
  title: '电话号码',
  dataIndex: 'phone',
  align: 'center',
  width: 120,
  ellipsis: true
},
{
  title: '联系地址',
  dataIndex: 'address',
  align: 'center',
  width: 100,
  ellipsis: true
},
{
  title: '所属部门',
  dataIndex: ['department', 'name'],
  align: 'center',
  width: 80,
  ellipsis: true
},
{
  title: '职位',
  dataIndex: ['position', 'name'],
  align: 'center',
  width: 80,
  ellipsis: true
},
{
  title: '职称',
  dataIndex: ['jobLevel', 'name'],
  align: 'center',
  width: 80,
  ellipsis: true
},
{
  title: '聘用形式',
  dataIndex: 'engageForm',
  align: 'center',
  width: 80,
  ellipsis: true
},
{
  title: '入职日期',
  dataIndex: 'beginDate',
  align: 'center',
  width: 90,
  ellipsis: true
},
{
  title: '转正日期',
  dataIndex: 'conversionTime',
  align: 'center',
  width: 90,
  ellipsis: true
},
{
  title: '合同起始日期',
  dataIndex: 'beginContract',
  align: 'center',
  width: 90,
  ellipsis: true
},
{
  title: '合同终止日期',
  dataIndex: 'endContract',
  align: 'center',
  width: 90,
  ellipsis: true
},
{
  title: '合同期限',
  dataIndex: 'contractTerm',
  align: 'center',
  width: 80,
  ellipsis: true
},
{
  title: '毕业学校',
  dataIndex: 'school',
  align: 'center',
  width: 80,
  ellipsis: true
},
{
  title: '专业',
  dataIndex: 'specialty',
  align: 'center',
  width: 150,
  ellipsis: true
},
{
  title: '最高学历',
  dataIndex: 'tiptopDegree',
  align: 'center',
  width: 80,
  ellipsis: true
},
{
  title: '操作',
  dataIndex: 'action',
  width: 230,
  align: 'center',
  fixed: 'right',
  slots: {
    customRender: 'action'
  }
}
]

const state = reactive({
  columns: columns,
  employee: [],
  dataLoading: true,
  total: 0,
  query: {
    page: 1,
    limit: 10,
    key: ''
  },
  addEmpInfo: {
    name: '',
    gender: '',
    birthday: '',
    idCard: '',
    wedlock: '',
    nationId: null,
    nativePlace: '',
    politicId: null,
    email: '',
    phone: '',
    address: '',
    departmentId: null,
    jobLevelId: null,
    posId: null,
    engageForm: '',
    tiptopDegree: null,
    specialty: '',
    school: '',
    beginDate: '',
    workState: '',
    workId: '',
    contractTerm: null,
    beginContract: '',
    endContract: '',
    conversionTime: ''
  },
  addVisible: false,
  nations: JSON.parse(window.sessionStorage.getItem('nations')),
  joblevels: JSON.parse(window.sessionStorage.getItem('joblevels')),
  politicsstatus: JSON.parse(window.sessionStorage.getItem('politicsstatus')),
  position: JSON.parse(window.sessionStorage.getItem('position')),
  empVisible: false,
  departments: [],
  replaceFields: {
    title: 'name',
    key: 'id'
  },
  inputDepName: ''
})

const initEmployee = async () => {
  state.dataLoading = true
  const { data } = await fetchEmployeeApi(state.query)
  if (data.success) {
    state.employee = data.data.employee.items
    state.total = data.data.employee.total
    state.dataLoading = false
  }
}

const pageChange = page => {
  state.query.page = page
  initEmployee()
}

const limitChange = (current, size) => {
  state.query.page = current
  state.query.limit = size
  initEmployee()
}

const showAddEmpVisible = () => {
  state.addVisible = true
  initData()
}

const initData = () => {
  if (!window.sessionStorage.getItem('nations')) {
    fetchNationsApi().then(res => {
      if (res.data.success) {
        state.nations = res.data.data.nations
        window.sessionStorage.setItem('nations', JSON.stringify(res.data.data.nations))
      }
    })
  }

  if (!window.sessionStorage.getItem('joblevels')) {
    fetchJobLevelsApi().then(res => {
      if (res.data.success) {
        state.joblevels = res.data.data.job_level
        window.sessionStorage.setItem('joblevels', JSON.stringify(res.data.data.job_level))
      }
    })
  }

  if (!window.sessionStorage.getItem('politicsstatus')) {
    fetchPoliticsstatusApi().then(res => {
      if (res.data.success) {
        state.politicsstatus = res.data.data.list
        window.sessionStorage.setItem('politicsstatus', JSON.stringify(res.data.data.list))
      }
    })
  }

  if (!window.sessionStorage.getItem('position')) {
    getPositionsApi().then(res => {
      if (res.data.success) {
        state.position = res.data.data.positions
        window.sessionStorage.setItem('position', JSON.stringify(res.data.data.positions))
      }
    })
  }

  fetchMaxWorkIdApi().then(res => {
    if (res.data.success) {
      state.addEmpInfo.workId = res.data.data.max_work_id
    }
  })
}

const showDepView = () => {
  state.empVisible = true
  initDepartments()
}

const initDepartments = async () => {
  const { data } = await fetchDepartmentsApi()
  if (data.success) {
    state.departments = data.data.departments
  }
}

const selectNodeTree = (keys, e) => {
  state.addEmpInfo.departmentId = keys[0]
  state.inputDepName = e.selectedNodes[0].props.name
  state.empVisible = false
}

const addEmployee = async () => {
  const { data } = await addEmployeeApi(state.addEmpInfo)
  if (data.success) {
    state.addVisible = false
    initEmployee()
    message.success("添加成功！")
  }
}

export {
  state,
  initEmployee,
  pageChange,
  limitChange,
  showAddEmpVisible,
  showDepView,
  selectNodeTree,
  addEmployee
}