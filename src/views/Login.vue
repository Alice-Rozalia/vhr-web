<template>
  <div class="login-container">
    <div class="login-form">
      <a-form :model="loginForm">
        <h1>微人事后台系统</h1>
        <a-form-item v-bind="validateInfos.username">
          <a-input style="width:328px" v-model:value="loginForm.username" placeholder="用户名">
            <template #prefix>
              <UserOutlined style="color:rgba(0,0,0,.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="validateInfos.password">
          <a-input style="width:328px" v-model:value="loginForm.password" type="password" placeholder="密码">
            <template #prefix>
              <LockOutlined style="color:rgba(0,0,0,.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button style="width:328px" @click.prevent="login" type="primary">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
  import { toRefs, reactive } from 'vue'
  import { useForm } from '@ant-design-vue/use'
  import { loginApi } from '@/api/user'
  import { useRouter } from 'vue-router'
  import { notification } from 'ant-design-vue'

  export default {
    components: {
      UserOutlined,
      LockOutlined
    },
    setup() {
      const state = reactive({
        loginForm: {
          username: 'admin',
          password: '123456'
        }
      })

      const router = useRouter()

      const { validate, validateInfos } = useForm(state.loginForm, reactive({
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
          .then(async res => {
            const { data } = await loginApi(res);
            if (data.success) {
              window.sessionStorage.setItem('user', JSON.stringify(data.data.hr))
              window.sessionStorage.setItem('token', data.data.token)
              notification['success']({
                message: data.message,
                duration: 1.5,
              })
              router.push('/')
            }
          })
          .catch(err => err)
      }

      return {
        login,
        router,
        validateInfos,
        ...toRefs(state)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/login.less';
</style>