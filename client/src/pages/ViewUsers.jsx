import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';



export default function ViewUsers() {
  const { currentUser, loading, error } = useSelector((state) => state.user);   
  const [viewUsersError, setViewUsersError] = useState(false);
  const [viewUsers, setViewUsers] = useState([]);
  const dispatch = useDispatch();



    const handleViewUsers = async () => {
    try {
      setViewUsersError(false);
      const res = await fetch(`/api/admin/view-users`);
      const data = await res.json();
      if (data.success === false) {
        setViewUsersError(true);
        return;
      }
     
      setViewUsers([...data]);
    } catch (error) {
      setViewUsersError(true);
    }
  };
  useEffect(() => {
    handleViewUsers();
}, []);

const handleAdminDeleteUser = async (userID) => {
  
  if(window.confirm('Are you sure you want to delete')){
  try {
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${userID}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success === false) {
      console.log("sds")
      dispatch(deleteUserFailure(data.message));
      return;
    }
    setViewUsers((prev) =>
    prev.filter((user) => user._id !== userID)
  );
    // dispatch(deleteUserSuccess(data));
  } catch (error) {
    
    dispatch(deleteUserFailure(error.message));
  }}
};


  return (
    <div className='p-3 max-w-7xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Current Users</h1>
      
      <p className='text-red-700 mt-5'>
        {viewUsersError ? 'Error showing listings' : ''}
      </p>

{viewUsers && viewUsers.length > 0 && (
  <div className='flex flex-col gap-4'>
    <table className='table-auto'>
      <thead>
        <tr>
        <th className='border p-3'>Username</th>
          <th className='border p-3'>Email</th>
          <th className='border p-3'>Role</th>
          <th className='border p-3'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {viewUsers.map((user) => (
          <tr key={user._id}>
            <td className='border p-3'>
            <Link to={`/listing/${user._id}`} className='text-slate-700 font-semibold hover:underline truncate flex-1'>
              {user.username}
              </Link>
            </td>
            <td className='border p-3'>
              <Link to={`/listing/${user._id}`} className='text-slate-700 font-semibold hover:underline truncate flex-1'>
                {user.email}
              </Link>
            </td>
            <td className='border p-3'>
              <Link to={`#`} className='text-slate-700 font-semibold hover:underline truncate flex-1'>
                {user.role}
              </Link>
            </td>
            <td className='border p-3 flex items-center'>
              <button onClick={() => handleAdminDeleteUser(user._id)} className='text-red-700 uppercase mr-2'>
                Delete
              </button>
              <Link to={`/update-listing/${user._id}`}>
                <button className='text-green-700 uppercase'>Edit</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
  );
}
