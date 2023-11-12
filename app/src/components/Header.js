import MongoDBLogo from '../assets/logo512.png';
import '../styles/header.css';



export default function Header(props) {

  return(
    <div className='header'>
      <div className='mongo-db-logo'>
        <a href="/"><img src={MongoDBLogo} alt="MongoDBLogo" /></a>
      </div>
      <h1>{props.title}</h1>
    </div>
  )
}

