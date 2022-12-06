let express = require('express');
let cors = require('cors');
let axios = require('axios');
const bodyParser = require('body-parser');
let app = express();
app.use(cors());
app.use(bodyParser.json());

let client_secret = "d5e1e0a853d069a11548dadbad7850db2c1891b9";
let client_id = "b2fa34376e313b7517ec";

app.get('/auth', (req, res) => {
    let code = req.query.code;
    axios.post('https://github.com/login/oauth/access_token',{
        client_id: client_id,
        client_secret: client_secret,
        code: code
    },{
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        res.send(response.data);
    }
    ).catch((error) => {
        console.log(error);
    })
});

app.get('/user', (req, res) => {
    let token = req.query.token;
    axios.get('https://api.github.com/user',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        res.send(response.data);
    }).catch((error) => {
        res.send(error);
    })
})

app.listen(5000, () => {
    console.log('Server started on port 5000');
});