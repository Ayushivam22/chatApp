import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
const clients = new Map<string, WebSocket>();
const allClients = new Map<string, WebSocket>();

wss.on('connection', (ws, req) => {

    // will remove later
    allClients.set('user', ws);
    const urlParams = new URLSearchParams(req.url?.split('?')[1]);
    const userId = urlParams.get('userId') || (1000 + Math.floor(Math.random() * 1000)).toString();
    // if (!userId) {
    // return ws.close();
    // }

    clients.set(userId, ws);
    console.log(`User ${userId} connected`);

    ws.on('message', (rawMessage) => {
        try {
            // will remove later
            // console.log("Printing raw message:", rawMessage)
            const messageData = JSON.parse(rawMessage.toString());
            

            console.log(messageData)
            const broadcastMessage = [messageData['message-content'],
                {
                    from: userId,
                    timeStamp: new Date().toLocaleString()
                }
            ]
            allClients.forEach((user) => {
                // console.log(user)
                if (user.readyState === WebSocket.OPEN) {
                    user.send(JSON.stringify(
                        messageData['message-content']
                    ))
                }
            })



            // const { to, text } = JSON.parse(rawMessage.toString());
            // const targetWs = clients.get(to);
            // if (targetWs && targetWs.readyState === WebSocket.OPEN) {
            //     targetWs.send(JSON.stringify({ from: userId, text }));
            // }
        } catch (err) {
            // console.error('Invalid message format', err);
        }
    });

    ws.on('close', () => {
        clients.delete(userId);
        console.log(`User ${userId} disconnected`);
    });

    ws.on('error', () => clients.delete(userId));
});

console.log('WebSocket server running on port 8080');
