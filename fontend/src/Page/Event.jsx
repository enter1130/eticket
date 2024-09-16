import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Form, Image, Skeleton, Space, Tag } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import Menu from "./Menu";


function Event() {
  const onSearch = (value) =>{
    if(value!==''){
      console.log(value)
    }
  };

  const [event, setEvent] = useState([]);
  function getEvent(){
    fetch('http://localhost:3000/api/event',
    {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
      }
    }
    )
    .then(res=>res.json())
    .then(data=>{
      setEvent(data.event)
    })
  }

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getEvent();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if(!event) return(<></>)
  return (
    <>
    <Menu />
    <div style={{marginTop:'80px'}} className="container p-3" >
      <Divider orientation="left" >全部活動</Divider>
      <Form className="mt-3">
        <Form.Item name={'search'}>
          <Search onSearch={onSearch} allowClear placeholder="輸入活動名稱" />
        </Form.Item>
      </Form>
      <Skeleton loading={loading} active paragraph={{rows:15}} className="">
      {event.map((item,index)=>(
          <div className="text-center px-2" key={index}>
            <Card title={item.title}>
              <div className="border rounded p-3 align-items-center d-flex" style={{height:'250px',overflow:'hidden'}}>
                <Image preview={false} src={item.image} width={'100%'}/>
              </div>
              <div className="mt-3 text-start">
                <h3>{item.name}</h3>
                <div>主辦單位：{item.organizer}</div>
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
                <Button icon={item.like?(<HeartFilled />):<HeartOutlined />}>{item.like}</Button>
              </Space.Compact>
            </Card>
          </div>
        ))}
      <div className="text-center mt-3">
        <Button block size="large" type="dashed">查看更多</Button>
      </div>
      </Skeleton>
    </div>
    </>
  )
}

export default Event
