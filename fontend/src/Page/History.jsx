import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Descriptions, Divider, Form, List, Modal, Rate, Typography, Upload } from "antd";
import Search from "antd/es/input/Search";
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import Menu from "./Menu";

function History({basepath}) {

  const onSearch = (value) =>{
    if(value!==''){
      console.log(value)
    }
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const booklist=[
    {
      id:"1",
      date:'2021-10-10',
      title:'活動1',
      location:'台北市',
      price:"1000 TWD",
      status:'scanned',
      src:'/public/vite.svg',
      content:'活動不錯,下次還會再來',
      rate:5
    },{
      id:"2",
      date:'2021-10-11',
      title:'活動2',
      location:'台北市',
      price:"2000 TWD",
      status:'scanned',
      src:'/public/vite.svg',
      content:'活動不錯,下次還會再來',
      rate:4
    },{
      id:"3",
      date:'2021-10-12',
      title:'活動3',
      location:'台北市',
      price:"3000 TWD",
      status:'scanned',
      src:'/public/vite.svg',
      content:'活動不錯,下次還會再來',
      rate:3
    },{
      id:"4",
      date:'2021-10-12',
      title:'活動3',
      location:'台北市',
      price:"3000 TWD",
      status:'active',
      src:'/public/vite.svg',
      content:'活動不錯,下次還會再來',
      rate:5
    },{
      id:"5",
      date:'2021-10-12',
      title:'活動3',
      location:'台北市',
      price:"3000 TWD",
      status:'active',
      src:'/public/vite.svg',
      content:'',
      rate:0
    },
  ]



  return (
    <>
    <Menu basepath={basepath} />
    <div style={{marginTop:'80px'}} className="container p-3" >
      <Form className="mt-3">
        <Form.Item name={'search'}>
          <Search onSearch={onSearch} allowClear placeholder="輸入活動名稱" />
        </Form.Item>
      </Form>
      <Divider orientation="left" >歷史參與記錄</Divider>
      <List
        loading={loading}
        height={400}
        itemLayout="vertical"
        className="p-3"
        dataSource={booklist}
        renderItem={(item, index) => (
          <List.Item extra={<img style={{width:'100%'}} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>}>
            <List.Item.Meta
              className='border rounded p-3'
              title={item.title}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
              <Edit item={item} />
          </List.Item>
        )}
      />
    </div>
    </>
  )
}

function Edit({item}){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const{handleSubmit}=useForm();
  
  const [rate, setRate] = useState(item.rate);
  function onSubmit(){
    let data=new FormData();
    data.append('content',document.getElementById('content').value)
    data.append('rate',rate)
    console.log(document.getElementById('content').value);
    console.log(rate);
    handleCancel();
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const [expanded, setExpanded] = useState(false);

  return(
    <>
    <Modal centered maskClosable={false} title={item.title} open={isModalOpen} footer="" onOk={handleOk} onCancel={handleCancel}>
      <Form onFinish={handleSubmit(onSubmit)} className="mt-3">
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="評價" name={'content'}>
          <TextArea id='content' rows={4} defaultValue={item.content} />
        </Form.Item>
        <Form.Item label="評分" name={'rate'}>
          <Rate id='rate' onChange={(value)=>setRate(value)} defaultValue={item.rate} />
        </Form.Item>
        <div className='text-end'>
          <Button className='mt-3' htmlType='submit' type="primary">提交</Button>
        </div>
      </Form>
    </Modal>
    <Descriptions title='心得' className='my-3' extra={<Button onClick={showModal} type='text' icon={<EditOutlined/>} />}>
    <Descriptions.Item>
      <Typography.Paragraph
        ellipsis={{
          rows:'3',
          expandable: 'collapsible',
          symbol: expanded?'收起':'查看更多',
          expanded,
      }}>{item.content}</Typography.Paragraph></Descriptions.Item>
      <Descriptions.Item><Rate disabled={true} defaultValue={item.rate} /></Descriptions.Item>
    </Descriptions>
    </>
  )
}

export default History
