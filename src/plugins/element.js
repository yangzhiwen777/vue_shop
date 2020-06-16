import Vue from 'vue'
import { Option, Select, Tree, Tag, MessageBox, Dialog, Pagination, Tooltip, Switch, Table, TableColumn, Col, Row, Card, BreadcrumbItem, Breadcrumb, Submenu, Button, Form, FormItem, Input, Message, Container, Header, Aside, Main, Menu, MenuItem } from 'element-ui'

Vue.use(Button)
Vue.use(Option)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Submenu)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
