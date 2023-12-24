import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useAuth from '../hooks/useAuth'




import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  
  
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {

    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);


  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate("/")
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };
  return (
    <header className='text-white shadow-md'>
      <div className='flex justify-evenly items-center max-w-6xl mx-auto p-5'>
        <Link to='/'>
          <h1 className='font-bold text-xl sm:text-2xl flex flex-wrap'>
            <span className='text-slate-500'>MTL</span>
            <span className='text-slate-700'>Housing</span>
          </h1>
        </Link>

        {/* Removing search from here */}
        {/* <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form> */}

        <ul className='flex gap-5'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link>
         
            {currentUser ? (
        <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md   text-sm font-semibold text-gray-900   ">
                <img
                  className='rounded-full h-7 w-7 object-cover'
                  src={currentUser.avatar}
                  alt='profile'
                />
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>
  
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link to={'/profile'}
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Account settings
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link to={'/create-listing'}
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Create New Listing
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link to={'/user-listing'}
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Your Listings
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link to={'/chat'}
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Your Chats
                  </Link>
                )}
              </Menu.Item>
              
              {currentUser.role === "admin" &&
              <Menu.Item>
              {({ active }) => (
                <Link to={'/admin/view-users'}
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  View Users
                </Link>
              )}
            </Menu.Item> 
            }
              
             
                <Menu.Item>
                  {({ active }) => (
                    <button
                    onClick={handleSignOut}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-left text-sm'
                      )}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
             
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
            ) : (
              <Link to={'/profile'}><li className=' text-slate-700 hover:underline'> Sign in</li> </Link>
            )}

            <Link to={'/create-listing'}>
            {!currentUser ? (
            <li className=' sm:inline text-slate-700 hover:underline'>
             <button className='bg-blue-500 p-2 text-sm  rounded-lg text-white font-bold'>Create New Listing</button>
            </li>)
            : <div>

            </div>
            }
            </Link>
         
        </ul>

      </div>
    </header>
  );
}
