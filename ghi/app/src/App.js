import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPersonForm from './SalesPersonForm';
import SalesPeople from './SalesPeople';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import SaleForm from './SaleForm';
import SaleList from './SaleList';
import SaleHistory from './SaleHistory';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import VehicleList from './VehicleList';
import TechCreateForm from './TechCreateForm';
import TechList from './TechList';
import AppointmentCreateForm from './AppointmentCreateForm';
import ApptList from './ApptList';
import ServiceHistory from './ServiceHistory';
import VehicleModelCreateForm from './VehicleModelCreateForm';
import AutomobileList from './AutomobileList';
import AutomobileCreateForm from './AutomobileCreate';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salespeople">
            <Route index element={<SalesPeople />} />
            <Route path="create" element={<SalesPersonForm />} />
          </Route>
          <Route path="customers">
            <Route index element={<CustomerList />} />
            <Route path="create" element={<CustomerForm />} />
          </Route>
          <Route path="sales">
            <Route index element={<SaleList />} />
            <Route path="history" element={<SaleHistory />} />
            <Route path="create" element={<SaleForm />} />
          </Route>
          <Route path="manufacturers">
            <Route index element={<ManufacturerList />} />
            <Route path="create" element={<ManufacturerForm />} />
          </Route>
          <Route path="vehicles">
            <Route index element={<VehicleList />} />
          </Route>
          <Route path="/technicians" element={<TechList />} />
          <Route path="/technicians/create" element={<TechCreateForm />} />
          <Route path="/appointments/create" element={<AppointmentCreateForm />} />
          <Route path="/appointments" element={<ApptList />} />
          <Route path="/appointments/history" element={<ServiceHistory />} />
          <Route path="/models/create" element={<VehicleModelCreateForm />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/automobiles/create" element={<AutomobileCreateForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
