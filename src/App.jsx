import Header from './components/header/Header';
import LocaleProvider from './context/LocaleContext';
import Home from './pages/Home';
import Error from './pages/Error';
import Tracking from './pages/tracking-page/Tracking';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <LocaleProvider>
        <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="shipment/:id" element={<Tracking />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </LocaleProvider>
    </div>
  );
}

export default App;
