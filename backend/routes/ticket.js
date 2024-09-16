const express = require('express');
const router = express.Router();
const db = require('../db');  // 假設你有一個 Knex 設定文件

// 獲取所有用戶 (Read)
router.get('/', async (req, res) => {
  try {
    const ticket = await db.select('*').from('ticket');
    res.json({message:'Success',result:true,ticket:ticket.length > 0 ? ticket : []});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket', error });
  }
});

// 獲取單個用戶 (Read by ID)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await db('ticket').where({ id }).first();
    if (!ticket) {
      return res.status(404).json({ message: 'not found' });
    }
    res.json(ticket || {});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket', error });
  }
});

module.exports = router;
