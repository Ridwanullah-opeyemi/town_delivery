import { useState } from 'react'
import assets from '../../assets/assets'
import axios from "axios"
import './list.css'
import { useEffect } from 'react'

const List = ({url}) => {

  const [list, setList] = useState([])
  const baseUrl = url;
  

  const fetchList = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/food/list`)

      if (res.data.success) {
        setList(res.data.data)
      }
      else {
        console.log(error, res.message);

      }
      // let list = data
      // setList(kk)

    } catch (error) {
      console.log(error);
    }

  }
  useEffect(()=>{
    fetchList()
  },[])

  const removedFood = async (foodId) => {
    try {
      const res = await axios.post(`${baseUrl}/api/food/remove`,{id:foodId});
      await fetchList()
      if (res.ok) {
        setList(list.filter(list =>list._id != foodId))
      }
    } catch (error) {
      console.log(error);

    }

  }

  return (
    <div className="list add flex-col">
      <p>All food List</p>
      <div className="list_table">
        <div className="list_table_format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className="list_table_format">
              <img src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removedFood(item._id)} className="cursor">x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List