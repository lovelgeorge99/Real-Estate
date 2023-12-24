import React,{ useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import Conversation from '../components/Conversation';
import ChatBox from '../components/ChatBox';

import {io} from 'socket.io-client'


function UserChat() {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [chats,setChats]=useState([])
    const [currentChat,setCurrentChat]=useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
    const [sendMessage,setSendMessage]=useState(null);
    const [receiveMessage,setReceiveMessage]=useState(null)
    const socket=useRef()



    // send message to socket server
    useEffect(()=>{
      if(sendMessage!==null){
        socket.current.emit('send-message',sendMessage)
      }
    },[sendMessage])

    //receive from socket server



    useEffect(()=>{
      socket.current=io('http://localhost:8800');
      socket.current.emit("new-user-add",currentUser._id);
      socket.current.on('get-users',(users)=>{
        setOnlineUsers(users)
       
      })
    },[currentUser])
    useEffect(()=>{
      socket.current.on('receive-message',(data)=>{
        setReceiveMessage(data)
      })
      
    },[])
    

    //fetching data for header
    useEffect(() => {
        const getChats = async () => {
          const res = await fetch(`/api/chat/${currentUser._id}`);
          
          const data = await res.json();
          setChats(data)
      
        };
        
    
        getChats();
      }, [currentUser._id]);


    //fetching messages
    
  return (
   
    <div className='fixed flex   left-0 w-full bg-white h-full text-gray-600 transition-all duration-300 border-none  sidebar'>
    <div className="w-64 hidden sm:inline bg-white border-r border-gray-300">
     <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
         <h1 className="text-2xl font-semibold">Your Chats</h1>
          </header>

            <div className="overflow-y-auto  p-3 mb-9 pb-20">
            {chats.map((chat) => {
                return (
                    <div  onClick={()=>setCurrentChat(chat)} key={chat._id} >
                    <Conversation data={chat} currentUser={currentUser}/>
                    </div>
                );
                })}
          </div>
    </div>
    <div className="flex-1 ">
        <ChatBox chat={currentChat} currentUser={currentUser} setSendMessage={setSendMessage} receiveMessage={receiveMessage}/>
           
        </div>

  
    </div>
    

  )
}

export default UserChat