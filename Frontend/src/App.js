import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route,Routes } from 'react-router-dom';
import AddEmployee from './AddEmployee';
import RegisterUser from './RegisterUser';
import AdminDash from './AdminDash';
import EmployeeDash from './EmployeeDash';
import { useState,useEffect } from 'react';
function App() {

  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setRole(userRole);
  }, []);

  return (
    <div className="App">
      {/* <BrowserRouter> */}
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<RegisterUser />} />
          <Route path="/addemp" element={<AddEmployee />} />
          <Route path="/AdminDash" element={<AdminDash />} />
          <Route path="/EmployeeDash" element={<EmployeeDash />} />
        </Routes>
      {/* </BrowserRouter> */}
      {/* <AddEmployee></AddEmployee>
      <EmployeeDash></EmployeeDash> */}
      
    </div>
  );
}

export default App;
