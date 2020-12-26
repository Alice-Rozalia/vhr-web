<template>
  <a-layout class="app-wapper">
    <a-layout-sider class="app-sider" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">微人事</div>
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark" :inline-collapsed="collapsed">
        <router-link to="/home">
          <a-menu-item key="1">
            <HomeFilled />
            <span>首页</span>
          </a-menu-item>
        </router-link>
        <a-sub-menu v-for="(item, index) in routes" :key="item.id">
          <template #title>
            <span>
              <FileExcelFilled v-if="index === 0" />
              <IdcardFilled v-if="index === 1" />
              <PayCircleFilled v-if="index === 2" />
              <AreaChartOutlined v-if="index === 3" />
              <WindowsFilled v-if="index === 4" />
              <span>{{ item.name }}</span>
            </span>
          </template>
          <a-menu-item a-menu-item v-for="sub in item.children" :key="sub.id">
            <router-link :to="sub.path">
              <AppstoreFilled />
              {{sub.name}}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="app-header">
        <div>
          <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </div>
        <div class="dropdown-container">
          <a-dropdown :trigger="['hover']">
            <span class="dropdown-link">
              {{user.name}}
              <img :src="user.userface" class="avatar" />
            </span>
            <template #overlay>
              <a-menu @click="commandHandler">
                <a-menu-item key="userInfo">个人中心</a-menu-item>
                <a-menu-item key="setting">设置</a-menu-item>
                <a-menu-divider />
                <a-menu-item key="logout">注销登录</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <a-breadcrumb separator=">" v-if="router.currentRoute._value.path !== '/home'">
          <a-breadcrumb-item href="">
            <router-link to="/home">首页</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            {{ router.currentRoute._value.name }}
          </a-breadcrumb-item>
        </a-breadcrumb>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
  import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ExclamationCircleOutlined,
    HomeFilled,
    FileExcelFilled,
    IdcardFilled,
    PayCircleFilled,
    AreaChartOutlined,
    WindowsFilled,
    AppstoreFilled
  } from '@ant-design/icons-vue'

  import { reactive, toRefs, createVNode, computed } from 'vue'

  import { logoutApi } from '@/api/user'
  import useCurrentInstance from '@/hooks/useCurrentInstance'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  export default {
    components: {
      UserOutlined,
      VideoCameraOutlined,
      UploadOutlined,
      MenuUnfoldOutlined,
      MenuFoldOutlined,
      ExclamationCircleOutlined,
      HomeFilled,
      FileExcelFilled,
      IdcardFilled,
      PayCircleFilled,
      AreaChartOutlined,
      WindowsFilled,
      AppstoreFilled
    },

    setup() {
      const state = reactive({
        selectedKeys: ['1'],
        collapsed: false,
        user: JSON.parse(window.sessionStorage.getItem('user')),
        routes: computed(() => {
          return store.state.routes.filter(item => {
            return !item.hidden
          })
        })
      })

      const { globalProperties } = useCurrentInstance()
      const router = useRouter()
      const store = useStore()

      const commandHandler = ({ key }) => {
        if (key === 'logout') {
          globalProperties.$Modal.confirm({
            title: '此操作将注销登录，是否继续？',
            icon: createVNode(ExclamationCircleOutlined),
            cancelText: '取消',
            okText: '注销',
            async onOk() {
              const { data } = await logoutApi()
              if (data.success) {
                store.commit('initRoutes', [])
                window.sessionStorage.clear
                router.replace('/login')
                globalProperties.$message.success(data.message)
              }
            },
            onCancel() {
              globalProperties.$message.info('操作已取消！')
            }
          })
        }
      }

      return {
        ...toRefs(state),
        router,
        commandHandler
      }
    }
  }
</script>
<style lang="less" scoped>
  .app-sider {
    left: 0;
    height: 100vh;
    overflow: auto;

    .logo {
      color: #fff;
      text-align: center;
      line-height: 32px;
      font-size: 22px;
      font-family: '华文行楷';
    }
  }

  .app-header {
    display: flex;
    justify-content: space-between;
    padding: 0;
    background: #fff;

    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .dropdown-container {
      padding-right: 25px;

      .dropdown-link {
        cursor: pointer;

        .avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          margin-left: 10px;
        }
      }
    }
  }

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
</style>