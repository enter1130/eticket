import { LoginOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';

function Login() {

  const [login, setLogin] = useState(false);
  const [text, setText] = useState('Sign in with Password');
  const [component, setComponent] = useState(<LoginLink />);
  const loadComponent = async (value) => {
    setLogin(value);
    if(value){
      setText('Sign in with Link');
      setComponent(<LoginPassword />);
    }else{
      setText('Sign in with Password');
      setComponent(<LoginLink />);
    }
  };

  return (
    <div id='login'>
      <div className="border rounded p-3 container text-center" style={{minWidth:'100%'}}>
        <img src='public/vite.svg' style={{minWidth:'80px'}} />
        {component}
        <div className='mt-3'>
          <Button type="text" onClick={()=>loadComponent(!login)}>{text}</Button>
        </div>
      </div>
    </div>
  )
}

function LoginPassword(){
  const cookies = new Cookies();
  const{handleSubmit}=useForm();
  
  function onSubmit() {
    let data = new FormData();
    data.append('username', document.getElementById('username').value);
    data.append('password', document.getElementById('password').value);
    
    getLogin(data);
  }

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data) => {    
    api[data.type]({
      message: data.message,
      placement:'top',
      duration: 5,
    });
  };
  
  // 發送 POST 請求
  function getLogin(formData) {
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: formData // 直接傳送 FormData
    })
    .then(res => res.json())
    .then(data => {
      openNotification(data);
      if(data.result){
        cookies.set('token', `Bearer ${data.token}`);
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  return (
    <Form onFinish={handleSubmit(onSubmit)} >
      {contextHolder}
      <div className='mt-3'>
        <Form.Item label="Username" name={'username'} rules={[{required: true,message: 'Please input your username!',},]}>
          <Input id='username' />
        </Form.Item>
      </div>
      <div className='mt-3'>
        <Form.Item label="Password" name={'password'} rules={[{required: true,message: 'Please input your Password!',},]}>
          <Input.Password id='password' />
        </Form.Item>
      </div>
      <div className='text-end mt-5'>
        <Button type="primary" htmlType="submit" icon={<LoginOutlined />}>Login</Button>
      </div>
    </Form>
  )
}

function LoginLink(){
  const{handleSubmit}=useForm();
  
  function onSubmit(){
    let data=new FormData();
    data.append('email',document.getElementById('email').value)
    console.log(document.getElementById('email').value);
  }

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <div className='mt-3'>
        <Form.Item label="Email" name={'email'} rules={[{required: true,message: 'Please input your Email!',type:'email'},]}>
          <Input id='email' type='email' />
        </Form.Item>
      </div>
      <div className='text-end mt-5'>
        <Button type="primary" htmlType="submit" icon={<LoginOutlined />}>Login</Button>
      </div>
    </Form>
  )
}

export default Login
