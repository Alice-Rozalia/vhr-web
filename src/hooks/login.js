import {
  reactive
} from 'vue'
import {
  useForm
} from '@ant-design-vue/use'

const state = reactive({
  loginForm: {
    username: 'admin',
    password: '123456'
  }
})

const {
  validate,
  validateInfos
} = useForm(state.loginForm, reactive({
  username: [{
    required: true,
    message: '请输入用户名！'
  }],
  password: [{
    required: true,
    message: '请输入密码！'
  }]
}))

const login = e => {
  e.preventDefault()
  validate()
    .then(res => {
      console.log(res, state.loginForm)
    })
    .catch(err => {
      console.log('error', err)
    })
}

export {
  state,
  login,
  validateInfos
}