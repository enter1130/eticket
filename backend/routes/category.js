const express = require('express');
const router = express.Router();
const db = require('../db');  // 假設你有一個 Knex 設定文件

// 創建新用戶 (Create)
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 插入用戶資料到資料庫
    const [id] = await db('category').insert({ name, email, password });
    res.status(201).json({ id, name, email });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
});

// 獲取所有用戶 (Read)
router.get('/', async (req, res) => {
  try {
    const category = await db.select('*').from('category');
    res.json({message:'Success',result:true,category:category.length > 0 ? category : []});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error });
  }
});

// 獲取單個用戶 (Read by ID)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const category = await db('category').where({ id }).first();
    if (!category) {
      return res.status(404).json({ message: 'not found' });
    }
    res.json(category || {});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error });
  }
});

// 更新用戶 (Update)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updated = await db('category').where({ id }).update({ name, description });
    if (!updated) {
      return res.status(404).json({ message: 'not found' });
    }
    res.json({ message: 'updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
});

// 刪除用戶 (Delete)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db('category').where({ id }).del();
    if (!deleted) {
      return res.status(404).json({ message: 'not found' });
    }
    res.json({ message: 'deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
});

module.exports = router;
