import { NavLink } from 'react-router-dom'
import assets from '../../assets/assets'
import './sidebar.css'

const SideBar = ()=>{
   return(
    <div className= "sidebar">
      <div className="sidebar_options">
        <NavLink to='/add' className="sideBar_option">
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sideBar_option">
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
        </NavLink>
        <NavLink to='/order' className="sideBar_option">
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>
      </div>
    </div>
   )
}

export default SideBar