import {
  fetchHrListApi,
  updateHrStatusApi
} from '@/api/user'
import { message } from 'ant-design-vue'
import { reactive } from 'vue'

const state = reactive({
  keywords: '',
  hrs: []
})

const hrStatusChange = async hr => {
  delete hr.roles
  const { data } = await updateHrStatusApi(hr)
  if (data.success) {
    message.success(data.message)
    initHrs()
  }
}

const initHrs = async () => {
  const { data } = await fetchHrListApi()
  state.hrs = data.data.hrs
}

export {
  state,
  initHrs,
  hrStatusChange
}