
// HTTP
const http = require('http');

const { Server } = require('socket.io');

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  }
});



// Old 
// const io = require('socket.io')(8800,{
//     cors:{
//         origin:"*",

//     }
// })

let activeUsers=[]
io.on("connection",(socket)=>{
    // add new user
    socket.on('new-user-add',(newUserId)=>{
        if(!activeUsers.some((user)=> user.userId === newUserId))
        {
            activeUsers.push({
                userId:newUserId,
                socketId:socket.id
            })
        }
        console.log("Conneted User",activeUsers)
        io.emit('get-users',activeUsers)
    })

    // socket.on('send-message')
    socket.on('send-message',(data)=>{
        const {receiverId}= data;
        const user = activeUsers.find((user)=>user.userId===receiverId);
        console.log("Sending from sockted towared receiver :",receiverId)
        console.log("Data ", data)
        if(user){
            io.to(user.socketId).emit("receive-message",data)
        }
    })

    socket.on('disconnect',()=>{
        activeUsers = activeUsers.filter((user)=>user.socketId !== socket.id)
        console.log("User Disconnected",activeUsers)
        io.emit('get-users',activeUsers)
    })
})

httpServer.listen(8800,()=>console.log("Listening on 8800"))