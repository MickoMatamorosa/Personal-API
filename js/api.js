const API = (function() {
    const token = 'token=nS2RoUimybxL5f28GKHz9ec9GzbMWaWXH7TA7eg2oXjuTLWcPl0';
    const cors  = 'https://cors-anywhere.herokuapp.com/';
    
    function fetchJSON(url) {
        return fetch( cors + url + '?' + token)
              .then(result => result.json());
    }

    return {
        fetchJSON
    };
})();