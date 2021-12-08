import React, {useEffect, useState} from 'react'
import { Menu, Dropdown } from 'antd';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import {logOut} from './redux/action/userAction'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

    const {role, userId} = useSelector(state => state.userLogin)

    const [username, setUsername] = useState({})

    console.log("username",username);

    const dispatch = useDispatch()

    const getId = (id) => {
        axios.get(`/api/user/${id}`)
              .then(response => {
                setUsername(response.data.user)
              })  
    }

    useEffect(() => {
        getId(userId)
    },[userId])

    const menu = ( 
        <Menu>
            {role === 'super-admin' ?
            <Menu.Item key="3">
                <Link
                className="menu_item"
                to="/admin/register">register</Link>
            </Menu.Item> : ""}
            <Menu.Item key="1"
            onClick={() => dispatch(logOut())}
            >
              <div 
              className="menu_item"
              >
                  logout
              </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="navbar">
        <h1>Anest</h1>
        <Dropdown overlay={menu} trigger={['click']}>
            <Link to="#"
                className="ant-dropdown-link"
                onClick={e => e.preventDefault()}>
                <p>logout</p> <img src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png" alt="" />
            </Link>
        </Dropdown>
    </div>
    )
}

export default Home
