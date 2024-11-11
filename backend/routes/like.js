const express = require('express');
const router = express.Router();
const db = require('../db');  // 假設你有一個 Knex 設定文件
const multer = require('multer');
const upload = multer();

router.get('/event', upload.none(), async (req, res) => {
  const { user }=req.auth
 
  try {
    const like = await db('likes')
    .join('event', 'likes.event_id', 'event.id')  // 將 likes 表中的 event_id 和 event 表中的 id 做 join
    .select(
        'likes.*',           // 取得 likes 表的所有欄位
        'event.name as name',           // 活動名稱
        'event.date as date',           // 活動日期
        'event.location as location',   // 活動地點
        'event.description as description', // 活動描述
        'event.organizer as organizer', // 主辦單位
        'event.image as image',         // 活動海報
        'event.quota as quota',         // 活動人數上限
        'event.attendee as attendee',   // 活動參加人數
        'event.like as like',           // 活動按讚數
        'event.price as price',         // 活動價格
        'event.status as status',       // 活動狀態
        'event.tag as tag'              // 活動標籤
    )
    .whereNull('likes.deleted_at')
    .where('likes.user_id', user.id);  // 可選條件：僅查詢特定用戶的按讚記錄
    res.json({message:'Success',result:true,event:like.length > 0 ? like : []});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching like',result:false, error });
  }
});

// 獲取所有用戶 (Read)
router.get('/:id', upload.none(), async (req, res) => {
  const { user }=req.auth
  const { id } = req.params;

  try {
    const like = await db('likes').where('user_id',user.id).where('event_id',id).whereNull('deleted_at').first();
    if (!like) {
      return res.json({message:'Success',result:true,like:0});
    }
    res.json({message:'Success',result:true,like:1});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching like',result:false, error });
  }
});


router.post('/update/:id', upload.none(), async (req, res) => {
  const { id } = req.params;
  const { user }=req.auth
  
  try {
    const find = await db('likes').where('event_id',id).where('user_id',user.id).whereNull('deleted_at').first();
    if (!find) {
      // 若未找到記錄，執行插入
      const is_like = 1;
      const created = await db('likes').insert({ user_id: user.id, event_id: id, is_like });
  
      if (created.length > 0) {
        res.json({ message: 'Liked successfully', result: true, like: is_like });
      } else {
        res.status(500).json({ message: 'Failed to like', result: false });
      }
    } else {
      // 若找到記錄，執行更新
      const updated = await db('likes').where('id', find.id).update({ deleted_at: db.fn.now() });
  
      if (updated > 0) {
        res.json({ message: 'Unliked successfully', result: true, like: 0 });
      } else {
        res.status(500).json({ message: 'Failed to unlike', result: false });
      }
    }   
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event',result:false, error });
  }
});

// 刪除用戶 (Delete)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db('event').where({ id }).del();
    if (!deleted) {
      return res.status(404).json({ message: 'not found',result:false });
    }
    res.json({ message: 'deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event',result:false, error });
  }
});

module.exports = router;
