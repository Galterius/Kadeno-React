import React, { useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';

function Listings() {
    //useState when the data chnages re-render the UI
    const [listings , setData] = useState([]);
    const isCancelled = useRef(false);

    //runs automatically when the component is mounted
    useEffect(() => {
        fetchListings();

        return () => {
            isCancelled.current = true;
        };
    })
    const fetchListings = async () =>{
        const data = await fetch('/api/listings');
        const items = await data.json();
        setData(items)
    }

    return (
        <ul>
            {listings.map(listing => (
                <li key={listing._id}>
                    <Link to={`/listing/${listing._id}`}>{listing.title}</Link>
                </li>))}
        </ul>
    );
    
}


export default Listings;