import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Event from './Page/Event';
import EventContent from './Page/EventContent';
import History from './Page/History';
import Home from './Page/Home';
import Login from './Page/Login';
import NotFound from './Page/NotFound';

function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/history' index element={<History />} />
        <Route path='/login' index element={<Login />} />
        <Route path='/event' index element={<Event />} />
        <Route path='/event/:id' element={<EventContent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Index
