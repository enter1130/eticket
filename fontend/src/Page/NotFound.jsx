import { Button, Result } from "antd";
import { useState } from "react";

function NotFound(){
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    return(
        <div className="d-flex align-items-center justify-content-center" style={{height:windowHeight}}>
        <Result
            status="404"
            title="404"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary" onClick={()=>window.location.href='/'}>Back Home</Button>}
        />
        </div>
    )
}

export default NotFound
