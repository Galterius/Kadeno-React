import React, { useState, useEffect} from 'react';

//if you like to something then it passes a the params and you can get is those with match
function Listing({ match }) {
    //useState when the data chnages re-render the UI
    const [listing , setData] = useState({});

    //runs automatically when the component is mounted
    useEffect(() => {
        fetchListing();
        return () =>{
            destroyJson(listing)
        }

    }, [listing])

    const fetchListing = async () =>{
        const fetchItem = await fetch(`/api/listings/${match.params.id}`)
        const item = await fetchItem.json()

        setData(item)
        console.log(item)
    }

    return (
        <div>
            <h3 key={listing._id}>{listing.title}</h3>
            <img key={listing._id} src={listing.image} />
            <p key={listing._id}>{listing.description}</p>
        </div>
    );
    
}

function destroyJson(listing){
    listing= {};
}

export default Listing;