const express = require('express')
const app = express()
const sqlite = require('sqlite3')
const db = new sqlite.Database("final-project.db")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(express.json())

//Enable foreign key constraints.
db.run("PRAGMA foreign_keys = ON")

//Enable CORS.
app.use(function (request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Methods", "*")
    response.setHeader("Access-Control-Allow-Headers", "*")
    response.setHeader("Access-Control-Expose-Headers", "*")
    next()
})

//Add moddleware 
app.use(express.urlencoded({
    extended: false
}))

const jwtSecret = "lseekfkbgjgf"
const idSecret = "kdfgkivkbkgkfk"

//Try to extract info from access token in the request
app.get("/some-protected-resource", function (request, response) {

    let dataInToken = null

    try {
        const authorizationHeader = request.get("Authorization") // E.g. "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3VudHJ5IjoiU3dlZGVuIn0.k6rz1VHMIg3YvFpm4JMy78RUnFBUCPQPRoRXa2HlRjs"
        const accessToken = authorizationHeader.substr("Bearer ".length) // E.g. "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3VudHJ5IjoiU3dlZGVuIn0.k6rz1VHMIg3YvFpm4JMy78RUnFBUCPQPRoRXa2HlRjs"
        dataInToken = jwt.verify(accessToken, jwtSecret) // E.g. {country: "Sweden"}
    } catch (error) {
        response.status(500).end()
        console.log(error)
    }
    if (dataInToken) {
        response.status(200).json(dataInToken)
    } else {
        console.log('No valid token')
    }
})

//Requests for token
app.post("/tokens", function (request, response) {
    //in inputAccout we use request.body to fetch the input from the frontend
    const inputAccount = request.body

    //then we grab the username and password from the input
    const username = inputAccount.username
    const password = inputAccount.password

    if (inputAccount.grant_type != "password") {
        response.status(400).json({ error: "unsupported_grant_type" })
        return
    }

    //then we call on the function getAccoutByUsername and pass in the value from the username input
    getAccountByUsername(username, function (errors, account) {
        if (errors.includes("databaseError")) {
            response.status(500).end()
        } else if (!account) {
            response.status(400).json({ error: "no account with that username" })
        } else if (!bcrypt.compareSync(password, account.password)) {
            response.status(400).json({ error: "wrong password" })
        } else {

            // Generate and send back access token + id token.
            const accessToken = jwt.sign({
                accountId: account.id
            }, jwtSecret)

            const idToken = jwt.sign({
                sub: account.id,
                preferred_username: account.username
            }, idSecret)

            response.status(200).json({
                token_type: "Bearer",
                access_token: accessToken,
                id_token: idToken
            })
        }
    })

})

//This is the function we call, here we want to get all accounts with the right username
function getAccountByUsername(username, callback) {

    const query = `SELECT * FROM accounts WHERE username = ?`
    const values = [username]
    db.get(query, values, function (error, account) {
        if (error) {
            console.log(error)
            callback(["databaseError"])
        } else {
            callback([], account)
        }
    })
}

//Create table for posts in our database
db.run(`
	CREATE TABLE IF NOT EXISTS posts (
		id INTEGER PRIMARY KEY,
		accountId INTEGER,
		title TEXT,
        content TEXT,
        category TEXT,
        date INTEGER,
        FOREIGN KEY(accountId) REFERENCES accounts(id)
	)
`)

//Create table for accounts in our database
db.run(` 
CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    CONSTRAINT uniqueUsername UNIQUE(username)
)
`)

//Fetch all accounts
app.get("/accounts", function (request, response) {
    const query = "SELECT * FROM accounts ORDER BY username"
    db.all(query, function (error, accounts) {
        if (error) {
            response.status(500).end()
        } else {
            accounts.forEach(account => delete account.password)
            response.status(200).json(accounts)
        }
    })
})

//Fetch all posts
app.get("/posts", function (request, response) {
    if (request.query.accountId) {
        const accountId = request.query.accountId
        const values = [accountId]
        const query = "SELECT * FROM posts WHERE accountId = ? ORDER BY date DESC"
        db.all(query, values, function (error, posts) {
            if (error) {
                response.status(500).end()
            } else {
                response.status(200).json(posts)
            }
        })
    }
    else {
        const query = "SELECT * FROM posts ORDER BY date DESC"
        db.all(query, function (error, posts) {
            if (error) {
                response.status(500).end()
            } else {
                response.status(200).json(posts)
            }
        })
    }
})

//Fetch a single account
app.get("/accounts/:id", function (request, response) {
    const id = request.params.id
    const query = "SELECT * FROM accounts WHERE id = ?"
    const values = [id]
    db.get(query, values, function (error, account) {
        if (error) {
            console.log(error)
            response.status(500).end()
        } else if (!account) {
            console.log('No account with that id exists :(')
            response.status(404).end()
        } else {
            delete account.password
            response.status(200).json(account)
        }
    })
})

//Fetch a single post
app.get("/posts/:id", function (request, response) {
    const id = request.params.id
    const query = "SELECT * FROM posts WHERE id = ?"
    const values = [id]
    db.get(query, values, function (error, post) {
        if (error) {
            console.log(error)
            response.status(500).end()
        } else if (!post) {
            console.log('No post with that id exists :(')
            response.status(404).end()
        } else {
            response.status(200).json(post)
        }
    })
})

//Create account
app.post("/accounts", function (request, response) {
    const account = request.body
    const query = "INSERT INTO accounts (username, password) VALUES (?, ?)"

    //hash password
    const hashingRounds = 8 
    const passwordToHash = account.password
    const hashValue = bcrypt.hashSync(passwordToHash, hashingRounds) 

    const values = [account.username, hashValue]
    db.run(query, values, function (error) {
        if (error) {
            response.status(500).end()
        } else {
            const id = this.lastID
            response.header("Location", "/accounts/" + id)
            response.status(200).end()
        }
    })
})

//Create post
app.post("/posts", function (request, response) {
    const post = request.body
    const query = "INSERT INTO posts (accountId, title, content, category, date) VALUES (?, ?, ?, ?, ?)"
    const values = [post.accountId, post.title, post.content, post.category, post.date]

    db.run(query, values, function (error) {
        if (error) {
            console.log(error)
            response.status(500).end()
        } else {
            const id = this.lastID
            response.header("Location", "/posts/" + id)
            response.status(200).end()
        }
    })
})

//Update account
app.put("/accounts/:id", function (request, response) {
    const account = request.body
    const query = "UPDATE accounts SET username = ?, password = ? WHERE id = ?"
    const id = parseInt(request.params.id)

    //hash password
    const hashingRounds = 8 
    const passwordToHash = account.password
    const hashValue = bcrypt.hashSync(passwordToHash, hashingRounds)

    const values = [account.username, hashValue, id]

    db.run(query, values, function (error) {
        if (error) {
            response.status(500).end()
        } else {
            response.header("Location", "/accounts/" + id)
            response.status(204).end()
        }
    })
})

//Update post
app.put("/posts/:id", function (request, response) {
    const post = request.body
    const query = "UPDATE posts SET title = ?, content = ?, category = ?, date = ? WHERE id = ?"
    const id = parseInt(request.params.id)
    const values = [post.title, post.content, post.category, post.date, id]

    db.run(query, values, function (error) {
        if (error) {
            console.log(error)
            response.status(500).end()
        } else {
            response.header("Location", "/posts/" + id)
            response.status(204).end()
        }
    })
})


//Delete account
app.delete("/accounts/:id", function (request, response) {
    const query = "DELETE FROM accounts WHERE id = ?"
    const id = parseInt(request.params.id)
    const values = [id]
    db.run(query, values, function (error) {
        if (error) {
            response.status(500).end()
        } else {
            response.status(204).end()
        }
    })
})

//Delete post
app.delete("/posts/:id", function (request, response) {
    const query = "DELETE FROM posts WHERE id = ?"
    const id = parseInt(request.params.id)
    const values = [id]
    db.run(query, values, function (error) {
        if (error) {
            response.status(500).end()
        } else {
            response.status(204).end()
        }
    })
})

app.listen(3000, () => { console.log('Running...') })