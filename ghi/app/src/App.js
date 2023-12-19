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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
