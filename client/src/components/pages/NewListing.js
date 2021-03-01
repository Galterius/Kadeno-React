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
        <div>
            <form onSubmit={handleSubmit}>
            <h3>Add a new listing</h3>
            <label>
                Title:
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </label>
            

            <label>
                Pricing:
                <input type="text" name="pricing" value={price} onChange={(e) => setPrice(e.target.value)}/>
            </label>

            <label>
                Image:
                <input type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)}/>
            </label>
            
            <label>
                Description:
                <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </label>

            <button>Add Listing</button>
            </form>
        </div>
        
    )
}

export default NewListing;