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
          <a-button style="width:328px" @click="login" type="primary">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
  import {
    UserOutlined,
    LockOutlined
  } from '@ant-design/icons-vue'
  import {
    toRefs
  } from 'vue'
  import {
    state,
    login,
    validateInfos
  } from '../hooks/login'

  export default {
    components: {
      UserOutlined,
      LockOutlined
    },
    setup() {
      return {
        login,
        validateInfos,
        ...toRefs(state)
      }
    }
  }
</script>

<style lang="less" scoped>
  .login-container {
    width: 100%;
    height: 100%;
    background: url("../assets/login-bg.png") repeat;

    .login-form {
      width: 400px;
      height: 35vh;
      background: url("../assets/login.png") no-repeat center;
      background-size: cover;
      position: absolute;
      border-radius: 20px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -80%);
      display: flex;
      justify-content: center;
      align-items: center;

      @media screen and (max-width: 750px) {
        width: 88vw;
        right: 25px;
        top: 28vh;
      }

      h1 {
        font-size: 30px;
        font-family: '华文行楷';
        text-align: center;
        color: #333;
      }
    }
  }
</style>