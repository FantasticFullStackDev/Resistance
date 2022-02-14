export default useSession = (function() {
    const getSession = () => {
        const sessionString = sessionStorage.getItem('token');
        const userSession = JSON.parse(sessionString);
        return userSession
      };
    
      const [token, setToken] = useState(getToken());
    
      const saveToken = (userToken) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
      };
    
      return { setSession: saveSession, token}

    var full_name = "";
  
    var getName = function() {
      return full_name;    // Or pull this from cookie/localStorage
    };
  
    var setName = function(name) {
      full_name = name;     
      // Also set this in cookie/localStorage
    };
  
    return {
      getName: getName,
      setName: setName
    }
  
  })();
  
  export default UserProfile;

  import React, { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return { setToken: saveToken, token}
}