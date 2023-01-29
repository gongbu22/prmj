import axios from 'axios';

function Favourite(star) {
    

    const submit=(e)=>{
        
        
        
        axios.get("http://3.38.26.169:3001/favourite",  ).then((res) => {
            console.log(res.data)
        })
    }
    
    return(
        <div>
        <form>
        <input type='button' value={star.star} onClick={submit} style={{float: 'right'}}></input>
        </form>
        </div>
    )
}

export default Favourite;