import React,{ useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import Conversation from '../components/Conversation';
import ChatBox from '../components/ChatBox';
import { FaBars } from 'react-icons/fa';

import {io} from 'socket.io-client'


function UserChat() {
   

    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [isSidebarVisible, setSidebarVisibility] = useState(true);

    const [chats,setChats]=useState([])
    const [currentChat,setCurrentChat]=useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
    const [sendMessage,setSendMessage]=useState(null);
    const [receiveMessage,setReceiveMessage]=useState(null)
    const socket=useRef()


    const toggleSidebar = () => {
      setSidebarVisibility((prev) => !prev);
    };



    // send message to socket server
    useEffect(()=>{
      if(sendMessage!==null){
        socket.current.emit('send-message',sendMessage)
      }
    },[sendMessage])

    //receive from socket server



    useEffect(()=>{
      socket.current=io('https://socket.lovelgeorge.com/');
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
   
    <div className="flex h-auto">
        {/* <!-- Sidebar --> */}
        
        <div className={`w-64 ${isSidebarVisible ? 'sm:inline md:inline lg:inline xl:inline' : 'hidden sm:inline md:inline lg:inline xl:inline'} bg-white border-r border-gray-300`}>
          {/* <!-- Sidebar Header --> */}
          <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
            <h1 className="text-2xl font-semibold">Your Chats</h1>

          </header>
        
          {/* <!-- Contact List --> */}
          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
            {chats.map((chat) => {
                return (
                    <div  onClick={()=>setCurrentChat(chat)} key={chat._id} >
                    <Conversation data={chat} currentUser={currentUser}/>
                    </div>
                );
                })}
          </div>

        </div>
        
        {/* <!-- Main Chat Area --> */}
        <div className="flex-1">
        <ChatBox chat={currentChat} currentUser={currentUser} setSendMessage={setSendMessage} receiveMessage={receiveMessage} toggleSidebar={toggleSidebar}/>
           
        </div>
    </div>
    

  )
}

export default UserChat