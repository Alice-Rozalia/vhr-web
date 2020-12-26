<template>
  <a-tabs>
    <a-tab-pane key="1" tab="部门管理">
      部门管理
    </a-tab-pane>
    <a-tab-pane key="2" tab="职位管理" force-render>
      <pos-mana />
    </a-tab-pane>
    <a-tab-pane key="3" tab="职称管理">
      Content of Tab Pane 3
    </a-tab-pane>
    <a-tab-pane key="4" tab="奖惩规则">
      Content of Tab Pane 3
    </a-tab-pane>
    <a-tab-pane key="5" tab="权限组">
      Content of Tab Pane 3
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import PosMana from '@/components/sys/basic/PosMana'
  export default {
    name: 'SysBasic',
    components: {
      PosMana
    }
  }
</script>

<style lang="less" scoped>
  .ant-tabs {
    margin-top: 10px;
  }
</style>