
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';


import Maincontainer from './Pages/Maincontainer';
import Login from './component/login/Login';
import Welcome from './component/workareacomponet/Welcome';
import Workarea from './component/workareacomponet/Workarea';
import Groupcreating from './component/groupsandother/Groupcreating';
import Onlineuser from './component/onlineusers/Onlineuser';
import Availablegroup from './component/availablegroup/Availablegroup';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './component/signup/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Signup />} />
          <Route path='app' element={<Maincontainer />}>
            <Route path='Welcome' element={<Welcome />} />
            <Route path='Workarea' element={<Workarea />} />
            <Route path='Groupcreating' element={<Groupcreating />} />
            <Route path='Onlineuser' element={<Onlineuser />} />
            <Route path='availablegroup' element={<Availablegroup/>} />
          </Route>

        </Routes>
      </Router>

    </div>
  );
}

export default App;
