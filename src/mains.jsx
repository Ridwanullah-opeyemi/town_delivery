import { Route, Routes } from "react-router-dom"
import NavBar from "./component/navBar/navBar"
import Add from "./pages/add/add"
import Order from "./pages/order/order"
import List from "./pages/list/list"
import SideBar from "./component/sideBar/sideBar" // Assuming SideBar is imported here

const Mains = ()=>{

  const url = "https://orange-backend-79d9.onrender.com"

   return(
    <div>
      <NavBar/>
      <hr />
      <div className="app_container">
        <SideBar/> 
        <Routes>
          {/* Default path for /main - use index or remove if /main should redirect */}
          <Route index element={<Add url={url}/>}/> 
          
          {/* Use relative paths: "add" resolves to /main/add */}
          <Route path="add" element={<Add url={url}/>}/>
          <Route path="list" element={<List url={url}/>}/>
          <Route path="order" element={<Order url={url}/>}/>
          
          {/* Optional: You can keep the path="/" if you want /main to default to Add, 
              or use the 'index' prop for the default route. I've used 'index' above. */}
        </Routes>
      </div>
    </div> 
  )
}

export default Mains