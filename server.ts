import { Server } from 'socket.io';
import * as http from 'node:http';

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // 替换为您的前端应用程序的 URL
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
