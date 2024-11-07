import { LoginOutlined, PicRightOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Card, Carousel, Divider, Form, Image, Modal, QRCode, Skeleton, Space, Tag } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import logo from '../../public/vite.svg';
import Menu from "./Menu";

function Home() {
  const cookies = new Cookies();
  const [newlist, setNewlist] = useState([]);
  const [result, setResult] = useState(false);

  function getData(){
    fetch('http://localhost:3000/api',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Authorization':`${cookies.get('token')}`
      }})
    .then(res=>res.json())
    .then(data=>{
      setNewlist(data.event)
    })

    fetch('http://localhost:3000/api/ticket',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Authorization':`${cookies.get('token')}`
      }})
    .then(res=>res.json())
    .then(data=>{
      if(data.result){
        setResult(data.result)
        setTicket(data.ticket)
      }
    })
  }

  const onSearch = (value) =>{
    if(value!==''){
      console.log(value)
    }
  };

  const [ticket,setTicket]=useState([])

  const [visible, setVisible] = useState(false);

  const modalOpen=(value)=>{
    setVisible(value);
  }

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
    <Menu />
    <div style={{marginTop:'80px'}} className="container p-3" >
      <Form className="mt-3">
        <Form.Item name={'search'}>
          <Search onSearch={onSearch} allowClear placeholder="輸入活動名稱" />
        </Form.Item>
      </Form>
      <Divider orientation="left" >即將到來的活動</Divider>
      <Skeleton loading={loading} active paragraph={{rows:15}}>
      {result?<Carousel infinite={false} draggable={visible} beforeChange={visible} style={{minHeight:'550px'}}>
        {ticket.map((item,index)=>(
          <Ticket isOpen={modalOpen} key={index} item={item} />
        ))}
        {ticket.length?(
        <div className="text-center p-2 d-flex justify-content-center">
          <Button type="dashed" className="ticket" >
            <PicRightOutlined style={{ fontSize: '50px'}} />
            <div>查看更多</div>
          </Button>
        </div>):<div className="text-center p-2 d-flex justify-content-center">
          <Button onClick={()=>window.location.href='/event'} type="dashed" className="ticket" >
            <PicRightOutlined style={{ fontSize: '50px'}} />
            <div>按此瀏覽全部活動</div>
          </Button>
        </div>}
      </Carousel>:<div className="text-center p-2 d-flex justify-content-center align-items-center">
          <Button className="mx-2" onClick={()=>window.location.href='/login'} type={'primary'} block style={{height:'70px'}} >
            <LoginOutlined style={{ fontSize: '30px'}} label="按此登錄" />
            <div className="mx-2" style={{fontSize:'15pt'}}>按此登錄</div>
          </Button>
        </div>}
      </Skeleton>
      <div style={{paddingTop:'40px',paddingBottom:'40px'}}>
      <Divider orientation="left" >推薦活動</Divider>
      <Skeleton loading={loading} active paragraph={{rows:15}} className="">
      <Carousel dotPosition="Bottom"  draggable={visible} beforeChange={visible} arrows infinite={false} style={{minHeight:'490px'}}>
        {newlist.map((item,index)=>(
          <div className="text-center px-2" key={index}>
            <Card title={item.title}>
              <div className="border rounded p-3">
                <Image preview={false} src={item.image} width={160} />
              </div>
              <div className="mt-3 text-start">
                <h3>{item.name}</h3>
                <div>日期：{item.date}</div>
                <div>地點：{item.location}</div>
                <div>價格：{item.price?<>{item.price} TWD</>:'Free'}</div>
                <div className="mt-3">
                  {item.tag.map((tag,index)=>(
                    <Tag key={index} color={tag.color}>{tag.name}</Tag>
                  ))}
                </div>
              </div>
              <Space.Compact block className="mt-3" align="baseline">
                <Button block onClick={()=>window.location.href=`/event/${item.id}`} >立即報名</Button>
                <Button icon={<TeamOutlined />}>{item.attendee}</Button>
              </Space.Compact>
            </Card>
          </div>
        ))}
      </Carousel>
      <div className="text-center mt-3">
        <Button block size="large" type="dashed">查看更多</Button>
      </div>
      </Skeleton>
      </div>
    </div>
    </>
  )
}

function Ticket({item,isOpen}){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    isOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    isOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    isOpen(false);
  };
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  return(
    <>
    <Modal centered maskClosable={false} title={item.title} footer="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div style={{height:windowHeight*0.7}} className="d-flex justify-content-center align-items-center">
        <QRCode size={250} status={item.status} icon={logo} iconSize={160/4} errorLevel="H" value={item.id} />
      </div>
      <Divider />
      <div className="text-center">抵達現場後請出示此QR code</div>
    </Modal>
    <div className="text-center p-2 d-flex justify-content-center">
      <div className="ticket">
        <img src="https://via.placeholder.com/300x200" alt="Event Image" />
        <div className="ticket-info">
            <h1>{item.title}</h1>
            <div className="text-start">
            <p className="location">地點：{item.location}</p>
            <p className="date">日期：{item.date}</p>
            <p className="price">價格：{item.price}</p>
            </div>
            <div className="ticket-footer">
                <Button onClick={showModal} type="text">{item.status=='scanned'?"感謝您的參與！":"展示QR Code"}</Button>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
