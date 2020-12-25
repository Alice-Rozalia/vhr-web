import {
  Button,
  Input,
  Form,
  Layout,
  Menu,
  Dropdown,
  Breadcrumb
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const components = [
  Menu,
  Button,
  Input,
  Form,
  Layout,
  Dropdown,
  Breadcrumb
]

export function setupAntd(app) {
  components.forEach(component => {
    app.use(component)
  })
}