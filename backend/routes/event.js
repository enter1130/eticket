const express = require('express');
const router = express.Router();
const db = require('../db');  // 假設你有一個 Knex 設定文件
const multer = require('multer');
const knex = require('knex');
const upload = multer();

// 創建新用戶 (Create)
router.post('/', async (req, res) => {
  const { name,category,date,location,description,organizer,image,quota,attendee,like,price,status,tag } = req.body;

  try {
    // 插入用戶資料到資料庫
    const [id] = await db('event').insert({ name,category,date,location,description,organizer,image,quota,attendee,like,price,status,tag });
    res.status(201).json({ id, name,category,date,location,description,organizer,image,quota,attendee,like,price,status,tag });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event',result:false, error });
  }
});

// 獲取所有用戶 (Read)
router.get('/', async (req, res) => {
  try {
    const event = await db.select('*').from('event').orderBy('date','asc');
    
    res.json({message:'Success',result:true,event:event.length > 0 ? event : []});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event',result:false, error });
  }
});

// 獲取單個用戶 (Read by ID)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const event = await db('event').where({ id }).first();
    if (!event) {
      return res.status(404).json({ message: 'not found',result:false });
    }
    res.json({message:'Success',result:true,event:event || {}});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event',result:false, error });
  }
});

// 更新用戶 (Update)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name,category,date,location,description,organizer,image,quota,attendee,like,price,status,tag } = req.body;

  try {
    const updated = await db('event').where({ id }).update({ name,category,date,location,description,organizer,image,quota,attendee,like,price,status,tag });
    if (!updated) {
      return res.status(404).json({ message: 'not found',result:false });
    }
    res.json({ message: 'updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event',result:false, error });
  }
});

router.post('/like.update', upload.none(), async (req, res) => {
  const { event_id } = req.body;
  const { user }=req.auth
  const user_id=user.id
  
  try {
    const find = await db('likes').where('event_id',event_id).where('user_id',user_id).whereNull('deleted_at').first();
    const event_like = await db('event').where("id",event_id).first('like');
    const is_like=1
    if (!find) {
      const created = await db('likes').insert({user_id,event_id,is_like});
      const like=event_like.like+is_like
      const updated = await db('event').where('id',event_id).update({like});
    }else{
      const deleted = await db('likes').where('id', find.id).update({deleted_at: db.fn.now()});
      const like=event_like.like-is_like
      const updated = await db('event').where('id',event_id).update({like});
    }
    const event = await db.select('*').from('event').orderBy('date','asc');
    res.json({message:'updated successfully',result:true,event:event.length > 0 ? event : []});
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
