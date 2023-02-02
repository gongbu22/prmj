import useState from 'react';
import axios from 'axios';

let url="http://3.38.26.169:3001/cardList"

function Fetch(url) {
    
    const [cards, setCards] = useState(null);
    
    axios.get("http://3.38.26.169:3001/cardList").then((res) => {
      // console.log(res)
      setCards(res.data);
    });
    
    
    return {cards};
}

export default Fetch;