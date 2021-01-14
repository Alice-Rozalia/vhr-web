<template>
  <div>
    <!-- 顶部搜索框 -->
    <div class="hd-input">
      <a-input placeholder="通过用户名搜索用户..." v-model:value="keywords">
        <template #prefix>
          <SearchOutlined />
        </template>
      </a-input>
      <a-button type="primary" @click="search"><template #icon><SearchOutlined /></template>搜索</a-button>
    </div>

    <!-- 用户列表 -->
    <div class="main">
      <a-card :title="item.name" v-for="item in hrs" :key="item.id">
        <template #extra>
          <a-button type="link" size="small" style="color: #e11b33" @click="deleteHr(item)">
            <template #icon><DeleteOutlined /></template>
          </a-button>
        </template>
        <div>
          <div class="img-container">
            <img :src="item.userface" :title="item.name" class="avatar" />
          </div>
          <div class="userinfo-container">
            <div>用户名：{{item.name}}</div>
            <div>手机号码：{{item.phone}}</div>
            <div>电话号码：{{item.telephone}}</div>
            <div>地址：{{item.address}}</div>
            <div>用户状态：<a-switch @change="hrStatusChange(item)" size="small" v-model:checked="item.enabled" /></div>
            <div>用户角色：
              <a-tag color="cyan" style="margin-bottom: 3px;" v-for="role in item.roles" :key="role.id + item.name">
                {{ role.nameZh }}
              </a-tag>
              <a-popover placement="right" title="角色列表" @visibleChange="showPop(item)">
                <template #content>
                  <a-select
                    mode="multiple"
                    placeholder="该用户的角色"
                    v-model:value="seletedRoles"
                    option-label-prop="label"
                    style="width: 100%"
                    showArrow
                  >
                    <a-select-option v-for="r in allRoles" :key="r.id + r.name" :value="r.id" :label="r.nameZh">
                      {{ r.nameZh }}
                    </a-select-option>
                  </a-select>
                </template>
                <a-button type="link" size="small">
                  <template #icon><EllipsisOutlined /></template>
                </a-button>
              </a-popover>
            </div>
            <div>备注：{{item.remark}}</div>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
  import { SearchOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons-vue'
  import { toRefs, onMounted } from 'vue'
  import {
    state,
    initHrs,
    hrStatusChange,
    showPop,
    search,
    deleteHr
  } from '@/hooks/system/hr'
  export default {
    name: 'SysHr',
    components: {
      SearchOutlined,
      DeleteOutlined,
      EllipsisOutlined
    },
    setup() {
      onMounted(() => {
        initHrs()
      })

      return {
        ...toRefs(state),
        hrStatusChange,
        showPop,
        search,
        deleteHr
      }
    }
  }
</script>

<style lang="less" scoped>
  .hd-input {
    display: flex;
    justify-content: center;
    margin: 10px 0 30px;

    .ant-input-affix-wrapper {
      margin-right: 15px;
      width: 400px;
    }
  }

  .main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .ant-card {
      width: 380px;
      margin-bottom: 15px;

      .img-container {
        display: flex;
        justify-content: center;

        .avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
        }
      }

      .userinfo-container {
        margin-top: 15px;

        >div {
          font-size: 13px;
          color: #52b398;
          margin: 3px 0;
        }
      }
    }
  }
</style>