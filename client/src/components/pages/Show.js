import React, { useState, useEffect} from 'react';

//if you like to something then it passes a the params and you can get is those with match
function Listing({ match }) {
    //useState when the data chnages re-render the UI
    const [listing , setData] = useState({});

    //runs automatically when the component is mounted
    useEffect(() => {
        fetchListing();

    }, [])

    const fetchListing = async () =>{
        const fetchItem = await fetch(`/api/listings/${match.params.id}`)
        const item = await fetchItem.json()

        setData(item)
        console.log(item)
    }

    return (
        <div key={listing._id}>
            <h3 >{listing.title}</h3>
            <img src={listing.image} />
            <p>{listing.description}</p>
        </div>
    );
    
}


export default Listing;