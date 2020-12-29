<template>
  <div class="department-container">
    <a-input-search style="margin-bottom: 8px" placeholder="请输入部门名称进行搜索.." @change="onChange" />
    <a-tree :tree-data="departments" :replace-fields="replaceFields" />
  </div>
</template>

<script>
  import {
    state,
    initDepartments
  } from '@/hooks/system/department'
  import { toRefs, onMounted } from 'vue'

  export default {
    name: 'DepMana',
    setup() {
      onMounted(() => {
        initDepartments()
      })

      return {
        ...toRefs(state)
      }
    }
  }
</script>

<style lang="less" scoped>
  .department-container {
    width: 700px;
  }
</style>