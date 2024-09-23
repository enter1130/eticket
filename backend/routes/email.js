const multer = require('multer');
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const db = require('../db');  // 假設你有一個 Knex 設定文件
const upload = multer();
require('dotenv').config()

router.post('/', upload.none(), async (req, res) => {
    const { email } = req.body;
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
  
    const mailOptions = {
      from: process.env.MAIL_EMAIL,
      to:email,
      subject:'test',
      text:'test',
    };
    console.log(mailOptions);
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      res.status(500).send('Error sending email');
    }
});

module.exports = router;
