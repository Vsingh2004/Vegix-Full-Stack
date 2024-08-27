import React, {useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {


  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Samosa" 
   })

   const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]:value}))
   }

   const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)

    const response = await axios.post(`${url}/api/food/add`, formData)
    if (response.data.success){
      setData({
        name: "",
        description: "",
        price: "",
        category: "Samosa"
      })
      setImage(false)
      toast.success("Food Added")
    }
    else{
      toast.error("Error");
    }
  }

  return (
    <div className='w-9/12 ml-20 mt-12 text-[#6d6d6d] text-base'>
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-6'>
        <div>
            <p>Upload Image</p>
            <label htmlFor="image">
                <img className='w-44 cursor-pointer mt-3 rounded-lg' src= {image? URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e) => setImage(e.target.files[0]) } type="file"  id="image" hidden required />
        </div>
        <div className='w-3/5 '>
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} className='p-2 w-7/12 border border-3 rounded-lg'  type="text" name= 'name' placeholder='Type here' />
        </div>
        <div className='w-3/5'>
            <p>Product description</p>
            <textarea onChange={onChangeHandler} value= {data.description} className='p-2 w-7/12 border border-3 rounded-lg'  name= 'description' rows="6" placeholder='Write about the product' ></textarea>
        </div>
        <div className='flex gap-7'>
            <div>
                <p>Product Category</p>
                <select onChange={onChangeHandler}  className='max-w-28 p-2 border border-gray-300 rounded-md' name="category" id="">
                    <option value="Samosa">Samosa</option>
                    <option value="Kathi Rolls">Kathi Rolls</option>
                    <option value="Dosa">Dosa</option>
                    <option value="Kachori">Kachori</option>
                    <option value="Chaat">Chaat</option>
                    <option value="Pani Puri">Pani Puri</option>
                    <option value="Pakori">Pakori</option>
                    <option value="Paneer">Paneer</option>
                    <option value="Vada Pav">Vada Pav</option>
                    <option value="Pav Bhaji">Pav Bhaji</option>
                    <option value="Bhutta">Bhutta</option>
                    <option value="Sev Puri">Sev Puri</option>
                    <option value="Momos">Momos</option>
                    <option value="Dabeli">Dabeli</option>
                    <option value="Chole Bhature">Chole Bhature</option>
                    <option value="Idli">Idli</option>
                </select>
            </div>
            <div>
                <p>Product Price</p>
                <input onChange={onChangeHandler} value={data.price} className='max-w-28 p-2 border border-gray-300 rounded-md' type="number" name="price" placeholder='Rs. 20' />
            </div>
        </div>
        <button className='max-w-28 border-0 p-2 bg-slate-950 text-white cursor-pointer rounded-md' type="submit">ADD</button>
      </form>
    </div>
  )
}

export default Add
