import './App.css';
// import AddEvent from './component/AddEvent';
import Nav from './component/Nav';
import styled from 'styled-components';
import {MdChildCare} from 'react-icons/md'
import {NavLink} from 'react-router-dom';
import Footer from './component/Footer';


const NavStyle = styled(NavLink) `
   color: #A9DD54;
   padding: 20px;
   font-size: 40px;
   font-wight: 300;
   margin: auto;
   margin-bottom: 10px;
   &:link {
     transition : 0.5s;
    text-decoration: none;
   }
   &:hover {
    color: #A9DD54;
  }
  &:active {
    color: #A9DD54;
    position: relative;
    top: 2px;
  }
`

function App() {
  return (
    <div>
    <header>
        <li><NavStyle to="/" className={({isActive}) => (isActive? "active" : "")}><MdChildCare />Paranmanjang</NavStyle>
        </li>
    </header>
      <body>
        <Nav />
      </body>
     <footer>
        <Footer />
     </footer>
      
  </div>

  );
}

export default App;
