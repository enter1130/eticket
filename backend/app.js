const express = require('express');
const cors = require('cors');
const { expressjwt: jwtMiddleware } = require('express-jwt');
const app = express();
const port = 3000;

const secret = `D;B-VEf^LdK:y3']rNm{t&A;Ub7D#fEP?Y+y9j%q(M]ByknM{r&zK8JN5cQ}4CGd.vW<CU3Vb]^"x/N9s'+k7dguVY:6u?f],t7EadJsy[%CTM`;


// 允許 Express 處理 JSON 請求
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 自訂錯誤處理中間件
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    // 當請求中沒有 Token 或 Token 無效時返回自定義消息
    return res.status(401).json({ message: 'finish',result:false });
  }
  next(); // 其他錯誤由下一個處理器處理
});

const usersRouter = require('./routes/users'); // 引入 users 路由
const categoryRouter = require('./routes/category'); // 引入 category 路由
const eventRouter = require('./routes/event'); // 引入 event 路由
const homeRouter = require('./routes/home'); // 引入 home 路由
const authRouter = require('./routes/auth'); // 引入 auth 路由
const ticketRouter = require('./routes/ticket'); // 引入 ticket 路由

app.use('/api/event', eventRouter);
app.use(
  jwtMiddleware({ secret, algorithms: ['HS256'] }).unless({
    path: ['/api/auth/login', '/api/auth/register','/api'],
  })
);
app.use('/api/users', usersRouter);
app.use('/api/ticket', ticketRouter);
app.use('/api/auth', authRouter);
app.use('/api', homeRouter);
app.use('/api/category', categoryRouter);



// 啟動伺服器
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});