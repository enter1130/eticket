import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Event from './Page/Event';
import History from './Page/History';
import Home from './Page/Home';
import Login from './Page/Login';

function Index() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/history' index element={<History />} />
        <Route path='/login' index element={<Login />} />
        <Route path='/event' index element={<Event />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Index
