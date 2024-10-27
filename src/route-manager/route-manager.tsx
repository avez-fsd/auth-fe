import {lazy, Suspense} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import Loader from '../components/Loader';

const SignIn = lazy(()=> import('../pages/signin/signin'))
const SignUp = lazy(()=> import('../pages/signup/signup'))
const Dashboard = lazy(()=> import('../pages/dashboard/dashboard'))


const RouteManager = () => {
    
    return (
        <Suspense fallback={<Loader/>}>
            <Routes>
                <Route path = "/" element={<Dashboard/>}/>
                <Route path = "/login" element={<SignIn/>}/>
                <Route path = "/signup" element={<SignUp/>}/>
                <Route path = "*" element={<Navigate to="/" />}/>
            </Routes>
        </Suspense>
    );
}

export default RouteManager;
