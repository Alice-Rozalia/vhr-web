import { createRouter, createWebHistory} from 'vue-router'

const routes = [{
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    hidden: true,
    children: [{
        path: '/home',
        name: '首页',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/emp/basic',
        name: '基本资料',
        component: () => import('@/views/emp/EmpBasic.vue')
      },
      {
        path: '/emp/adv',
        name: '高级资料',
        component: () => import('@/views/emp/EmpAdv.vue')
      }, {
        path: '/sys/basic',
        name: '基础信息设置',
        component: () => import('@/views/sys/SysBasic.vue')
      },
      {
        path: '/sys/cfg',
        name: '系统管理',
        component: () => import('@/views/sys/SysCfg.vue')
      },
      {
        path: '/sys/data',
        name: '备份恢复数据库',
        component: () => import('@/views/sys/SysData.vue')
      },
      {
        path: '/sys/init',
        name: '初始化数据库',
        component: () => import('@/views/sys/SysInit.vue')
      },
      {
        path: '/sys/hr',
        name: '操作员管理',
        component: () => import('@/views/sys/SysHr.vue')
      },
      {
        path: '/sys/log',
        name: '操作日志管理',
        component: () => import('@/views/sys/SysLog.vue')
      },
      {
        path: '/per/ec',
        name: '员工奖惩',
        component: () => import('@/views/per/PerEc.vue')
      },
      {
        path: '/per/emp',
        name: '员工资料',
        component: () => import('@/views/per/PerEmp.vue')
      },
      {
        path: '/per/train',
        name: '员工培训',
        component: () => import('@/views/per/PerTrain.vue')
      },
      {
        path: '/per/salary',
        name: '员工调薪',
        component: () => import('@/views/per/PerSalary.vue')
      },
      {
        path: '/per/mv',
        name: '员工调动',
        component: () => import('@/views/per/PerMv.vue')
      },
      {
        path: '/sal/sob',
        name: '工资账套管理',
        component: () => import('@/views/sal/SalSob.vue')
      },
      {
        path: '/sal/sobcfg',
        name: '员工账套设置',
        component: () => import('@/views/sal/SalSobCfg.vue')
      },
      {
        path: '/sal/table',
        name: '工资表管理',
        component: () => import('@/views/sal/SalTable.vue')
      },
      {
        path: '/sal/month',
        name: '月末处理',
        component: () => import('@/views/sal/SalMonth.vue')
      },
      {
        path: '/sal/search',
        name: '工资表查询',
        component: () => import('@/views/sal/SalSearch.vue')
      },
      {
        path: '/sta/all',
        name: '综合信息统计',
        component: () => import('@/views/sta/StaAll.vue')
      },
      {
        path: '/sta/score',
        name: '员工积分统计',
        component: () => import('@/views/sta/StaScore.vue')
      },
      {
        path: '/sta/pers',
        name: '人事信息统计',
        component: () => import('@/views/sta/StaPers.vue')
      },
      {
        path: '/sta/record',
        name: '人事记录统计',
        component: () => import('@/views/sta/StaRecord.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '/404',
    hidden: true,
    component: () => import('@/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router