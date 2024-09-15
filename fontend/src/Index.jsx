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
        <Route path='eticket' >
          <Route index element={<Home />} />
          <Route path='history' element={<History />} />
          <Route path='login' element={<Login />} />
          <Route path='event' element={<Event />} />
          <Route path='event/:id' element={<EventContent />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Index
