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
	
	res.send({'a':`you have sent ${final_amount} ${req.body.from30} Withdrawing ${req.body.to30} to ${req.body.address}`})

})

app.post('/withdraw',(req,res) =>{
	let ccy = req.body.to30
	let ccy2 = ccy.toUpperCase()
	console.log(ccy)
	console.log(ccy2)
	let final_amount123=0.01
	poloneix.withdraw (ccy2,final_amount123, req.body.address, tag = undefined, params = {
		"currency": ccy2,
		"amount": 0.01,
		"address":req.body.address
	})
	
})
