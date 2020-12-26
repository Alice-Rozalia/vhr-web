<template>
  <a-tabs>
    <a-tab-pane key="1" tab="部门管理">
      <dep-mana />
    </a-tab-pane>
    <a-tab-pane key="2" tab="职位管理" force-render>
      <pos-mana />
    </a-tab-pane>
    <a-tab-pane key="3" tab="职称管理">
      <job-level-mana />
    </a-tab-pane>
    <a-tab-pane key="4" tab="奖惩规则">
      <ec-mana />
    </a-tab-pane>
    <a-tab-pane key="5" tab="权限组">
      <permiss-mana />
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import PosMana from '@/components/sys/basic/PosMana'
  import DepMana from '@/components/sys/basic/DepMana'
  import JobLevelMana from '@/components/sys/basic/JobLevelMana'
  import EcMana from '@/components/sys/basic/EcMana'
  import PermissMana from '@/components/sys/basic/PermissMana'
  export default {
    name: 'SysBasic',
    components: {
      PosMana,
      DepMana,
      JobLevelMana,
      EcMana,
      PermissMana
    }
  }
</script>

<style lang="less" scoped>
  .ant-tabs {
    margin-top: 10px;
  }
</style>