
import HomePage from '../Screens/HomeMoule/Home';
import SignUp from '../Screens/HomeMoule/SignUp';
import SignIn from '../Screens/HomeMoule/SignIn';
import DetailMovie1 from '../Screens/HomeMoule/Detail1';
import AdminPage from '../Screens/AdminModule/AdminPage';
import Booking from '../Screens/HomeMoule/Booking';
import Personalnfor from '../Screens/HomeMoule/Personalnfor';
import MovieManager from '../Screens/AdminModule/MovieManager';
import UserManager from '../Screens/AdminModule/UserManager';
import Demo from '../Components/Demo'
import ShowTimeManager from '../Screens/AdminModule/ShowTimeManager';


const routesHome = [
    {
        exact: true,
        path: "/",
        component: HomePage
    },
    {
        exact: false,
        path: "/signup",
        component: SignUp
    },
    {
        exact: false,
        path: "/homepage",
        component: HomePage
    },
    {
        exact: false,
        path: "/signin",
        component: SignIn
    },
    {
        exact: false,
        path: "/detail/:Id",
        component: DetailMovie1
    },
    {
        exact: false,
        path: "/info",
        component: Personalnfor
    },

];
const routesBooking = [
    {
        exact: false,
        path: "/booking/:Id",
        component: Booking
    }
];

const routesAdmin = [
    {
        exact: false,
        path: "/demo",
        component: Demo
    },
    {
        exact: true,
        path: "/admin",
        component: AdminPage
    },
    {
        exact: false,
        path: "/admin/movie",
        component: MovieManager
    },
    {
        exact: false,
        path: "/admin/user",
        component: UserManager
    },
    {
        exact: false,
        path: "/admin/showtime",
        component: ShowTimeManager
    }
];



export { routesHome, routesAdmin, routesBooking };