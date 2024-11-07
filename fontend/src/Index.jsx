import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Event from './Page/Event';
import EventContent from './Page/EventContent';
import Favorite from './Page/Favorite';
import History from './Page/History';
import Home from './Page/Home';
import Login from './Page/Login';
import NotFound from './Page/NotFound';
import User from './Page/User';

function Index() {
  
  return (
    <BrowserRouter basename={'/'}>
      <Routes>
        <Route index element={<Home />} />
        <Route path='history' index element={<History />} />
        <Route path='login' index element={<Login />} />
        <Route path='event' index element={<Event />} />
        <Route path='event/:id' element={<EventContent />} />
        <Route path='user' element={<User />} />
        <Route path='favorite' element={<Favorite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Index
