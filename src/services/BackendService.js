import axios from 'axios';

export default {
    searchCigars(query, callback) {
        axios.get('/api/cigars/search', {
            params: {
                query: query
            }
        })
            .then(function (response) {
                callback(null, response.data.content)
            })
            .catch(function (error) {
                callback(error)
            })
    },
    cigarInfo(brand, name, callback) {
        axios.get(`/api/cigars/${brand}/${name}`)
            .then((response) => {
                callback(null, response.data);
            }).catch((error) => {
                callback(error);
        })
    }
}



