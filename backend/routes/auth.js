const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');  // 假設你有一個 Knex 設定文件
const router = express.Router();
const upload = multer();
require('dotenv').config()

const secret = process.env.SECRET;

router.post('/login', upload.none(), async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // 查找用戶
    const user = await db('users').where({ username }).first();

    if (!user) {
      return res.status(400).json({ message: 'User not found',type:'error',result:false });
    }

    // 驗證密碼
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password',type:'error',result:false });
    }

    const tokenPayload = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,  // 只包含需要的字段，不包含 password
      user_id:user.user_id
    };

    // 生成 JWT
    const token = jwt.sign({ user:  tokenPayload },secret , { expiresIn: '1h' });

    // 返回 token
    res.json({ message:'Login Success',type:'success',result:true,token:token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed',type:'error',result:false, error });
  }
});

router.post('/login.email', upload.none(), async (req, res) => {
  const { email } = req.body;
  
  try {
    // 查找用戶
    const user = await db('users').where({ email }).first();

    if (!user) {
      return res.status(400).json({ message: 'User not found',type:'error',result:false });
    }

    const tokenPayload = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,  // 只包含需要的字段，不包含 password
      user_id:user.user_id
    };

    // 生成 JWT
    const token = jwt.sign({ user:  tokenPayload },secret , { expiresIn: '1h' });

    // 返回 token
    res.json({ message:'Login Success',type:'success',result:true,token:token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed',type:'error',result:false, error });
  }
});

router.get('/user', async (req, res) => {
  const user = req.auth.user; // 從 Token 中解碼出的 userId
  try {
    // 返回查詢到的用戶信息
    res.json({
      message: 'User info retrieved successfully',
      user: user  // 直接從 JWT 中返回用戶信息
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user info', error });
  }
});

module.exports = router;
