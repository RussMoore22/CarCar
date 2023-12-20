import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechCreateForm from './TechCreateForm';
import TechList from './TechList';
import AppointmentCreateForm from './AppointmentCreateForm';
import ApptList from './ApptList';
import ServiceHistory from './ServiceHistory';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians" element={<TechList />} />
          <Route path="/technicians/create" element={<TechCreateForm />} />
          <Route path="/appointments/create" element={<AppointmentCreateForm />} />
          <Route path="/appointments" element={<ApptList />} />
          <Route path="/appointments/search" element={<ServiceHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
