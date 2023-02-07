import axios from 'axios';

function Favourite(star) {
    

    const submit=(e)=>{
        const star = e.target.name;
        
        
        axios.get("http://3.38.26.169:3001/cardfavourite?star="+star ).then((res) => {
            console.log(res.data)
        })
        
        alert("관심행사에 추가되었습니다.")
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