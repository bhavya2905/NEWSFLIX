import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login';

import Newsflix from './pages/Newsflix';
import Player from './pages/Player';
import Signup from './pages/Signup';

import UserLiked from './pages/UserLiked';
import News from './pages/News';
// import UserAdmin from './pages/UserAdmin';
import AdminSignup from './pages/admin/AdminSignup';
import AdminLogin from './pages/admin/AdminLogin';
import ArticleList from './pages/admin/ArticleList';
import PostNews from './pages/admin/PostNews';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './actions/posts';
import { Dashboard } from './pages/admin/Dashboard';
import { Settings } from './pages/admin/Settings';
import SettingsPage from './pages/SettingsPage';
import { Users } from './pages/admin/Users';
import Articles from './pages/Articles';
import { ParamsProvider } from './components/ParamsContext';
import UpdatePost from './pages/admin/UpdatePost';
import { EditAdmin } from './pages/admin/EditAdmin';
import UserSettingsPage from './pages/UserSettingsPage';
import NewsVideo from './pages/NewsVideo';



const App = () => {

  const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getPosts());
    },[dispatch]);

    const news= useSelector((state)=> state.posts);
    
  return (
    <BrowserRouter>
      <ParamsProvider>
        <Routes>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/player' element={<Player />} />
            <Route exact path='/general' element={<News category="general"/>} />
            <Route exact path='/business' element={<News category="business"/>} />
            <Route exact path='/entertainment' element={<News category="entertainment"/>} />
            <Route exact path='/sports' element={<News category="sports"/>} />
            <Route exact path='/technology' element={<News category="technology"/>} />
            <Route exact path='/science' element={<News category="science"/>} />
            <Route exact path='/health' element={<News category="health"/>} />

            <Route exact path="/mylist" element={<UserLiked movies={news}/>} />
            <Route exact path='/' element={<Newsflix news={news}/>} />
            
            
            <Route exact path='/admin/login' element={<AdminLogin />} />
            <Route exact path='/admin/signup' element={<AdminSignup/>} />
            <Route exact path='/postnews' element={<PostNews />} />
            <Route exact path='/dashboard' element={<Dashboard news={news}/>} />
            <Route exact path='/users' element={<Users news={news} />} />
            <Route exact path='/editadmin' element={<EditAdmin />} />

            <Route exact path='/Settings' element={<Settings />} />
            <Route exact path = '/articles/:id' element={<Articles news={news}/>} />
            <Route exact path = '/articlelist' element={<ArticleList news={news}/>} />
            <Route exact path = '/updatepost' element={<UpdatePost news={news}/>} />
            <Route exact path = '/settingspage' element={<UserSettingsPage/>} />
            <Route exact path = '/newsvideo/Ndtv' element={<NewsVideo id={0}/>} />
            <Route exact path = '/newsvideo/India_Today' element={<NewsVideo id={1}/>} />
            <Route exact path = '/newsvideo/Aaj_Tak' element={<NewsVideo id={2}/>} />
            <Route exact path = '/newsvideo/News18_Kannada' element={<NewsVideo id={3}/>} />
            <Route exact path = '/newsvideo/tv9_Kannada' element={<NewsVideo id={4}/>} />
            <Route exact path = '/newsvideo/BBC_News' element={<NewsVideo id={5}/>} />
            <Route exact path = '/newsvideo/NBC_News' element={<NewsVideo id={6}/>} />



        </Routes>
      </ParamsProvider>
      
    </BrowserRouter>
  )
}

export default App
