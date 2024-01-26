import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import isAuthUser from '../../../utils/isAuthUser';
import { Center, Spinner } from '@chakra-ui/react'

function PrivateRoute({ children }) {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await isAuthUser();
      setIsAuthenticated(authInfo.isAuthenticated);
      setLoading(false);
      console.log("privateroute");
    };

    fetchData();

  }, []);

  if (isLoading) {
   
    return (

      <Center width={"100%"} height={'100'}>
      <Spinner size='xl' color='black' />
      </Center>
    
      )
  }

  if (!isAuthenticated) {
   
    return <Navigate to="login" />;
  }

  return children;
}


export default PrivateRoute;