import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { getUser } from "../../api/UserRequests";
const Conversation = ({ data, currentUser }) => {

  const [userData, setUserData] = useState({})
  const dispatch = useDispatch()

  useEffect(()=> {

    const userId = data.members.find((id)=>id !== currentUser._id)
    
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

    getUserData();
  }, [data])
  return (
    <div>

      <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md max-h-screen">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src={userData.avatar} alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{userData.username}</h2>
                <p className="text-gray-600"></p>
              </div>
    </div> 
    </div>
  );
};

export default Conversation;
