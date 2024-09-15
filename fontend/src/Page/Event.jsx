import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Form, Image, Skeleton, Space, Tag } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import logo from '../../public/vite.svg';
import Menu from "./Menu";


function Event() {
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

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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
                <Button block onClick={()=>window.location.href=`/event/${item.id}`} >立即報名</Button>
                <Button icon={item.like?(<HeartFilled />):<HeartOutlined />} />
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
