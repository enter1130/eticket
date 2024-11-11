import { EditOutlined, SendOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, notification, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';
import logo from '../../public/vite.svg';
import Menu from './Menu';

function User() {
  const cookies = new Cookies();
  const{handleSubmit}=useForm();
  
  function onSubmit() {
    if(edit){
      // let data = new FormData();
      // data.append('username', document.getElementById('username').value);
      // data.append('password', document.getElementById('password').value);
      console.log('submit');
      setEdit(false);
    }else{
      setEdit(true);
    }
  }
  const { Paragraph, Text } = Typography;
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data) => {    
    api[data.type]({
      message: data.message,
      placement:'top',
      duration: 5,
    });
  };
  
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

  useEffect(() => {
    getUser();
  }, []);

  const [edit, setEdit] = useState(false);

  if(!user) return(<></>)
  return (
    <>
    <Menu />
    <div style={{marginTop:'80px'}} className="container p-3" >
      <div className="p-3 container text-center" style={{minWidth:'100%'}}>
        <div className='pb-3 d-flex flex-row justify-content-between align-items-end mx-1'>
          <div className='d-flex justify-content-center align-item-center'>
            <Avatar className="border" src={logo} size={60} >{user.name}</Avatar>
          </div>
          <div className="text-end">
            <Text >UserID: <Text copyable>{user.user_id}</Text></Text>
            <div style={{fontSize:'20pt'}}>{user.name}</div>
          </div>
        </div>
        <Form onFinish={handleSubmit(onSubmit)} >
          {contextHolder}
          <div className='mt-3'>
            <Form.Item label="Username" name={'username'} rules={[{required: true,message: 'Please input your username!',},]}>
              <Input id='username' disabled={!edit} defaultValue={user.username} />
            </Form.Item>
          </div>
          <div className='mt-3'>
            <Form.Item label="Name" name={'name'} rules={[{required: true,message: 'Please input your name!',},]}>
              <Input id='name' disabled={!edit} defaultValue={user.name} />
            </Form.Item>
          </div>
          <div className='mt-3'>
            <Form.Item label="Email" name={'email'} rules={[{required: true,message: 'Please input your Password!',},]}>
              <Input id='email' type='email' disabled={!edit} defaultValue={user.email} />
            </Form.Item>
          </div>
          <div className='text-end mt-5'>
            <Button type="primary" onClick={()=>onSubmit()} icon={!edit?<EditOutlined />:<SendOutlined />}>{!edit?'編輯':'送出'}</Button>
          </div>
        </Form>
      </div>
    </div>
    </>
  )
}
export default User
