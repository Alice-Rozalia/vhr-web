<template>
  <div>
    <!-- 顶部菜单 -->
    <div class="emp-hd">
      <!-- 左侧搜索 -->
      <div>
        <a-input placeholder="请输入员工名进行搜索，可以直接回车搜索..." style="width: 330px;">
          <template #prefix>
            <SearchOutlined />
          </template>
        </a-input>
        <a-button type="primary" style="margin: 0 15px">
          <template #icon>
            <SearchOutlined /></template>搜索
        </a-button>
        <a-button type="primary">
          <template #icon>
            <ColumnHeightOutlined /></template>高级搜索
        </a-button>
      </div>

      <!-- 右侧菜单 -->
      <div>
        <a-button type="primary" class="green-btn">
          <template #icon>
            <UploadOutlined /></template>导入数据
        </a-button>
        <a-button type="primary" style="margin: 0 15px;" class="green-btn">
          <template #icon>
            <DownloadOutlined /></template>导出数据
        </a-button>
        <a-button type="primary" class="yellow-btn">
          <template #icon>
            <PlusOutlined /></template>添加用户
        </a-button>
      </div>
    </div>

    <!-- 底部表格 -->
    <div>
      <a-table :columns="columns" :pagination="false" :scroll="{ x: 2420 }" :data-source="employee" rowKey="id" size="middle" bordered>
        <template #name="{text}">
          <a>{{ text }}</a>
        </template>
        <template #action="{ record }">
          <a-button size="small">
            修改
          </a-button>
          <a-button type="primary" size="small" style="margin:0 8px;">
            查看高级资料
          </a-button>
          <a-button type="danger" size="small">
            删除
          </a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import {
    SearchOutlined,
    ColumnHeightOutlined,
    DownloadOutlined,
    UploadOutlined,
    PlusOutlined
  } from '@ant-design/icons-vue'
  import { toRefs, onMounted } from 'vue'
  import {
    state,
    initEmployee
  } from '@/hooks/emp/employee'

  export default {
    name: 'EmpBasic',
    components: {
      SearchOutlined,
      ColumnHeightOutlined,
      DownloadOutlined,
      UploadOutlined,
      PlusOutlined
    },
    setup() {
      onMounted(() => {
        initEmployee()
      })

      return {
        ...toRefs(state),
      }
    }
  }
</script>

<style lang="less" scoped>
  .emp-hd {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }

  .green-btn {
    background-color: #5ad465;
    border: 1px solid #5ad465;
  }

  .yellow-btn {
    background-color: #e6a23c;
    border: 1px solid #e6a23c;
  }
</style>