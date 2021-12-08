import React, { useState } from 'react'
import NewsAll from './components/news/NewsAll'
import NewsAdd from './components/news/NewsAdd'
import NewsUpdate from './components/news/NewsUpdate'
import DrugAll from './components/drug/DrugAll'
import DrugAdd from './components/drug/DrugAdd'
import DrugUpdate from './components/drug/DrugUpdate'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { FaNewspaper } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { MedicineBoxFilled } from '@ant-design/icons';
import logo from './images/logo.png'
import 'antd/dist/antd.css'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import mp3 from './asest/Incoming Message.mp3'
import { useSelector } from 'react-redux'
const { Content, Sider } = Layout;



const App = () => {

  const [collapsed, setCollapsed] = useState(false)
  const {auth} = useSelector(state => state.userLogin)

  const authRoutes = (
    <Layout style={{ minHeight: '100vh' }}>
      <audio id="m">
          <source src={mp3} />
      </audio>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className="menu_top">
        <img src={logo} alt="" />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<FaNewspaper />}>
            <NavLink className="item" to="/admin/news">
              Yangiliklar
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<MedicineBoxFilled />}>
            <NavLink className="item" to="/admin/drug">
              Dorilar
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content>
          <Home />
          <Switch>
            <Route path="/admin/news" exact component={NewsAll} />
            <Route path="/admin/addnews" component={NewsAdd} />
            <Route path="/admin/update/:id" component={NewsUpdate} />
            <Route path="/admin/drug" component={DrugAll} />
            <Route path="/admin/addrug" component={DrugAdd} />
            <Route path="/admin/drugupdate/:id" component={DrugUpdate} />
            <Route path="/admin/register" component={Register} />
            <Redirect to="/admin/news" />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
   
  const loginRoutes = (
    <Switch>
       <Route path="/admin/login" component={Login} />
            <Redirect to="/admin/login" />
    </Switch>
  )

  const router = auth ? authRoutes : loginRoutes


  return (
    <div className="app">
      <ToastContainer />
      <Router>
        {router}
      </Router>
    </div>
  )
}

export default App