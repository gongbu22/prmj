import './App.css';
// import AddEvent from './component/AddEvent';
import Nav from './component/Nav';
import styled from 'styled-components';
import {FaGraduationCap} from 'react-icons/fa'
import {NavLink} from 'react-router-dom';
import Footer from './component/Footer';
import Logo from './component/Logo2.jpg';


const NavStyle = styled(NavLink) `
   position: relative;
   color: black;
   padding: 80px;
   bottom: -20px !important;
   font-size: 40px;
   font-wight: 300;
   margin: auto;
   margin-bottom: 10px;
   &:link {
     transition : 0.5s;
    text-decoration: none;
   }
   &:hover {
    color: black;
  }

`

function App() {
  return (
     <div>
    <div className="wap"> 
    <header>
    <p></p>
        <NavStyle to="/"><img src={Logo} style={{width:"180px", float:"left"}}/></NavStyle>
    </header>
    <p></p>
      <body>
        <Nav />
      </body>
    </div>
    <div>
     <footer>
        <Footer />
     </footer>
      
  </div>
  </div>

  );
}

export default App;
