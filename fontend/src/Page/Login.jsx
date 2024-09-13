import { LoginOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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

function LoginPassword({result}){
  const{handleSubmit}=useForm();
  
  function onSubmit(){
    let data=new FormData();
    data.append('username',document.getElementById('username').value)
    data.append('password',document.getElementById('password').value)
    console.log(document.getElementById('username').value);
  }

  return (
    <Form onFinish={handleSubmit(onSubmit)} >
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

function LoginLink({result}){
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
