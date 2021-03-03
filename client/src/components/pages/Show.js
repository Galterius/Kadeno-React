import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { useHistory, Link} from 'react-router-dom';

//if you like to something then it passes a the params and you can get is those with match
function Listing({ match }) {
    //useState when the data chnages re-render the UI
    const [listing , setData] = useState({});

    const history = useHistory()
    //runs automatically when the component is mounted
    useEffect(() => {
        fetchListing();
    })

    const fetchListing = async () =>{
        const fetchItem = await fetch(`/api/listings/${match.params.id}`)
        const item = await fetchItem.json()
        setData(item)
        //console.log(item)
    }

    const handleDeleteClick = (e) =>{
        e.preventDefault();

       axios.delete(`http://localhost:5000/api/listings/${listing._id}`)
            .then(history.push('/listings'));
    }
    return (
        <div key={listing._id}>
            <h3 >{listing.title}</h3>
            <img alt ="" src={listing.image} />
            <p>{listing.description}</p>

            <div>
                <button className="btn btn-danger" onClick={handleDeleteClick}>Delete listing</button>
                <Link to={`/listing/edit/${listing._id}`}>
                    <p className="btn btn-warning">Edit</p>
                </Link>
            </div>
        </div>
        
    );
    
}


export default Listing;