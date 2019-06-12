const API = (function() {

    function fetchJSON(url,get) {
        return fetch(url)
            .then(result => result.json())
            .then(data => data[get]);
    }

    return {
        fetchJSON
    };
})();