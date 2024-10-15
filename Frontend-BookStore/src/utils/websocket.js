let socket = false;
let heartbeatInterval;
let reconnectTimeout;
let reconnectCount = 0;
const MAX_RECONNECT_COUNT = 5;
const RECCONECT_DELAY = 1000;
const HEARTBEAT_INTERVAL = 30000;

export function connectSocket(id) {
    let url = `ws://localhost:8080/transfer/${id}`;
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        socket = new WebSocket(url);
        
        socket.onopen = () => {
            console.log('WebSocket connected');
            startHeartbeat();
            reconnectCount = 0;
        };

        socket.onmessage = (event) => {
            console.log('Received message:', event.data);
        };
    
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            attempReconnect(url);
        };
    
        socket.onclose = () => {
            console.log('WebSocket closed');
            stopHeartbeat();
        };
    }
}

export function getSocket() {
    return socket;
}

export function closeSocket() {
    if (socket) {
        socket.close();
        socket = false;
    }
}

function startHeartbeat() {
    if (heartbeatInterval) clearInterval(heartbeatInterval);
    heartbeatInterval = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
            console.log('Sending heartbeat: ping');
            socket.send('ping');
        }
    }, HEARTBEAT_INTERVAL);
}

function stopHeartbeat() {
    if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = false;
    }
}

function attempReconnect(url) {
    if (reconnectCount < MAX_RECONNECT_COUNT) {
        console.log(`Reconnecting... ${reconnectCount}`);
        reconnectTimeout = setTimeout(() => {
            connectSocket(url);
            reconnectCount++;
        }, RECCONECT_DELAY);
    } else {
        console.error('Max reconnect count reached');
    }
}