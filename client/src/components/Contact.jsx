import { useEffect, useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';


export default function Contact({ listing,currentUser }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const handleSend=async ()=>{
    if (message.trim() !== '') {
      try {
        const res = await fetch('/api/chat/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId:currentUser._id,
            receiverId:landlord._id
          }),
        });
      const chat = await res.json();
      if(res.status===200){
        sendMessage(chat);
        navigate('/chat')
      }
      }
       catch (error) {
        console.log(error);
      }
    }

   
    
    
  }

  const sendMessage=async (chat) =>{
    if(message===''){
      console.log("Wrte some message")
    }
    const messageData={
      senderId:currentUser._id,
      text:message,
      chatId:chat._id
    }
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
        console.log("After sneidng message")
      const newMessageFromServer = await res.json();
      console.log(newMessageFromServer)

  }
  catch(error)
  {
      console.log(error)
  }


  }
  return (
    <>
    
      {(landlord && currentUser) ? (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
            required
          ></textarea>
          
          
          <Link
           onClick={handleSend} 
           className={`bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95`} >
          
            Send Message

           
          </Link>
          {message==='' && <span className='text-red-700'>You need to write some message</span>}
        </div>
      ):
      <h1 className='text-red-700'>You need to login first to contact landlord</h1>
      }
    </>
  );
}
