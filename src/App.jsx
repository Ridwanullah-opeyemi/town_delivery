import { Route, Routes } from "react-router-dom"
import NavBar from "./component/navBar/navBar"
import SideBar from "./component/sideBar/sideBar"
import Add from "./pages/add/add"
import List from "./pages/list/list"
import Order from "./pages/order/order"

const App = ()=>{

  const url = "http://localhost:4002"

   return(
    <div>
      <NavBar/>
      <hr />
      <div className="app_container">
        <SideBar/> 
        <Routes>
          <Route path="/" element={<Add url={url}/>}/>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/order" element={<Order url={url}/>}/>
        </Routes>
      </div>
    </div>   )
}

export default App