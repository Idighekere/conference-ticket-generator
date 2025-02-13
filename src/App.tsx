import { BrowserRouter, Route, Routes } from 'react-router';
import RootLayout from './_layout';
import Events from './pages/events';
import MyTickets from './pages/my-tickets';
import AboutProject from './pages/about-project';
// import Events from './pages/events';

function App() {

  return (
    <BrowserRouter>
      <Routes >
        <Route element={<RootLayout />} >
          <Route index element={<Events />} />
          <Route element={<MyTickets />} path='/my-tickets' />
          <Route element={<AboutProject />} path='/about-project' />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
