import { DatePicker, Form } from "antd";
import { useState } from "react";

function Ticket() {
  const { RangePicker } = DatePicker;
  const onOk = (value) => {
    console.log('onOk: ', value);
  };
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // 處理日期選擇邏輯
  const handleDateChange = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null); // 重置結束日期
    } else {
      setEndDate(date); // 選擇結束日期
    }
  };

  return (
    <div className="container">
        <div className='p-3 d-flex flex-row align-item-center border rounded mt-3'>
          <div className='d-flex justify-content-center align-item-center'>
            <img className="border" src='public/vite.svg' style={{height:'60px',borderRadius:'50%'}} />
          </div>
          <div className="mx-3">
            <h1>王小明</h1>
            <h5 className="text-muted">會員等級：LV2</h5>
          </div>
        </div>
        <Form>
          <Form.Item label="選擇日期">
          <RangePicker
            format="YYYY-MM-DD"
            onChange={(value, dateString) => {
              console.log('Formatted Selected Time: ', dateString);
            }}
            style={{
              width: '100%',
            }}
            onOk={onOk}
            popupClassName="vertical-rangepicker-dropdown"
          />
          </Form.Item>
        </Form>
    </div>
  )
}

export default Ticket
