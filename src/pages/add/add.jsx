import { useState } from 'react';
import axios from "axios";
import "./add.css"

const Add = ({ url }) => {

    const baseUrl = url; 

    const [image, setImage] = useState(false); 
    const [isLoading, setIsLoading] = useState(false); 
    const [statusMessage, setStatusMessage] = useState(null); 

    const [data, setData] = useState({
        name: "",
        price: "",
        description: "",
        category: "Salad"
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        const parsedValue = name === 'price' ? Number(value) : value;
        setData(prevData => ({ ...prevData, [name]: parsedValue }));
        setStatusMessage(null);
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true); 
        setStatusMessage(null);

        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("description", data.description);
        formData.append("category", data.category);

        if (image) {
            formData.append("image", image);
        } else {
            const message = "Please upload an image for the food item.";
            console.error(message);
            setStatusMessage({ text: message, type: 'error' });
            setIsLoading(false);
            return;
        }

        try {
            const res = await axios.post(`${baseUrl}/api/food/add`, formData);

            if (res.data.success) {
                const message = "Food item added successfully!";
                console.log(message);
                setStatusMessage({ text: message, type: 'success' });

                setData({ name: "", price: "", description: "", category: "Salad" });
                setImage(false);

            } else {
                const message = res.data.message || "Unknown server error";
                console.error(`Product creation failed: ${message}`);
                setStatusMessage({ text: `Failed to add item: ${message}`, type: 'error' });
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Could not connect to the server.";
            console.error(`Error creating product: ${errorMessage}`);
            setStatusMessage({ text: `Error creating product: ${errorMessage}`, type: 'error' });
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="add">
            <form className="flex_col" onSubmit={onSubmitHandler}>
                
                {statusMessage && (
                    <div className={`status-message ${statusMessage.type}`}>
                        {statusMessage.text}
                    </div>
                )}

                <div className="add_img_upload flex_col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : 'https://placehold.co/120x120/E5E7EB/9CA3AF?text=Upload'}
                            alt="Upload Area"
                            required
                            className={image ? "uploaded-image" : "upload-placeholder-img"}
                        />
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
                        <select name="category" onChange={onChangeHandler} required value={data.category}>
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
                <button
                    type='submit'
                    className='add_btn'
                    disabled={isLoading} 
                >
                    {isLoading ? "Adding..." : "Add"}
                </button>
            </form>

            
        </div>
    )
}

export default Add
