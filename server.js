const express = require('express')
const app = express()
const BlockIo=require('block_io')
const cors = require('cors')
app.use(cors())
app.use(express.json())
let PORT = process.env.PORT
 
app.listen(PORT || 3000, ()=>{
	console.log(`App is running on ${PORT}`)
})
const ccxt = require('ccxt')

const poloneix = new ccxt.poloniex({
	'apiKey':'RX2DU0U7-3M5SPQKK-5K8QBKEL-ADIF7M5M',
	'secret':'97cc83f090097535fe2e1597f056eb8d76797f779d8632250d47116ba621cc41bf38c68a8efba683411e119f7d8343e21b5a2832c053c8e7513c835e766ab200'
})
const block_io_l = new BlockIo('e116-fd87-3361-95b3')
const block_io_b = new BlockIo('e67b-f21f-9576-e180')
const block_io_d = new BlockIo('b8e3-71d8-5b57-3e49')

const block_io_ltc = new BlockIo('e116-fd87-3361-95b3')
const block_io_btc = new BlockIo('e67b-f21f-9576-e180')
const block_io_doge = new BlockIo('b8e3-71d8-5b57-3e49')

var ltc_apikey='e116-fd87-3361-95b3'
var doge_apikey='b8e3-71d8-5b57-3e49'
var btc_apikey='e67b-f21f-9576-e180'


app.get('/', (req, res) => {
	res.send("Up and running")
})

app.get('/price', (req, res) => {
	fetch(`https://block.io/api/v2/get_current_price/?api_key=e116-fd87-3361-95b3&price_base=btc`).then(data10 =>data10.json()).then(data100 => {
		res.send({'price':`${data100.data.prices[0].price}`})
	})
})

app.post('/address', (req, res) => {
	var final1230 
    if (req.body.input=='LTC'){
		final1230=ltc_apikey
	}
	if (req.body.input=='BTC'){
		final1230=btc_apikey
	}
	if (req.body.input=='DOGE'){
		final1230=doge_apikey
	}
	async function getdp() {
		const value = await fetch(`https://block.io/api/v2/get_new_address/?api_key=${final1230}`)
		const value2=await value.json()
		return value2.data.address
	}
	getdp().then(data2 => res.send({'first2':`${data2}`}))
})

app.post('/withdrawltc',(req,res) =>{
	var final_amount=req.body.amount/100000000

	var final_amount3=0.01

	poloneix.withdraw ("LTC",`${final_amount3}`, `${req.body.address}`, tag = undefined, params = {
		"currency": "LTC",
		"amount": `${final_amount3}`,
		"address":`${req.body.address}`
	})
	
	res.send({'a':`you have sent ${final_amount} ${req.body.from30} Withdrawing ${req.body.to30} to ${req.body.address}`})

})


app.post('/withdrawbtc',(req,res) =>{
	var final_amount=req.body.amount/100000000
	
	res.send({'a':`you have sent ${final_amount} ${req.body.from30} Withdrawing ${req.body.to30} to ${req.body.address}`})
	
	
	poloneix.withdraw ("BTC",`${final_amount3}`, `${req.body.address}`, tag = undefined, params = {
		"currency": "BTC",
		"amount": `${final_amount3}`,
		"address":`${req.body.address}`
	})
	
})


app.post('/withdrawdoge',(req,res) =>{
	var final_amount=req.body.amount/100000000
	
	res.send({'a':`you have sent ${final_amount} ${req.body.from30} Withdrawing ${req.body.to30} to ${req.body.address}`})
	
	
	poloneix.withdraw ("DOGE",`${final_amount3}`, `${req.body.address}`, tag = undefined, params = {
		"currency": "DOGE",
		"amount": `${final_amount3}`,
		"address":`${req.body.address}`
	})
	
})
