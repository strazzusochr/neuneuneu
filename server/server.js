import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let worldState = {
    startTime: Date.now(),
    inGameTime: "06:00",
    stats: {
        killed: 0,
        arrested: 0,
        injured: 0,
        damage: 0
    },
    tension: 10
};

const TICK_MS = 1000;
setInterval(() => {
    io.emit('world_update', worldState);
}, TICK_MS);

io.on('connection', (socket) => {
    console.log('👤 Client connected:', socket.id);
    
    // Send current world state on join
    socket.emit('init-state', worldState);
    socket.emit('world_update', worldState);

    socket.on('update-time', (time) => {
        worldState.inGameTime = time;
        io.emit('world_update', worldState);
        socket.broadcast.emit('time-sync', time);
    });

    socket.on('event-triggered', (eventData) => {
        console.log('📢 Event triggered:', eventData.description);
        socket.broadcast.emit('event-broadcast', eventData);
    });

    socket.on('disconnect', () => {
        console.log('👋 Client disconnected:', socket.id);
    });
});

const PORT = Number(process.env.BACKEND_PORT ?? process.env.PORT ?? 4001);
server.listen(PORT, () => {
    console.log(`🚀 Corona Control Server running on port ${PORT}`);
    console.log(`🔗 Web-App API & Crawler-Endpoint active.`);
});
