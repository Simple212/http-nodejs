const express = require('express')
const app = express()
const cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcrypt-nodejs')

const db = require('knex')({
	client: 'pg',
	connection: {
		host : 'satao.db.elephantsql.com',
		user : 'iixcuzpe',
		password : 'wyuiI0ydOOdsgqeS2Vn3SpOUirOzIqz_',
		database : 'iixcuzpe'
	}
}); 
app.use(cors())
app.use(express.json())

app.listen(process.env.PORT|| 3001, () => {
	console.log(`App is running on ${process.env.PORT}`)
})

app.get('/', (req, res) => {
	res.send("Up and running")
})

app.post('/price25', (req, res) => {
	async function getdp23() {
		const rate1 = await fetch(`https://sideshift.ai/api/v2/pair/${req.body.from}/${req.body.to}`);
		const rate2 = await rate1.json() 
		return rate2.rate
	}
	getdp23().then(data2 => res.send({'rate3':`${data2}`}))
})

app.post('/id/:order_id', (req, res) => {
	
	const {order_id} = req.params
	
	async function getdp23() {
		const shift1 = await fetch(`https://sideshift.ai/api/v2/shifts/${order_id}`);
		const shift2 = await shift1.json()
		return shift2
	}
	
	getdp23().then(data2 => {
		const {id,depositCoin,createdAt,settleCoin,depositAddress,settleAddress,status,type} = data2
		res.send({
			'id':`${id}`,
		   'depositCoin':`${depositCoin}`,
		   'createdAt':`${createdAt}`,
		   'settleCoin':`${settleCoin}`,
		   'depositAddress':`${depositAddress}`,
		   'settleAddress':`${settleAddress}`,
			'status':`${status}`,
		   'type':`${type}`
		})
	})
	
})

app.post('/order25', (req, res) => {
	console.log(req.body.address)
	console.log(req.body.from)
	console.log(req.body.to)
	async function getdp23() {
		const shift = await fetch(`https://sideshift.ai/api/v2/shifts/variable`,{
			'method':'post',
			'headers':{'Content-type':'application/json'},
			'body': JSON.stringify({
				"settleAddress": `${req.body.address}`,
				"affiliateId": "NpecndnG94",
				"depositCoin": `${req.body.from}`,
				"settleCoin": `${req.body.to}`,
				"commissionRate": "0.005"
			})
		})
		const shift2 = await  shift.json()
		const address_to_send = 
		res.send({'address':`${shift2.depositAddress}`,'id':`${shift2.id}`})
}
getdp23()
})


app.post('/signup', (req, res) => {
	const {profile_id,email,password} = req.body
	const hashed_password = bcrypt.hashSync(password);
	db('users').insert({
		
		profile_id:profile_id,
		email:email,
		hashp : hashed_password
		
	}).then(console.log)
})
/*
app.post('/signin', (req, res) => {
	const {profile_id,email,password} = req.body
	const hashed_password = bcrypt.hashSync(password);
	db('users').insert({
		
		profile_id:profile_id,
		email:email,
		hashp : hashed_password
		
	}).then(console.log)
})*/

