const API = (function() {
    const token = 'token=nS2RoUimybxL5f28GKHz9ec9GzbMWaWXH7TA7eg2oXjuTLWcPl0';
    const cors  = 'https://cors-anywhere.herokuapp.com/';
    
    function fetchJSON(url,search) {
        return fetch( cors + url + '?' + token + (search?search:""))
              .then(result => result.json())
              .catch(()=> console.log("No such champion!"));
    }

    return {
        fetchJSON
    };
})();