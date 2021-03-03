import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios';

function EditListing({ match }){
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const [pre_data, setData] = useState({});
    const history = useHistory();

    useEffect(() => {
        fetchListing();
    })

    
    const fetchListing = async () =>{
        const fetchItem = await fetch(`/api/listings/${match.params.id}`) 
        const item = await fetchItem.json()
        setData(item)
        setTitle(item.title);
        setPrice(item.price);
        setImage(item.image);
        setDescription(item.description);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const listing= {id: match.params.id, title, price, image, description}
        console.log(listing);

        axios.put(`http://localhost:5000/api/listings/${match.params.id}`, listing)
            .then(history.push(`/listing/${match.params.id}`))
            .catch((err) => {console.log(err)})
    }

    return(
        <div className="row">
            <div className="col-6 offset-3">
            <h3 className="text-center">Edit listing</h3>
            <form noValidate className="validated" onSubmit={handleSubmit}>
            
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} defaultValue={pre_data.title} />
            </div>

            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" name="pricing" defaultValue={pre_data.price} onChange={(e) => setPrice(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="price" className="form-label">Image</label>
                <input type="text" name="image" defaultValue={pre_data.image} onChange={(e) => setImage(e.target.value)}/>
            </div>
            
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea cols="10" rows="3" className="form-control" type="text" name="description" defaultValue={pre_data.description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            <button>Add Listing</button>
            </form>
            </div>
        </div>
        
    )
}

export default EditListing;