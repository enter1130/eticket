const multer = require('multer');
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const db = require('../db');  // 假設你有一個 Knex 設定文件
const upload = multer();
require('dotenv').config()

router.post('/', upload.none(), async (req, res) => {
    const { email } = req.body;
    const find = await db('users').where({ email }).first();

    if(!find){
      res.status(500).json({ message:'Error sending email',type:'error',result:false});
    }

    // 設置郵件傳輸設定 (這裡以 Gmail 為例)
    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_HOST,
      port:process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const code=Math.floor(Math.random()*10).toString()+Math.floor(Math.random()*10).toString()+Math.floor(Math.random()*10).toString()+Math.floor(Math.random()*10).toString()
  
    const mailOptions = {
      from: process.env.MAIL_EMAIL,
      to:email,
      subject:'活動訂票系統-登入認證碼',
      text:'登入認證碼為：'+code,
    };

    try {
      await transporter.sendMail(mailOptions);
      // res.status(200).send('Email sent successfully');
      res.status(200).json({ message:'Email sent successfully',type:'success',result:true,code:code});
    } catch (error) {
      res.status(500).json({ message:'Error sending email',type:'error',result:false});
    }
});

module.exports = router;
