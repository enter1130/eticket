import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Avatar, Button, Descriptions, Divider, Drawer, Image, List, Rate, Skeleton, Space, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import Menu from "./Menu";


function EventContent({id}) {

  const item={
    id:"1",
    date:'2021-10-10',
    title:'活動1',
    location:'台北市',
    price:1000,
    like:false,
    description:'活動內容，大致描述活動舉辦的原因，目的，內容，時間，地點，費用等等',
    tag:[
      {name:'new',color:'default'},
      {name:'free',color:'success'},
      {name:'discount',color:'processing'}
    ],
    status:'expired',
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
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [expanded, setExpanded] = useState(false);

  return (
    <>
    <Menu />
    <div style={{height:'250px',overflow:'hidden'}}>
      <Image preview={false} src="https://via.placeholder.com/300x200" width={'100%'}/>
    </div>
    <div className="container p-3">
      <Skeleton loading={loading} active paragraph={{rows:15}} className="">
        <Typography.Title>{item.title}</Typography.Title>
        <div className="text-center">
          <div className="mt-3 text-start px-2">
              <div className="my-3">
                {item.tag.map((tag,index)=>(
                  <Tag key={index} color={tag.color}>{tag.name}</Tag>
                ))}
              </div>
              <Descriptions title="活動資訊" column={1}>
                <Descriptions.Item label="日期">{item.date}</Descriptions.Item>
                <Descriptions.Item label="地點">{item.location}</Descriptions.Item>
                <Descriptions.Item label="價格">{item.price} TWD</Descriptions.Item>
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
                  {item.description.repeat(
                    20,
                  )}
                </Typography.Paragraph>
                </Descriptions.Item>
              </Descriptions>
          </div>
        </div>
        <Divider orientation="left" ></Divider>
        <Typography.Title level={3}>活動評價</Typography.Title>
        <List
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
        />
        <div style={{marginBottom:'80px'}}></div>
      </Skeleton>
      <Space.Compact size="large" block className="text-center fixed-bottom p-3" align="baseline">
        <Button size="large" block>{item.status=='expired'?'已截止':'立即報名'}</Button>
        <Button size="large" icon={item.like?(<HeartFilled />):<HeartOutlined />} />
      </Space.Compact>
    </div>
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
