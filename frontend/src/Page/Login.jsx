import { LoginOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';

function Login() {

  const [login, setLogin] = useState(false);
  const [text, setText] = useState('Sign in with Password');
  const [component, setComponent] = useState(<LoginEmail />);
  const loadComponent = async (value) => {
    setLogin(value);
    if(value){
      setText('Sign in with Email');
      setComponent(<LoginPassword />);
    }else{
      setText('Sign in with Password');
      setComponent(<LoginEmail />);
    }
  };

  return (
    <div id='login'>
      <div className="border rounded p-3 container text-center" style={{minWidth:'100%'}}>
        <img className='my-3' src='public/eTicket.png' style={{maxWidth:'120px'}} />
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

function LoginEmail(){
  const cookies = new Cookies();
  const{handleSubmit}=useForm();
  const [code,setCode]=useState()
  useEffect(()=>{
    setCode(Math.floor(Math.random()*10).toString()+Math.floor(Math.random()*10).toString()+Math.floor(Math.random()*10).toString()+Math.floor(Math.random()*10).toString()+Math.floor(Math.random()*10).toString())
  },[])
  console.log(code)
  function onSubmit() {
    let data = new FormData();
    data.append('email', document.getElementById('email').value);
    if(document.getElementById('code').value!=code){
      openNotification({type:'error',message:'驗證碼錯誤！'});
    }else{
      getLogin(data);
    }
  }

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data) => {    
    api[data.type]({
      message: data.message,
      placement:'top',
      duration: 3,
    });
  };
  
  // 發送 POST 請求
  function getCode(formData) {
    fetch('http://localhost:3000/api/get.email', {
      method: 'POST',
      body: formData // 直接傳送 FormData
    })
    .then(res => res.json())
    .then(data => {
      openNotification(data);
      setCode(data.code)
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

    // 發送 POST 請求
  function getLogin(formData) {
      fetch('http://localhost:3000/api/auth/login.email', {
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

  const onSearch = (value, _e, info) => {
    let data = new FormData();
    data.append('email', value);
    
    getCode(data)
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      {contextHolder}
      <div className='mt-3'>
        <Form.Item label="Email" name={'email'} rules={[{required: true,message: 'Please input your Email!',type:'email'},]}>
          <Input.Search enterButton="send" onSearch={onSearch} id='email' type='email' />
        </Form.Item>
      </div>
      <div className='mt-3'>
        <Form.Item label="Code" name={'code'} rules={[{required: true,message: 'Please input your Code!',},]}>
          <Input.Password id='code' maxLength={4} />
        </Form.Item>
      </div>
      <div className='text-end mt-5'>
        <Button type="primary" htmlType="submit" icon={<LoginOutlined />}>Login</Button>
      </div>
    </Form>
  )
}

export default Login
