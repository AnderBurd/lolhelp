import '../styles/HomeScreen.css'
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';


const HomeScreen = () =>{
    
    const navigate = useNavigate();

    const handleSelectChampion = (champion) => {
        navigate(`/ChampInfo/${champion}`);
    };

    return (
        
        <SearchBar onSelectChampion = {handleSelectChampion}/>
    );
}

export default HomeScreen;