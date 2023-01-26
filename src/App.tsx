import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";
import Cookies from 'universal-cookie';
import Header from './components/Header/Header';
import ImageViewer from './components/ImageViewer/ImageViewer';
import Login from './components/Login/Login';

function App() {
  const cookies = new Cookies();
  const [userInfo, setUserInfo] = useState(cookies.get("user") ? cookies.get("user") : {});

  return(
    <HashRouter>
      <div>
        <Header userInfo={userInfo} setUserInfo={setUserInfo} />
        <Routes>
          <Route path="/image" element={<ImageViewer />} />
          <Route path="/" element={<Login userInfo={userInfo} setUserInfo={setUserInfo} />} />
        </Routes>
      </div>
    </HashRouter>
  )

}

export default App;