import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Inventory</a>
                <ul class="dropdown-menu">
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/manufacturers" end style={{fontWeight: "bold"}}>Manufacturers</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/manufacturers/create" end style={{paddingLeft: "30px"}}>Create a Manufacturer</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/vehicles" end style={{fontWeight: "bold"}}>Models</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/vehicles/create" end style={{paddingLeft: "30px"}}>Create a Model</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/automobiles" end style={{fontWeight: "bold"}}>Automobiles</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/automobiles/create" end style={{paddingLeft: "30px"}}>Create an Automobile</NavLink>
                  </li>
                </ul>
            </li>
            <li className="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Sales</a>
                <ul class="dropdown-menu">
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/sales" end style={{fontWeight: "bold"}}>Sales</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/sales/create" end style={{paddingLeft: "30px"}}>Add a Sale</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/sales/history" end style={{paddingLeft: "30px"}}>Saleperson History</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/customers" end style={{fontWeight: "bold"}}>Customers</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/customers/create" end style={{paddingLeft: "30px"}}>Add a Customer</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/salespeople" end style={{fontWeight: "bold"}}>Salespeople</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/salespeople/create" end style={{paddingLeft: "30px"}}>Add a Salesperson</NavLink>
                  </li>
                </ul>
            </li>
            <li className="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Service</a>
                <ul class="dropdown-menu">
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/technicians" end style={{fontWeight: "bold"}}>Technicians</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/technicians/create" end style={{paddingLeft: "30px"}}>Add a Technician</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/appointments" end style={{fontWeight: "bold"}}>Service Appointments</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/appointments/create" end style={{paddingLeft: "30px"}}>Create a Service Appointment</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/appointments/history" end style={{paddingLeft: "30px"}}>Service History</NavLink>
                  </li>
                </ul>
            </li>



          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
