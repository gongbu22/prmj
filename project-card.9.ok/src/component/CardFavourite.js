import axios from 'axios';

function Favourite(star) {
    

    const submit=(e)=>{
        const star = e.target.name;
        
        
        axios.get("http://3.38.26.169:3001/favourite?star="+star ).then((res) => {
            console.log(res.data)
        })
    }
    
    return(
        <div>
        <form>
        <input type='button' value='관심행사추가' name={star.star} onClick={submit} style={{float: 'right'}}></input>
        </form>
        </div>
    )
}

export default Favourite;