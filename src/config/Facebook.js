import React, { useState, useEffect } from 'react';

const Facebook = () => {

  const [auth, setAuth] = useState({});

  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '181212609920671',
        cookie     : true,
        xfbml      : true,
        version    : 'v6.0'
      });
        
      window.FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });  
        
    };
  
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }, []);

  const testAPI = () => {
	  window.FB.api(
      '/me',
      'GET',
      {"fields":"id,name,birthday,hometown"},
      function(response) {
          console.log(response)
      }
    );
	}

  const statusChangeCallback = (response) =>{
    console.log('inside statusChangeCallback',response)
    if(response.status === 'connected'){
      console.log('Autherized');
      setAuth(response)
      testAPI()
    } else {
      console.log('Not Autherized')
    }
  }

  const checkLoginState = () =>{
	  window.FB.getLoginStatus((response) => {
	    statusChangeCallback(response);
	  });
	}

  const handleLogin = () =>{
    window.FB.login(checkLoginState, {scope: 'public_profile,email,user_hometown'});
  }

  return(
    <>{console.log('in render',auth)}
      <button className='btn btn-primary btn-sm' onClick={handleLogin}>Login to facebook</button>
    </>
  )
};

export default Facebook;
