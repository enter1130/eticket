import { CalendarOutlined, HeartOutlined, HistoryOutlined, HomeOutlined, LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Divider, Drawer, Row } from "antd";
import { useState } from "react";
import logo from '../../public/vite.svg';

function Menu(){
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onClick = (e) => {
    console.log('click ', e);
  };

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
      <div className='pb-3 d-flex flex-row justify-content-between mx-1'>
        <div className='d-flex justify-content-center align-item-center'>
          <Avatar className="border" src={logo} size={60} >王小明</Avatar>
        </div>
        <div className="text-end">
          <div className="text-muted" style={{fontSize:'10pt'}}>會員等級：LV2</div>
          <div style={{fontSize:'20pt'}}>王小明</div>
        </div>
      </div>
      <Row gutter={12}>
        <Col span={12}>
          <Button icon={<UserOutlined />} block type={'primary'} className='my-1' onClick={()=>window.location.href='/eticket/user'}>個人資料</Button>
        </Col>
        <Col span={12}>
          <Button danger icon={<LogoutOutlined />} block type={'primary'} color="danger" className='my-1' onClick={()=>window.location.href='/eticket/logout'}>登出</Button>      
        </Col>
      </Row>
      <Divider orientation="left" className='mt-3' >菜單</Divider>
      <Button block size="large" type='dashed' icon={<HomeOutlined />} className='my-1' onClick={()=>window.location.href='/'}>首頁</Button>
      <Button block size="large" type='dashed' icon={<CalendarOutlined />} className='my-1' onClick={()=>window.location.href='/eticket/event'}>全部活動</Button>
      <Button block size="large" type='dashed' icon={<HeartOutlined />} className='my-1' onClick={()=>window.location.href='/eticket/favorite'}>我的最愛</Button>
      <Button block size="large" type='dashed' icon={<HistoryOutlined />} className='my-1' onClick={()=>window.location.href='/eticket/history'}>參與歷史與心得</Button>
    </Drawer>
    </>
  )
}

export default Menu
