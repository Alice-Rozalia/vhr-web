import {
  Button,
  Input,
  Form,
  Layout,
  Menu,
  Dropdown
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const components = [
  Menu,
  Button,
  Input,
  Form,
  Layout,
  Dropdown
]

export function setupAntd(app) {
  components.forEach(component => {
    app.use(component)
  })
}