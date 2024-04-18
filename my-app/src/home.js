import {signOut} from "firebase/auth"
import {Link, useNavigate} from "react-router-dom";
import EventPage from './components/Homepage/EventPage';
import NavBar from "./components/Homepage/NavBar";
import {useAuth}  from './firebase';
import {userNavBar,guestNavBar} from "./components/Homepage/NavBar";

const Home = () => {
    return (
        <div>
            <NavBar/>
             <EventPage/>
        </div>
    );
};

export default Home;