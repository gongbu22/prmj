
import axios from 'axios';

function Favourite(star) {
    

    const submit=(e)=>{
        const star = e.target.name;
        
        
            axios.get("http://3.38.26.169:3001/favouriteDelete?star="+star ).then((res) => {
                console.log(res.data)
                
                document.location.reload();
            });
        
        
    }
    
    return(
        <div>
            <input type='button' value='관심행사삭제' name={star.star} onClick={submit} style={{float: 'right'}}></input>
        </div>
    )
}

export default Favourite;