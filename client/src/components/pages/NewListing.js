import {useState} from 'react'
import axios from 'axios';

function NewListing(){
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const listing = {title, price, image, description}
        console.log(listing);
    
        axios.post('http://localhost:5000/api/listings', listing)
            .then((res) => console.log(res.data))
            .catch((err) => {console.log(err)})
    }

    return(
        <div className="row">
            <div className="col-6 offset-3">
            <h3 className="text-center">New Listing</h3>
            <form noValidate className="validated" onSubmit={handleSubmit}>
            
            <div className="mb-3">
                <label htmlFor="titile" className="form-label">Title</label>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="text" name="pricing" value={price} onChange={(e) => setPrice(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="price" className="form-label">Image</label>
                <input type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)}/>
            </div>
            
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea cols="10" rows="3" className="form-control" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            <button>Add Listing</button>
            </form>
            </div>
        </div>
        
    )
}

export default NewListing;