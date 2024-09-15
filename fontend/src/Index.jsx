import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Event from './Page/Event';
import EventContent from './Page/EventContent';
import History from './Page/History';
import Home from './Page/Home';
import Login from './Page/Login';
import NotFound from './Page/NotFound';

function Index() {
  const basePath = import.meta.env.BASE_URL;
  return (
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route index element={<Home basepath={basePath} />} />
        <Route path='history' index element={<History basepath={basePath} />} />
        <Route path='login' index element={<Login basepath={basePath} />} />
        <Route path='event' index element={<Event basepath={basePath} />} />
        <Route path='event/:id' element={<EventContent basepath={basePath} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}


const MainLayout = () => {
  return (
    <div>
      {/* 主页面内容 */}
      <Routes>
        <Route index element={<Home />} />
        <Route path='history' element={<History />} />
        <Route path='login' element={<Login />} />
        <Route path='event' element={<Event />} />
        <Route path='event/:id' element={<EventContent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};


export default Index
