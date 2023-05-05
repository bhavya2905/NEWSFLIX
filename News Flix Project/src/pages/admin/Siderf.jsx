import React,{ useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
const { Sider, Content } = Layout;


const Siderf=({keys})=> {
    // const [selectedKey,setSelectedKey] = useState(key);
    // const handleMenuClick = (e) => {
    //     setSelectedKey(e.key);
    // }
    const navigate = useNavigate();
    const adminUser= localStorage.getItem('adminUser');
    useEffect(()=>{
      if(adminUser==""){
       
        navigate('/');
      }
    },[])
    const userList = JSON.parse(localStorage.getItem('userList')).filter((e)=> e.email===adminUser);


    const settingUrl=`/editadmin?id=${userList[0]?._id}`;
  return (
    <Sider style={   { minHeight: '100vh' }}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[keys]} >
          <Menu.Item key="1">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/postnews">CreatePost</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/users">Comments</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to={settingUrl}>Settings</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <div style={{cursor:'pointer'}} onClick={() => { 
              localStorage.setItem('adminUser',"");
              navigate('/');
              
          }}>Logout</div>
          </Menu.Item>
        </Menu>
      </Sider>
  )
}
export default Siderf;