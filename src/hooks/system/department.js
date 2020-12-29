import { reactive } from 'vue'
import { fetchDepartmentsApi } from '@/api/department'

const state = reactive({
  departments: [],
  replaceFields: {
    title: 'name',
    key: 'id'
  }
})

const initDepartments = async () => {
  const { data } = await fetchDepartmentsApi()
  if (data.success) {
    state.departments = data.data.departments
  }
}

export {
  state,
  initDepartments
}