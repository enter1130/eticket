const express = require('express');
const router = express.Router();
const db = require('../db');  // 假設你有一個 Knex 設定文件

// 創建新用戶 (Create)
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 插入用戶資料到資料庫
    const [id] = await db('users').insert({ name, email, password });
    res.status(201).json({ id, name, email });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// 獲取所有用戶 (Read)
router.get('/', async (req, res) => {
  try {
    const users = await db.select('*').from('users');
    res.json(users.length > 0 ? users : []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// 獲取單個用戶 (Read by ID)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await db('users').where({ id }).first();
    if (!user) {
      return res.status(404).json({ message: 'not found' });
    }
    res.json(user || {});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

// 更新用戶 (Update)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const updated = await db('users').where({ id }).update({ name, email, password });
    if (!updated) {
      return res.status(404).json({ message: 'not found' });
    }
    res.json({ message: 'updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// 刪除用戶 (Delete)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db('users').where({ id }).del();
    if (!deleted) {
      return res.status(404).json({ message: 'not found' });
    }
    res.json({ message: 'deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

module.exports = router;
