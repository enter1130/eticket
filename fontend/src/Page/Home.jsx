import { HeartFilled, HeartOutlined, PicRightOutlined } from "@ant-design/icons";
import { Button, Card, Carousel, Divider, Form, Image, Modal, QRCode, Skeleton, Space, Tag } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import logo from '../../public/vite.svg';
import Menu from "./Menu";

function Home({basepath}) {
  const onSearch = (value) =>{
    if(value!==''){
      console.log(value)
    }
  };
  const booklist=[
    {
      id:"1",
      date:'2021-10-10',
      title:'活動1',
      location:'台北市',
      price:"1000 TWD",
      status:'scanned',
      src:'/public/vite.svg'
    },{
      id:"2",
      date:'2021-10-11',
      title:'活動2',
      location:'台北市',
      price:"2000 TWD",
      status:'active',
      src:'/public/vite.svg'
    },{
      id:"3",
      date:'2021-10-12',
      title:'活動3',
      location:'台北市',
      price:"3000 TWD",
      status:'active',
      src:'/public/vite.svg'
    },
  ]

  const [newlist, setNewlist] = useState([
    {
      id:"1",
      date:'2021-10-10',
      title:'活動1',
      location:'台北市',
      price:1000,
      like:false,
      tag:[
        {name:'new',color:'default'},
        {name:'free',color:'success'},
        {name:'discount',color:'processing'}
      ]
    },{
      id:"2",
      date:'2021-10-11',
      title:'活動2',
      location:'台北市',
      price:2000,
      like:true,
      tag:[
        {name:'new',color:'default'},
        {name:'hot',color:'error'},
        {name:'free',color:'success'},
      ]
    },{
      id:"3",
      date:'2021-10-12',
      title:'活動3',
      location:'台北市',
      price:3000,
      like:true,
      tag:[
        {name:'new',color:'default'},
        {name:'hot',color:'error'},
        {name:'discount',color:'processing'}
      ]
    },
  ]);

  const handleUpdate = (target) => {
    // 使用 map 來更新指定的項目（這裡以 id 為 3 的項目為例）
    const updatedList = newlist.map(item => item.id==target ?item.like=!item.like:item.like=item.like);
    setNewlist(updatedList);
    console.log(newlist);
    
  }

  const [visible, setVisible] = useState(false);

  const modalOpen=(value)=>{
    setVisible(value);
  }

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
    <Menu basepath={basepath} />
    <div style={{marginTop:'80px'}} className="container p-3" >
      <Form className="mt-3">
        <Form.Item name={'search'}>
          <Search onSearch={onSearch} allowClear placeholder="輸入活動名稱" />
        </Form.Item>
      </Form>
      <Divider orientation="left" >即將到來的活動</Divider>
      <Skeleton loading={loading} active paragraph={{rows:15}} className="">
      <Carousel infinite={false} draggable={visible} beforeChange={visible} style={{minHeight:'550px'}}>
        {booklist.map((item,index)=>(
          <Ticket isOpen={modalOpen} key={index} item={item} />
        ))}
        {booklist.length?(
        <div className="text-center p-2 d-flex justify-content-center">
          <Button type="dashed" className="ticket" >
            <PicRightOutlined style={{ fontSize: '50px'}} />
            <div>查看更多</div>
          </Button>
        </div>):<div className="text-center p-2 d-flex justify-content-center">
          <Button onClick={()=>window.location.href=`${basepath}/event`} type="dashed" className="ticket" >
            <PicRightOutlined style={{ fontSize: '50px'}} />
            <div>按此瀏覽全部活動</div>
          </Button>
        </div>}
      </Carousel>
      </Skeleton>
      <div style={{paddingTop:'50px',paddingBottom:'50px'}}>
      <Divider orientation="left" >推薦活動</Divider>
      <Skeleton loading={loading} active paragraph={{rows:15}} className="">
      <Carousel dotPosition="Bottom"  draggable={visible} beforeChange={visible} arrows infinite={false} style={{minHeight:'490px'}}>
        {newlist.map((item,index)=>(
          <div className="text-center px-2">
            <Card title={item.title} key={index}>
              <div className="border rounded p-3">
                <Image preview={false} src={logo} width={160} />
              </div>
              <div className="mt-3 text-start">
                <div>日期：{item.date}</div>
                <div>地點：{item.location}</div>
                <div>價格：{item.price}</div>
                <div className="mt-3">
                  {item.tag.map((tag,index)=>(
                    <Tag key={index} color={tag.color}>{tag.name}</Tag>
                  ))}
                </div>
              </div>
              <Space.Compact block className="mt-3" align="baseline">
                <Button block onClick={()=>window.location.href=`${basepath}/event/${item.id}`} >立即報名</Button>
                <Button icon={item.like?(<HeartFilled />):<HeartOutlined />} />
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
