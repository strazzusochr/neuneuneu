import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginEmbedderPolicy: { policy: "require-corp" },
}));
app.use(compression());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Production: Serve the 'dist' folder
app.use(express.static(path.join(__dirname, '../dist')));

let worldState = {
    inGameTime: "06:00",
    tension: 10
};

const TICK_MS = 1000;
setInterval(() => {
    io.emit('world_update', worldState);
}, TICK_MS);

io.on('connection', (socket) => {
    socket.emit('init-state', worldState);
    socket.emit('world_update', worldState);
    socket.on('update-time', (time) => {
        worldState.inGameTime = time;
        io.emit('world_update', worldState);
        socket.broadcast.emit('time-sync', time);
    });
});

const PORT = process.env.PORT || process.env.BACKEND_PORT || 4001;
server.listen(PORT, () => {
    console.log(`🚀 PROD-SERVER: Corona Control Ultimate listening on ${PORT}`);
});
