import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import UserListing from './pages/UserListing';
import ViewUsers from './pages/ViewUsers';
import RequireAuth from './hooks/RequireAuth'
import UserChat from './pages/UserChat';
import Chat from './pages/Chat';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />


        {/* protectd login routes */}
        <Route element={<PrivateRoute />}>
         
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          />
         <Route path='/user-listing' element={<UserListing />} />
         <Route path='/chat' element={<UserChat />} />
         <Route path='/testchat' element={<Chat />} />

          {/* admin routes */}
         <Route element={<RequireAuth />}>
         <Route path='/admin/view-users' element={<ViewUsers />} />

         </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}