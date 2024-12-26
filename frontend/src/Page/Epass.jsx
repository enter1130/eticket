import { ApiOutlined, GithubOutlined } from '@ant-design/icons';
import { Avatar, Card, QRCode } from 'antd';
import React, { useState } from 'react';

function Epass({item,logo}) {

    const [side,setSide]=useState(item.status=='scanned'?false:true)
    const handleFlip=()=> {
        setSide(!side)
    }

    return (
        <div>
            <div className="card-container">
                <div className={`card ${side ? 'flipped' : ''}`} onClick={handleFlip}>
                    <div className="card-front">
                        <FrontCard item={item} />
                    </div>
                    <div className="card-back">
                        <BackCard item={item} logo={logo} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function FrontCard({item}){
    return(
        <div>
            <Card style={{ height: "600px",maxWidth:'400px'}} className='rounded' cover={
                <div className="rounded-top d-flex align-items-center" style={{height: "350px",width: "100%",overflow: "hidden",}}>
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" alt="Example" style={{width: "100%",height: "100%",objectFit: "cover"}}/>
                </div>
            }>
                <div className='text-center my-3' style={{fontSize:'22pt'}}>
                    <div>{item.name}</div>
                </div>
                <div className='d-flex flex-row justify-content-center'>
                    <div className='p-1 d-flex align-items-center justify-content-center'>
                        <Avatar size={90} className='border' src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                    </div>
                    <div className='p-1 mx-2 d-flex align-items-center justify-content-center'>
                        <div style={{fontSize:'14pt'}}>
                            <div>王小明</div>
                            <div>職稱: 學生</div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

function BackCard({item,logo}){
    var isPass=true
    var isFood=true
    return(
        <div>
            <Card style={{ height: "600px",maxWidth:'400px'}} className='rounded position-relative'>
                <div className='text-center my-3' style={{fontSize:'22pt'}}>
                    <div>{item.name}</div>
                </div>
                <div style={{ height: "320px"}} className='rounded-top d-flex justify-content-center align-items-center'>
                    <QRCode size={250} icon={logo} iconSize={160/4} errorLevel="H" value={item.id} />
                </div>
                <div className='position-absolute bottom-0 start-0 m-3'>
                    <div>地點：{item.location}</div>
                    <div>戳章時間：2024-10-22 17:00</div>
                </div>
                <div className='position-absolute bottom-0 end-0 m-3'>
                    {isFood?(<Avatar size={50} className='mx-1' icon={<ApiOutlined />} />):<Avatar className='mx-1' size={50} />}
                    {isPass?(<Avatar size={50} className='mx-1' icon={<GithubOutlined />} />):<Avatar className='mx-1' size={50} />}
                </div>
            </Card>
        </div>
    )
}

export default Epass;