// const express = require('express');
// const cors = require('cors');
// const authRouter = require('./routes/auth');
// const medsRouter = require('./routes/medications'); // optional

// const app = express();

// app.use(cors());
// app.use(express.json()); // <-- required for req.body to work
// app.use('/api/auth', authRouter);
// app.use('/api/medications', medsRouter); // optional

// app.listen(3001, () => {
//   console.log('Backend running at http://localhost:3001');
// });



// server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const authRouter = require('./routes/auth');
const createMedsRouter = require('./routes/medications');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/medications', createMedsRouter(io));

io.on('connection', s => {
  console.log('Socket connected:', s.id);
  s.on('disconnect', () => console.log('Socket disconnected:', s.id));
});

server.listen(3001, () => console.log('Backend running at http://localhost:3001'));
