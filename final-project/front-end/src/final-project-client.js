const jwtDecode = require('jwt-decode').default
let accessToken = ''

//Log in to your account
module.exports.logIn = async function (username, password, callback) {
	let errors = []
	const bodyToSend = {
		username,
		password,
		grant_type: 'password'
	}
	let account = {
		id: -1,
		username: ""
	}
	console.log(bodyToSend)
	try {
		const response = await fetch("http://localhost:3000/tokens", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bodyToSend)
		})
		const body = await response.json()
		accessToken = body.access_token
		const payload = jwtDecode(body.id_token)
		account.id = payload.sub
		account.username = payload.preferred_username
	} catch (errors) {
		console.log('errors: ' + errors)
		callback(errors)
		return
	}
	callback(errors, account)
	return accessToken
}

//Log out from your account
module.exports.logOut = async function (callback) {
	accessToken = ''
	callback()
}

//Get all accounts
module.exports.getAccounts = async function (callback) {
	let errors = []
	let accounts = []

	try {
		const response = await fetch('http://localhost:3000/accounts')
		accounts = await response.json()
	} catch (errors) {
		callback(errors)
		console.log(errors)
		return
	}
	callback(errors, accounts)
}

//Get account by id
module.exports.getAccountById = async function (id, callback) {
	let errors = []
	let account = ''

	try {
		const response = await fetch('http://localhost:3000/accounts/' + id)
		account = await response.json()
	} catch (errors) {
		callback(errors)
		console.log(errors)
		return
	}
	callback(errors, account)
}

//Create account
module.exports.createAccount = async function (account, callback) {
let response
	try {
		response = await fetch("http://localhost:3000/accounts", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(account)
		})
	} catch (errors) {
		console.log('errors: ' + errors)
		callback(errors)
		return
	}
	let errors = []
	
	switch(response.status){
		case 200:
		break
		
		case 500:
		errors = ["username taken"]
		break
		
		default:
			displayError(response)
		
	}
	callback(errors, account)
}

//Delete account
module.exports.deleteAccount = async function (id, callback) {
	let response 
	try {
		response = await fetch("http://localhost:3000/accounts/" + id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		})
	} catch (errors) {
		console.log('errors: ' + errors)
		callback(errors)
		return
	}
	let errors = []
	
	switch(response.status){
		case 200:
		break
		
		case 500:
		errors = ["internal server error"]
		break
		
	}
	callback(errors)
}

//Update account
module.exports.updateAccount = async function (id, account, callback) {
	let errors = []
	try {
		await fetch("http://localhost:3000/accounts/" + id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(account)
		})
	} catch (errors) {
		callback(errors)
	}
	callback(errors)
}

//Get all posts
module.exports.getPosts = async function (callback) {
	let errors = []
	let posts = []

	try {
		const response = await fetch('http://localhost:3000/posts')
		posts = await response.json()
		console.log(posts)
	} catch (errors) {
		callback(errors)
		console.log(errors)
		return
	}
	callback(errors, posts)
}

//Get post by id
module.exports.getPostById = async function (id, callback) {
	let errors = []
	let post = ''

	try {
		const response = await fetch('http://localhost:3000/post/' + id)
		post = await response.json()
	} catch (errors) {
		callback(errors)
		console.log(errors)
		return
	}
	callback(errors, post)
}

//Get post by account id
module.exports.getPostsByAccountId = async function (accountId, callback) {
	let errors = []
	let posts = []

	try {
		const response = await fetch('http://localhost:3000/posts?accountId=' + accountId)
		posts = await response.json()
	} catch (errors) {
		callback(errors)
		console.log(errors)
		return
	}
	callback(errors, posts)
}

//Create post
module.exports.createPost = async function (post, callback) {
	let createdPost = ''
	let response 

	try {
		response = await fetch("http://localhost:3000/posts", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(post)
		})
	} catch (errors) {
		callback(errors)
		console.log(errors)
		return
	}

	let errors = []
	
	switch(response.status){
		case 200:
		break
		
		case 500:
		errors = ["post error"]
		break
		
		default:
			displayError(response)
		
	}
	callback(errors, post)
}

//Delete post
module.exports.deletePost = async function (id, callback) {
	let errors = []

	try {
		await fetch("http://localhost:3000/posts/" + id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		})
	} catch (errors) {
		callback(errors)
		return
	}
	callback(errors)
}

//Update post
module.exports.updatePost = async function (id, post, callback) {
	let errors = []
	try {
		await fetch("http://localhost:3000/posts/" + id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(post)
		})
	} catch (errors) {
		callback(errors)
	}
	callback(errors)
}