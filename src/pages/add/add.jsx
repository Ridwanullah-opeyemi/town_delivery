import { useState } from 'react'
import assets from '../../assets/assets'
import axios from "axios"
import './add.css'

const Add = ({url}) => {

    // IMPORTANT: Ensure your backend uses the correct port 4002
    const baseUrl = url;

    const [image, setImage] = useState(false); // Stores the File object
    const [data, setData] = useState({
        name: "",
        price: "",
        description: "",
        category: "Salad"
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        // Handle price as a number
        const parsedValue = name === 'price' ? Number(value) : value;
        setData(prevData => ({ ...prevData, [name]: parsedValue }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // 1. Use FormData for combined text and file upload
        const formData = new FormData();

        // Append text data
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("description", data.description);
        formData.append("category", data.category);

        // Append the file data
        if (image) {
            formData.append("image", image);
        } else {
            // Basic client-side check if image is required
            alert("Please upload an image for the food item.");
            return;
        }

        try {
            // Using axios.post, which handles Content-Type for FormData automatically
            const res = await axios.post(`${baseUrl}/api/food/add`, formData);
            
            // Axios puts the response body in res.data
            if (res.data.success) {
                console.log("Data added successfully:", res.data.message);
                alert("Food item added successfully!");

                // Reset form fields
                setData({ name: "", price: "", description: "", category: "Salad" });
                setImage(false);

            } else {
                // Access error message from res.data
                console.error("Product creation failed:", res.data.message);
                alert(`Failed to add item: ${res.data.message || "Unknown server error"}`);
            }

        } catch (error) {
            // Improved error handling for Axios (catches network errors or non-2xx status codes)
            const errorMessage = error.response?.data?.message || error.message || "Could not connect to the server.";
            console.error("Product creation error:", error);
            alert(`Error creating product: ${errorMessage}`);
        }
    };

    // Component for the Upload Icon Placeholder
    const UploadIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
    );

    return (
        <div className="add">
            <form className="flex_col" onSubmit={onSubmitHandler}>
                <div className="add_img_upload flex_col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" required />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add_product_name">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
                </div>
                <div className="add_product_description">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="write content here" required ></textarea>
                </div>
                <div className="add_category_price">
                    <div className="add_category flex_col">
                        <p>Product category</p>
                        <select name="category" onChange={onChangeHandler} required>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Vegetable">Vegetable</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add_price flex_col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' required />
                    </div>
                </div>
                <button type='submit' className='add_btn'>Add</button>
            </form>
        </div>
    )
}

export default Add