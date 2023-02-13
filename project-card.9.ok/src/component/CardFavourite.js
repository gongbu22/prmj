import axios from 'axios';

function Favourite(props) {
    const {star, ID, websiteList, courseName}=props
    

    const submit=(e)=>{
        const star = e.target.name;
        
        console.log(star, websiteList, courseName)
        
        
        axios.get("http://3.38.26.169:3001/cardfavourite?star="+star+"&ID="+ ID+"&websiteList="+websiteList+"&courseName="+courseName+"").then((res) => {
            console.log(res.data)
        })
        
        alert("관심과정에 추가되었습니다.")
    }
    
    return(
        <div>
        <form>
        <input type='button' value='관심과정추가' name={star} onClick={submit} style={{float: 'right'}} className="listbutton"></input>
        </form>
        </div>
    )
}

export default Favourite;