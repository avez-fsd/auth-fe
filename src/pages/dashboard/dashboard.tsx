import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import './index.css'
import withAuth from '../../components/Auth';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Loader from '../../components/Loader';

function Dashboard() {
    const [value, setValue] = useState(new Date());
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const interval = setInterval(() => setValue(new Date()), 1000);
      const token = localStorage.getItem('token');
      if(token) {
        const decodedToken = jwtDecode(token) as any;
        setName(decodedToken.name || 'Robo')
      }
      setLoading(false)
      return () => {
        clearInterval(interval);
      };
    }, []);

    const logout = () => {
      localStorage.removeItem('token');
      navigate('/login')
    }
    if(loading) return <Loader/>
    return (
      <>
        <div className="bg-white dark:bg-gray-900">
            <button className="px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 cursor-pointer absolute top-5 right-5" onClick={logout}>Logout</button>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-white text-4xl text-center">Welcome to the app <span className='capitalize'>{name} :)</span></h1>
                <br />
                <br />
                <div className="Sample__container">
                    <main className="Sample__container__content">
                        <Clock size={200} value={value} />
                    </main>
                </div>
            </div>
        </div>
      </>
    )
}
  
  export default withAuth(Dashboard);
  