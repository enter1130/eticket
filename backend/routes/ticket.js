const express = require('express');
const router = express.Router();
const db = require('../db');  // 假設你有一個 Knex 設定文件
const multer = require('multer');
const upload = multer();

// 獲取所有用戶 (Read)
router.get('/', upload.none(), async (req, res) => {
  const { user }=req.auth

  try {
    const ticket = await db('ticket').join('event', 'ticket.event_id', 'event.id')  // 將 ticket 表中的 event_id 和 event 表中的 id 做 join
    .select(
        'ticket.*',           // 取得 ticket 表的所有欄位
        'event.name as name',           // 活動名稱
        'event.date as date',           // 活動日期
        'event.location as location',   // 活動地點
        'event.description as event_description', // 活動描述
        'event.organizer as organizer', // 主辦單位
        'event.image as image',         // 活動海報
        'event.quota as quota',         // 活動人數上限
        'event.attendee as attendee',   // 活動參加人數
        'event.like as like',           // 活動按讚數
        'event.price as price',         // 活動價格
        'event.status as event_status',       // 活動狀態
        'event.tag as tag'              // 活動標籤
    )
    .whereNull('ticket.deleted_at')
    .where('ticket.user_id', user.id);  // 可選條件：僅查詢特定用戶的按讚記錄;
    res.json({message:'Success',result:true,ticket:ticket.length > 0 ? ticket : []});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket',result:false, error });
  }
});

// 創建新用戶 (Create)
router.post('/create', upload.none(), async (req, res) => {
  const { user }=req.auth
  const { event_id } = req.body;

  try {
    // 插入用戶資料到資料庫
    const find = await db('ticket').where('event_id',event_id).where('user_id',user.id).whereNull('deleted_at').first();
    if(!find){
      const created = await db('ticket').insert({"user_id":user.id,"event_id":event_id,"status":'active'});
      if (created.length > 0) {
        res.json({ message: 'Successfully', result: true });
      }
    }
    res.status(500).json({ message: 'Failed', result: false });
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket',result:false, error });
  }
});

// 獲取所有用戶 (Read)
router.get('/:id', upload.none(), async (req, res) => {
  const { user }=req.auth
  const { id } = req.params;

  try {
    const ticket = await db('ticket').where('user_id',user.id).where('event_id',id).whereNull('deleted_at').first();
    if (!ticket) {
      return res.json({message:'Success',result:true,ticket:0});
    }
    res.json({message:'Success',result:true,ticket:1});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket',result:false, error });
  }
});

module.exports = router;
