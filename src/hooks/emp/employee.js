import { reactive, computed, createVNode } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { fetchEmployeeApi } from '@/api/employee'

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
  employee: []
})

const initEmployee = async () => {
  const { data } = await fetchEmployeeApi()
  if (data.success) {
    state.employee = data.data.employee.items
  }
}

export {
  state,
  initEmployee
}