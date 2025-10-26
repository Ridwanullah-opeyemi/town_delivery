import { useState } from 'react'
import assets from '../../assets/assets'
import axios from "axios"
import './list.css'
import { useEffect } from 'react'

const List = ({url}) => {

  const [list, setList] = useState([])
  const baseUrl = url;
  // const kk = [
  //   {
  //     "_id": 1,
  //     "name": "Margherita Pizza",
  //     "description": "Classic cheese and tomato pizza with fresh basil.",
  //     "price": 4500,
  //     "category": "Pizza",
  //     "image": "/src/assets/logo.png",
  //     "available": true
  //   },
  //   {
  //     "_id": 2,
  //     "name": "Pepperoni Pizza",
  //     "description": "Spicy pepperoni with mozzarella and tomato sauce.",
  //     "price": 5000,
  //     "category": "Pizza",
  //     "image": "/src/assets/order_icon.png",
  //     "available": true
  //   },
  //   {
  //     "_id": 3,
  //     "name": "Grilled Chicken Burger",
  //     "description": "Juicy grilled chicken with lettuce and mayo.",
  //     "price": 3200,
  //     "category": "Burgers",
  //     "image": "/images/burger-chicken.jpg",
  //     "available": true
  //   },
  //   {
  //     "_id": 4,
  //     "name": "Beef Burger",
  //     "description": "Classic beef patty with cheddar and caramelized onions.",
  //     "price": 3500,
  //     "category": "Burgers",
  //     "image": "/images/burger-beef.jpg",
  //     "available": true
  //   },
  //   {
  //     "_id": 5,
  //     "name": "French Fries",
  //     "description": "Crispy golden fries with a side of ketchup.",
  //     "price": 1500,
  //     "category": "Sides",
  //     "image": "/images/fries.jpg",
  //     "available": true
  //   }
  // ]

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
              <img src={`${baseUrl}/images/`+item.image} alt="" />
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