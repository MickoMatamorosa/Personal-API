const API = (function() {

    function fetchJSON(url) {
        return fetch("https://cors-anywhere.herokuapp.com/"+url)
            .then(result => result.json());
    }

    return {
        fetchJSON
    };
})();