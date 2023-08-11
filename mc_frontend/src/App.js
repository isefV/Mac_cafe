import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

import { empty } from "./Tools/Variables";
import { getHandler , selectNonZeroHandler} from "./Tools/Functions";

import "./styles/style.scss"

import MenuPage from "./pages/MenuPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import CounterPage from "./pages/CounterPage";
import CustomerPage from "./pages/CustomerPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  const getCookieHandler = ()=>{
    // const obj = {
    //   _id: Cookies.get('Mac_id'),
    //   _username:Cookies.get('Mac_username'),
    //   _phone:Cookies.get('Mac_phone'),
    //   _login:Cookies.get('Mac_login'),
    //   _status:Cookies.get('Mac_status'),
    //   _statusCode:Cookies.get('Mac_statusCode'),
    //   _admin:Cookies.get('Mac_admin',)
    // }

    // if(typeof(obj["_id"])!=="undefined")
    //   return obj
    return empty
  }

  const [user,setUser] = useState(getCookieHandler());
  const [menus,setMenu] = useState({});
  const [sections,setSection] = useState({});
  const [selected_items,setSelected_items] = useState({});
  const [update,setUpdate] = useState(false);

  const countHandler = (id,count)=>{
    var tmp = {};
    tmp[id] = count;
    const {id:_,...rest} = selected_items;
    const obj = Object.assign(rest,tmp);
    setSelected_items(selectNonZeroHandler(obj));
  }

  
  const clearSelectedHandler = ()=>{
    setSelected_items({});
  }

  const userHandler = (id,val)=>{
    var tmp = {};
    tmp[id] = val;
    const {id:_,...rest} = user;
    const obj = Object.assign(rest,tmp);

    setUser(obj);
  }

  const newUserHandler = (obj)=>{
    setUser(obj);
    // Cookies.set('Mac_id', obj["_id"], { expires: 2 });
    // Cookies.set('Mac_username', obj["_username"], { expires: 2 });
    // Cookies.set('Mac_phone', obj["_phone"], { expires: 2 });
    // Cookies.set('Mac_login', obj["_login"], { expires: 2 });
    // Cookies.set('Mac_status', obj["_status"], { expires: 2 });
    // Cookies.set('Mac_statusCode', obj["_statusCode"], { expires: 2 });
    // Cookies.set('Mac_admin', obj["_admin"], { expires: 2 });
  }

  const updateHandler = ()=>{
    setUpdate(!update);
  }

  useEffect(()=>{
    getHandler("/menu",setMenu);
    getHandler("/section",setSection);
  },[update])


  useEffect(()=>{
    // console.log(user)
  },[user])


  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path="/admin" element={<AdminPage login={user._login} admin={user._admin} menu={menus} section={sections} update={updateHandler}/>}></Route>

            <Route path="/counter" element={<CounterPage userHandler={userHandler} login={user._login}  id={user._id} statusCode={user._statusCode} admin={user._admin} menu={menus} selectedItem={selected_items} countHandler={countHandler} selectedhandler={clearSelectedHandler}/>}></Route>

            <Route path="/profile" element={user._login ? <CustomerPage user={user} userPropHandler={userHandler} userHandler={newUserHandler}/> : <RegisterPage userHandler={newUserHandler}/>}></Route>

            <Route path="/orders" element={<OrdersPage login={user._login}  admin={user._admin}/>}></Route>

            <Route path="/register" element={<RegisterPage userHandler={newUserHandler}/>}></Route>

            <Route path="/" element={<MenuPage admin={user._admin} menu={menus} section={sections} selectedItem={selected_items} countHandler={countHandler}/>}></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
