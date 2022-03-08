var axios = require('axios');
var data = JSON.stringify({
    "collection": "USER",
    "database": "COOPLAN",
    "dataSource": "PlanCluster",
    // "projection": {
    //     "_id": 1
    // }
    "document": {
        "name": "test",
        "time": "test"
    }
});
            
var config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-gsiry/endpoint/data/beta/action/insertOne',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'jMmUbYZAEDd2nF70N63uwcppHpNoEn9f971HTJKDAMYBpQ0rr4WM7SJknu2Ixpx2'
    },
    data : data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });