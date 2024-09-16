const express = require('express');
const router = express.Router();
const db = require('../db');  // 假設你有一個 Knex 設定文件

// 獲取所有用戶 (Read)
router.get('/', async (req, res) => {
  try {
    const event = await db.select('*').from('event');
    res.json({message:'Success',result:true,event:event.length > 0 ? event : []});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

module.exports = router;
