// check authentication token validity
// pass not applicable paths as an array
const checkSession = (apiUrl, notApplicablePaths) => {
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
              if (!(data.status && data.status == 200)) {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
              }
          });
      }
      else
          window.location.href = '/login';
    }
}
  
// check if bar is selected
// pass not applicable paths as an array
const checkBar = notApplicablePaths => {
    if (!notApplicablePaths.includes(window.location.pathname) && window.location.pathname.includes('/admin')) {
      if (!localStorage.getItem('bar')) {
        window.location.href = '/admin/bares';
      }
    }
}

export {checkSession, checkBar};