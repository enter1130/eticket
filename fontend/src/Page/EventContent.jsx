import { ArrowLeftOutlined, HeartFilled, HeartOutlined, LoginOutlined } from "@ant-design/icons";
import { Avatar, Button, Descriptions, Divider, Drawer, Image, List, Modal, Rate, Skeleton, Space, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Cookies from "universal-cookie";
import Menu from "./Menu";

function EventContent() {
  const cookies = new Cookies();

  const [user,setUser]=useState(null)
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

  const [like,setLike]=useState(0)
  const [ticket,setTicket]=useState(0)
  function getLike(){
    fetch(`http://localhost:3000/api/like/${id}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Authorization':`${cookies.get('token')}`
      }})
    .then(res=>res.json())
    .then(data=>{
      setLike(data.like)
    })

    fetch(`http://localhost:3000/api/ticket/${id}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Authorization':`${cookies.get('token')}`
      }})
    .then(res=>res.json())
    .then(data=>{
      setTicket(data.ticket)
    })
  }

  const [event, setEvent] = useState(null);
  const { id } = useParams();
  function updateLike(){
    fetch(`http://localhost:3000/api/like/update/${id}`,{
      method:'POST',
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Authorization':`${cookies.get('token')}`
      }})
    .then(res=>res.json())
    .then(data=>{
      setLike(data.like)
    })
  }

  function getEvent(){
    fetch(`http://localhost:3000/api/event/${id}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Authorization':`${cookies.get('token')}`
      }
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.result){
        setEvent(data.event)
      }else{
        window.location.href='/404';
      }
    })
  }

  const list=[
    {
      id:"1",
      date:'2021-10-10',
      description:'活動不錯,下次還會再來',
      user:'王小明1',
      src:'/public/vite.svg',
      rate:5,
    },{
      id:"2",
      date:'2021-10-11',
      description:'活動不錯,下次還會再來',
      user:'王小明2',
      src:'/public/vite.svg',
      rate:4,
    },{
      id:"3",
      date:'2021-10-12',
      description:'活動不錯,下次還會再來',
      user:'王小明3',
      src:'/public/vite.svg',
      rate:3,
    },
  ]

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getEvent();
    getLike();
    getUser()
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [expanded, setExpanded] = useState(false);

  if(!event) return(<></>)
  return (
    <>
    <Menu />
    <div style={{height:'300px',overflow:'hidden'}}>
      <Image src={event.image} width={'100%'}/>
    </div>
    <div className="container p-3">
      <Skeleton loading={loading} active paragraph={{rows:15}}>
        <Typography.Title className="d-flex align-items-center justify-content-between">
        {event.name}
        {user?(like?(<HeartFilled style={{ fontSize: '25px', color: 'red' }} onClick={()=>updateLike()} />):<HeartOutlined style={{ fontSize: '25px', color: '#000' }} onClick={()=>updateLike()} />):null}
        </Typography.Title>
        <div className="text-center">
          <div className="mt-3 text-start px-2">
              <div className="my-3">
                {event.tag.map((tag,index)=>(
                  <Tag key={index} color={tag.color}>{tag.name}</Tag>
                ))}
              </div>
              <Descriptions title="活動資訊" column={1}>
                <Descriptions.Item label="日期">{event.date}</Descriptions.Item>
                <Descriptions.Item label="地點">{event.location}</Descriptions.Item>
                <Descriptions.Item label="參與人數">{event.attendee} / {event.quota}</Descriptions.Item>
                <Descriptions.Item label="價格">{event.price?<>{event.price} TWD</>:'Free'}</Descriptions.Item>
                <Descriptions.Item label="活動內容"></Descriptions.Item>
                <Descriptions.Item>
                <Typography.Paragraph
                  title="活動內容"
                  ellipsis={{
                    rows:'3',
                    expandable: 'collapsible',
                    symbol: expanded?'收起':'查看更多',
                    expanded,
                    onExpand: (_, info) => setExpanded(info.expanded),
                  }}
                >
                  {event.description.repeat(
                    20,
                  )}
                </Typography.Paragraph>
                </Descriptions.Item>
              </Descriptions>
          </div>
        </div>
        <Divider orientation="left" ></Divider>
        <Typography.Title level={3}>活動評價</Typography.Title>
        {event.status!='open'?(<List
          loading={loading}
          height={400}
          itemLayout="vertical"
          className="px-2"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 2,
          }}
          dataSource={list}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <div className="d-flex align-items-center flex-row my-3">
              <span className="me-1"><Avatar className="border" size={30} >{item.user}</Avatar><span className="mx-2">{item.user}</span></span>
              <Rate disabled={true} defaultValue={item.rate} />
              </div>
              <Typography.Paragraph
                title="心得內容"
                ellipsis={{rows:'2'}}
              >
              {item.description.repeat(20,)}
              </Typography.Paragraph>
              <Thoughts item={item} />
          </List.Item>
          )}
        />)
        :(
        <Typography.Paragraph title="心得內容" ellipsis={{rows:'2'}}>
          <div className="d-flex justify-content-center align-items-center" style={{minHeight:"100px"}}>
            活動尚未結束，心得收集中......
          </div>
        </Typography.Paragraph>)}
        <div style={{marginBottom:'80px'}}></div>
      </Skeleton>
      <Space.Compact size="large" block className="text-center fixed-bottom p-3" align="baseline">
        <Button size="large" onClick={()=>window.location.href='/event'} icon={<ArrowLeftOutlined />} />
        {user?(<Signup event={event} ticket={ticket} />):<Button onClick={()=>window.location.href='/login'} icon={<LoginOutlined />} size="large" block>請先登入</Button>}
      </Space.Compact>
    </div>
    </>
  )
}

function Signup({event,ticket}){
  const cookies = new Cookies();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('是否報名參加「'+event.name+'」?');
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('報名中......');
    setConfirmLoading(true);
    let data = new FormData();
    data.append('event_id', event.id);
    getTicket(data)
  };

  function getTicket(formData){
    fetch(`http://localhost:3000/api/ticket/create`,{
      method:'POST',
      body: formData, // 直接傳送 FormData
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Authorization':`${cookies.get('token')}`
      }
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.result){
        setTimeout(() => {
          setConfirmLoading(false);
          setModalText('報名成功！')
        }, 2000);
      }else{
        setTimeout(() => {
          setConfirmLoading(false);
          setModalText('重複報名！')
        }, 2000);
      }

      setTimeout(() => {
        setOpen(false);
        setModalText('是否報名參加「'+event.name+'」?')
      }, 5000);
    })
  }

  const handleCancel = () => {
    setOpen(false);
  };

  return(
    <>
    <Button size="large" onClick={showModal} block disabled={event.status=='expired' || ticket==1?true:false}>{event.status=='expired'?'已截止':ticket==1?('已報名'):'立即報名'}</Button>
    <Modal
      title="確認報名"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      cancelText='取消'
      okText='確認報名'
      centered
    >
      <p>{modalText}</p>
    </Modal>
    </>
  )
}

function Thoughts({item}){
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  return(<>
    <span className="d-flex justify-content-end">
      <Button type="text" style={{color:'green'}} onClick={showDrawer}>查看心得</Button>
    </span>
    <Drawer placement="bottom" height={windowHeight*0.9} onClose={onClose} open={open}>
      <div className="d-flex align-items-center flex-row mb-3">
        <span className="me-1"><Avatar className="border" size={30} >{item.user}</Avatar><span className="mx-2">{item.user}</span></span>
        <Rate disabled={true} defaultValue={item.rate} />
      </div>
      <Typography.Paragraph title="心得內容" >{item.description.repeat(20,)}</Typography.Paragraph>
    </Drawer>
  </>)
}

export default EventContent
