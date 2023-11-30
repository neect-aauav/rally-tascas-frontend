// check authentication token validity
// pass not applicable paths as an array
const checkSession = (navigate, apiUrl, notApplicablePaths) => {
    if (!notApplicablePaths.includes(window.location.pathname) && window.location.pathname.includes('/admin')) {
  
      const token = localStorage.getItem('token');
      if (token) {
          // check if token is valid
          fetch(apiUrl+'/api/token', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({token}),
          })
          .then(res => res.json())
          .then(data => {
              if (!(data.status && data.status === 200)) {
                  localStorage.removeItem('token');
                  navigate('/login');
              }
          });
      }
      else
          navigate('/login');
    }
}
  
// check if bar is selected
// pass not applicable paths as an array
const checkBar = (navigate, notApplicablePaths) => {
    if (!notApplicablePaths.includes(window.location.pathname) && window.location.pathname.includes('/admin')) {
      if (!localStorage.getItem('bar')) {
        navigate('/admin/bares');
      }
    }
}

// check if already logged in
const checkLogin = (navigate, apiUrl) => {
    const token = localStorage.getItem('token');
    if (window.location.pathname === '/login' && token) {
        // check if token is valid
        return (fetch(apiUrl+'/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: token}),
        })
        .then(res => res.json())
        .then(data => {            
            if (data.status && data.status === 200) {
                if (localStorage.getItem('bar')) {
                    navigate('/admin/equipas');
                } else {
                    navigate('/admin/bares');
                }
            }
        }));
    }
}

export {checkSession, checkBar, checkLogin};