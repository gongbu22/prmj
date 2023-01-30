import axios from 'axios';
import {useState} from 'react';

const Favourite = () => {
    
    const [favourite, setFavourite] =useState([]);
    
    axios.get('http://3.38.26.169:3001/favouriteList')
    
    return (
        <div></div>
    )
}

export default Favourite;