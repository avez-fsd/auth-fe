import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { isAuthenticated } from '../utils/helpers';

const withAuth = (WrappedComponent:any) => {

    return (props:any) => {
        const navigate = useNavigate();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            if(!isAuthenticated()) navigate('/login')
            setLoading(false);
        }, []);

        if(loading) return <Loader/>
        return <WrappedComponent {...props} />;
  };
};

export default withAuth;
