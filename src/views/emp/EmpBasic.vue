<template>
  <div>
    <!-- 顶部菜单 -->
    <div class="emp-hd">
      <!-- 左侧搜索 -->
      <div>
        <a-input v-model:value="query.key" placeholder="请输入员工名进行搜索，可以直接回车搜索..." style="width: 330px;">
          <template #prefix>
            <SearchOutlined />
          </template>
        </a-input>
        <a-button @click="initEmployee" type="primary" style="margin: 0 15px">
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
        <a-button @click="showAddEmpVisible" type="primary" class="yellow-btn">
          <template #icon>
            <PlusOutlined /></template>添加员工
        </a-button>
      </div>
    </div>

    <!-- 底部表格 -->
    <div>
      <a-table :columns="columns" :pagination="false" :loading="dataLoading" :scroll="{ x: 2420 }"
        :data-source="employee" rowKey="id" size="middle" bordered>
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

      <!-- 分页 -->
      <div class="pagination-box">
        <a-pagination :total="total" @showSizeChange="limitChange" @change="pageChange"
          :show-total="total => `共 ${total} 条`" show-size-changer show-quick-jumper />
      </div>
    </div>

    <a-modal @ok="addEmployee" title="添加员工" v-model:visible="addVisible" okText="添加" cancelText="取消" width="78%">
      <a-form>
        <a-row :gutter="16">
          <a-col :span="6">
            <a-form-item label="姓名">
              <a-input placeholder="请输入员工姓名" v-model:value="addEmpInfo.name">
                <template #prefix>
                  <EditOutlined /></template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item label="性别">
              <a-radio-group v-model:value="addEmpInfo.gender">
                <a-radio value="男">
                  男
                </a-radio>
                <a-radio value="女">
                  女
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="出生日期">
              <a-date-picker v-model:value="addEmpInfo.birthday" format="YYYY-MM-DD" placeholder="出生日期" />
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item label="政治面貌">
              <a-select v-model:value="addEmpInfo.politicId" placeholder="政治面貌" style="width: 200px">
                <a-select-option :value="item.id" v-for="item in politicsstatus" :key="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 第二行 -->
        <a-row>
          <a-col :span="6">
            <a-form-item label="民族">
              <a-select v-model:value="addEmpInfo.nationId" placeholder="民族" style="width: 150px">
                <a-select-option :value="item.id" v-for="item in nations" :key="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item label="籍贯">
                <a-input placeholder="请输入籍贯" v-model:value="addEmpInfo.nativePlace" style="width: 120px">
                <template #prefix>
                  <EditOutlined /></template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="电子邮箱">
                <a-input placeholder="电子邮箱" v-model:value="addEmpInfo.email" style="width: 150px">
                <template #prefix>
                  <MailOutlined /></template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item label="联系地址">
                <a-input placeholder="联系地址" v-model:value="addEmpInfo.address" style="width: 200px">
                <template #prefix>
                  <EditOutlined /></template>
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 第三行 -->
        <a-row>
          <a-col :span="6">
            <a-form-item label="职位">
              <a-select v-model:value="addEmpInfo.posId" placeholder="职位" style="width: 150px">
                <a-select-option :value="item.id" v-for="item in position" :key="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item label="职称">
              <a-select v-model:value="addEmpInfo.jobLevelId" placeholder="职称" style="width: 120px">
                <a-select-option :value="item.id" v-for="item in joblevels" :key="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="所属部门" style="display: flex;align-items: center;">
              <a-popover v-model:visible="empVisible" title="请选择部门" trigger="click" placement="right">
                <template #content>
                  <a-tree @select="selectNodeTree" :tree-data="departments" :replace-fields="replaceFields" defaultExpandAll />
                </template>
                <div class="department-input" @click="showDepView">{{inputDepName}}</div>
              </a-popover>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item label="电话号码">
                <a-input placeholder="电话号码" v-model:value="addEmpInfo.phone" style="width: 200px">
                <template #prefix>
                  <PhoneOutlined /></template>
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 第四行 -->
        <a-row>
          <a-col :span="6">
            <a-form-item label="工号">
                <a-input placeholder="工号" disabled v-model:value="addEmpInfo.workId" style="width: 150px">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item label="学历">
              <a-select v-model:value="addEmpInfo.tiptopDegree" placeholder="学历" style="width: 120px">
                <a-select-option value="初中">初中</a-select-option>
                <a-select-option value="高中">高中</a-select-option>
                <a-select-option value="大专">大专</a-select-option>
                <a-select-option value="本科">本科</a-select-option>
                <a-select-option value="硕士">硕士</a-select-option>
                <a-select-option value="博士">博士</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="毕业院校">
                <a-input placeholder="毕业院校名称" v-model:value="addEmpInfo.school" style="width: 150px">
                <template #prefix>
                  <EditOutlined /></template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item label="专业名称">
                <a-input placeholder="专业名称" v-model:value="addEmpInfo.specialty" style="width: 200px">
                <template #prefix>
                  <EditOutlined /></template>
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 第五行 -->
        <a-row>
          <a-col :span="6">
            <a-form-item label="入职日期">
              <a-date-picker v-model:value="addEmpInfo.beginDate" format="YYYY-MM-DD" placeholder="入职日期" style="width: 120px" />
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item label="转正日期">
              <a-date-picker v-model:value="addEmpInfo.conversionTime" format="YYYY-MM-DD" placeholder="转正日期" style="width: 120px" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="合同起始日期">
              <a-date-picker v-model:value="addEmpInfo.beginContract" format="YYYY-MM-DD" placeholder="合同起始日期" style="width: 140px" />
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item label="合同终止日期">
              <a-date-picker v-model:value="addEmpInfo.endContract" format="YYYY-MM-DD" placeholder="合同终止日期" style="width: 160px" />
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 第六行 -->
        <a-row>
          <a-col :span="8">
            <a-form-item label="身份证号码">
                <a-input placeholder="身份证号码" v-model:value="addEmpInfo.idCard">
                <template #prefix>
                  <EditOutlined /></template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="聘用形式">
              <a-radio-group v-model:value="addEmpInfo.engageForm">
                <a-radio value="劳用合同">
                  劳用合同
                </a-radio>
                <a-radio value="劳务合同">
                  劳务合同
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="婚姻状况">
              <a-radio-group v-model:value="addEmpInfo.wedlock">
                <a-radio value="已婚">
                  已婚
                </a-radio>
                <a-radio value="未婚">
                  未婚
                </a-radio>
                <a-radio value="离异">
                  离异
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import {
    SearchOutlined,
    ColumnHeightOutlined,
    DownloadOutlined,
    UploadOutlined,
    PlusOutlined,
    EditOutlined,
    MailOutlined,
    PhoneOutlined
  } from '@ant-design/icons-vue'
  import {
    toRefs,
    onMounted
  } from 'vue'
  import {
    state,
    initEmployee,
    pageChange,
    limitChange,
    showAddEmpVisible,
    showDepView,
    selectNodeTree,
    addEmployee
  } from '@/hooks/emp/employee'

  export default {
    name: 'EmpBasic',
    components: {
      SearchOutlined,
      ColumnHeightOutlined,
      DownloadOutlined,
      UploadOutlined,
      PlusOutlined,
      EditOutlined,
      MailOutlined,
      PhoneOutlined
    },
    setup() {
      onMounted(() => {
        initEmployee()
      })

      return {
        ...toRefs(state),
        initEmployee,
        pageChange,
        limitChange,
        showAddEmpVisible,
        showDepView,
        selectNodeTree,
        addEmployee
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

  .pagination-box {
    margin-top: 20px;
  }

  .department-input {
    width: 150px;
    height: 28px;
    border: 1px solid #d9d9d9;
    font-size: 13px;
    cursor: pointer;
    line-height: 28px;
    padding-left: 10px;
    color: #bfbfbf;
  }
</style>