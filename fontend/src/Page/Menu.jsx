import { CalendarOutlined, HeartOutlined, HistoryOutlined, HomeOutlined, LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Divider, Drawer, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import logo from '../../public/vite.svg';

function Menu(){
  const [open, setOpen] = useState(false);
  const { Paragraph, Text } = Typography;

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onClick = (e) => {
    console.log('click ', e);
  };

  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  function getUser(){
    fetch('http://localhost:3000/api/auth/user',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Authorization':`${cookies.get('token')}`
      }})
    .then(res=>res.json())
    .then(data=>{
      setUser(data.user)
    })
  }

  function logout(){
    cookies.remove('token');
    window.location.href='/login';
  }

  useEffect(() => {
    getUser();
  }, []);

  if(!user) return(<></>)
  return(
    <>
    <nav id="menu" className="fixed-top py-3">
    <div className='p-3 d-flex flex-row justify-content-between'>
      <a href="/">
        <img src={logo} alt="logo" style={{height:'40px'}} />
      </a>
      <div className='d-flex justify-content-center align-item-center'>
        <Button onClick={showDrawer} type={'text'} size="large" icon={<MenuOutlined />} />
      </div>
    </div>
    </nav>
    <Drawer onClose={onClose} open={open}>
      <div className='pb-3 d-flex flex-row justify-content-between align-item-center mx-1'>
        <div className='d-flex justify-content-center align-item-center'>
          <Avatar className="border" src={logo} size={60} >{user.name}</Avatar>
        </div>
        <div className="text-end">
          <Text >UserID: <Text copyable>1234152</Text></Text>
          <div style={{fontSize:'20pt'}}>{user.name}</div>
        </div>
      </div>
      <Row gutter={12}>
        <Col span={12}>
          <Button icon={<UserOutlined />} block type={'primary'} className='my-1' onClick={()=>window.location.href='/user'}>個人資料</Button>
        </Col>
        <Col span={12}>
          <Button danger icon={<LogoutOutlined />} block type={'primary'} color="danger" className='my-1' onClick={()=>logout()}>登出</Button>      
        </Col>
      </Row>
      <Divider orientation="left" className='mt-3' >菜單</Divider>
      <Button block size="large" type='dashed' icon={<HomeOutlined />} className='my-1' onClick={()=>window.location.href='/'}>首頁</Button>
      <Button block size="large" type='dashed' icon={<CalendarOutlined />} className='my-1' onClick={()=>window.location.href='/event'}>全部活動</Button>
      <Button block size="large" type='dashed' icon={<HeartOutlined />} className='my-1' onClick={()=>window.location.href='/favorite'}>我的最愛</Button>
      <Button block size="large" type='dashed' icon={<HistoryOutlined />} className='my-1' onClick={()=>window.location.href='/history'}>參與歷史與心得</Button>
    </Drawer>
    </>
  )
}

export default Menu
