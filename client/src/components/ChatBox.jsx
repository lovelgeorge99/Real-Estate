
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { FaBars } from 'react-icons/fa';
import {format} from 'timeago.js'


function ChatBox({chat,currentUser,setSendMessage,receiveMessage,toggleSidebar }) {

    const [userData, setUserData] = useState({})
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState('');
    const scroll =useRef(null)

    useEffect(()=>{
        if(receiveMessage!==null && receiveMessage.chatId===chat._id){
            setMessages([...messages,receiveMessage])
        }
    },[receiveMessage])
    

  //fetching data for header
    useEffect(()=> {

        const userId = chat?.members?.find((id)=>id !== currentUser._id)
        
        const getUserData = async ()=> {
          try
          {
            const res = await fetch(`/api/user/${userId}`);
            const data = await res.json();
           
             setUserData(data)
             
            
             
          }
          catch(error)
          {
            console.log(error)
          }
        }
        
    
        if(chat!=null) getUserData();
      }, [chat,currentUser])

      //fetching messages
      
    useEffect(() => {
        const fetchMessages = async () => {
            try{
                const data = await fetch(`/api/message/${chat._id}`);
                const res = await data.json();
                // console.log("dasd",res)
                setMessages(res)
            }
            catch(error)
            {
                console.log(error)
            }
        
        };
        
    
        if(chat!=null) fetchMessages();
        }, [chat]);
    
        const handleChange = (e)=>{
            // console.log(e.target.value)
            setNewMessage(e.target.value)
        }
        const handleSend =async (e)=>{
            e.preventDefault();
            const messageData={
                senderId:currentUser._id,
                text:newMessage,
                chatId:chat._id
            }
            //send message to DB

            try{
                const res = await fetch('/api/message/', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      message:{...messageData}
                    }),
                  });
                const newMessageFromServer = await res.json();
                console.log(res)

                setMessages([...messages,newMessageFromServer])
                setNewMessage("")
            }
            catch(error)
            {
                console.log(error)
            }
            //send  message to socket srver
        const receiverId=chat.members.find((id)=> id !== currentUser._id);
        setSendMessage({...messageData,receiverId})
        }

        //always scroll to bottom

        useEffect(()=>{
            scrollToBottom();
        },[messages])

        const scrollToBottom = () => {
          if (scroll.current) {
            scroll.current.scrollTop = scroll.current.scrollHeight;
          }
        };


        

        

    
        
  return (
    <div className="flex flex-col gap-10">

      {chat?(
        <div >
         <header className="bg-white p-4 flex justify-between text-gray-700 ">
         <button onClick={toggleSidebar} id="menuButton" className="md:hidden focus:outline-none">
         <FaBars className='text-xl text-slate-600' />
           </button>
             <h1 className="text-2xl   font-semibold">{userData.username}</h1>
         </header>

     
      <div ref={scroll} className="h-screen overflow-y-auto  bg-gray-100 pb-60 md:pb-52">
            {messages.map((message,index)=>(
             message.senderId === currentUser._id ?
               //   Outgoing Message
             <div key={index} className="flex justify-end mb-2 p-4 cursor-pointer">
             <div className="flex flex-col max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
               <h1>{message.text}</h1>
               <span className="text-right text-xs">{format(message.createdAt)}</span>
             </div>
             <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
               <img src={currentUser.avatar} alt="My Avatar" className="w-8 h-8 rounded-full"/>
             </div>
           </div>
             :    
           <div key={index} className="flex justify-start mb-2 p-4 cursor-pointer ">
           <div className="flex flex-col  max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
           <span>{message.text}</span>
             <span className="text-right text-xs">{format(message.createdAt)}</span>
           </div>
           <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
             <img src={userData.avatar} alt="My Avatar" className="w-8 h-8 rounded-full"/>
           </div>
         </div>
            ))}

       </div>

         <div className="bg-white border border-gray-300 p-4 sticky  bottom-0 ">
             <div className="flex items-center justify-between">
                 <input onChange={handleChange} value={newMessage} type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"/>
                 <button  onClick={handleSend} className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
             </div>
         </div>
         
         
         </div>
      ):
      <span className="mx-auto text-2xl"> Tap on chats to view Messages...</span>
      }
           



       

   
    </div>
  )
}

export default ChatBox