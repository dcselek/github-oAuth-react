let express = require('express');
let cors = require('cors');
let axios = require('axios');
const bodyParser = require('body-parser');
let app = express();
app.use(cors());
app.use(bodyParser.json());

let client_secret = `${process.env.CLIENT_SECRET}`;
let client_id = "b2fa34376e313b7517ec";
let api = "https://api.github.com";

app.get('/auth', (req, res) => {
    let code = req.query.code;
    axios.post('https://github.com/login/oauth/access_token', {
        client_id: client_id,
        client_secret: client_secret,
        code: code
    }, {
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
    axios.get(`${api}/user`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        res.send(response.data);
    }).catch((error) => {
        res.send(error);
    })
})

app.get('/repos', (req, res) => {
    let token = req.query.token;
    let username = req.query.username;
    let per_page = req.query.per_page;
    let page = req.query.page || 1;
    let type = req.query.type || "all";
    axios.get(`${api}/users/${username}/repos?per_page=${per_page}&page=${page}&type=${type}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/vnd.github.v3+json'
        }
    }).then((response) => {
        res.send(response.data);
    }).catch((error) => {
        res
    })
})

app.get('/commits', (req, res) => {
    let token = req.query.token;
    let owner = req.query.owner;
    let repo = req.query.repo;
    axios.get(`${api}/repos/${owner}/${repo}/commits`, {
        headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/vnd.github.v3+json'
        }
    }).then((response) => {
        res.send(response.data);
    }).catch((error) => {
        res
    })
})

app.get('/files', (req, res) => {
    let token = req.query.token;
    let owner = req.query.owner;
    let repo = req.query.repo;
    let path = req.query.path;
    axios.get(`${api}/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/vnd.github.v3+json'
        }
    }).then((response) => {
        res.send(response.data);
    }).catch((error) => {
        res
    })
})

app.get('/pulls', (req, res) => {
    let token = req.query.token;
    let owner = req.query.owner;
    let repo = req.query.repo;
    axios.get(`${api}/repos/${owner}/${repo}/pulls`, {
        headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/vnd.github+json'
        }
    }).then((response) => {
        res.send(response.data);
    }).catch((error) => {
        res
    })
})

app.listen(5000, () => {
    console.log('Server started on port 5000');
});