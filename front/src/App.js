import {Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Home from './Pages/Home';
import News from './Pages/News';
import DetailArticle from './Components/ArticleDetail';
import AdminPage from './Pages/Admin';
import Equipements from './Pages/Equipements';
import Gants from './Components/Gants';
import Casques from './Components/Casques';
import Dents from './Components/Dents';
import Jjb from './Components/Jjb';
import Accessoires from './Components/Accessoires';
import Guides from './Components/Guides';
import DetailEquipement from './Components/EquimentDetail';
import AdminEq from './Components/AdminEq';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AllUser from './Pages/AllUser';
import NotAccess from './Pages/NotAccess';
import UserSettings from './Components/UserSettings';



function App() {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
   <>
   <Routes>
   <Route path='/' element={<Home />}/>
  <Route path='/news' element={<News />}/>
  <Route path="/detail/:id" element={<DetailArticle />}/>
  <Route path="/equipements-et-guides" element={<Equipements />}/>
  <Route path="/gants-et-bandages" element={<Gants />}/>
  <Route path="/casques-et-protections" element={<Casques />}/>
  <Route path="/proteges-dents" element={<Dents />}/>
  <Route path="/jjb-grappling" element={<Jjb />}/>
  <Route path="/accessoires" element={<Accessoires />}/>
  <Route path="/guides-et-tutoriels" element={<Guides />}/>
  <Route path="/product/:id" element={<DetailEquipement />}/>
  <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/user-settings" element={<UserSettings />} /> */}


      {user && user.role === "Admin" && ( 
        <>
        <Route path="/users" element={<AllUser />} />
        <Route path="/admin" element={<AdminPage />}/>
        <Route path="/admin-equipement" element={<AdminEq />}/>

        </>
  )}
  <Route path="*" element={<NotAccess />} />
   </Routes>
   </>
  );
}

export default App;
