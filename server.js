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

app.post('/withdraw',(req,res) =>{
	var from105
	var to105
	if (req.body.from30 =='ltc' && req.body.to30=='btc'){
		from105=ltc_apikey
		to105 = btc_apikey
	}
	else if (req.body.from30 =='btc' && req.body.to30=='ltc'){
		from105 = btc_apikey
		to105 = ltc_apikey
	}
	
	else if (req.body.from30 =='ltc' && req.body.to30=='doge'){
		from105=ltc_apikey
		to105 = doge_apikey
	}
	else if (req.body.from30 =='doge' && req.body.to30=='ltc'){
		from105=doge_apikey
		to105 = ltc_apikey
	}
	else if (req.body.from30 =='btc' && req.body.to30=='doge'){
		from105=btc_apikey
		to105 = doge_apikey
	}
	else if (req.body.from30 =='doge' && req.body.to30=='btc'){
		from105=doge_apikey
		to105 = btc_apikey
	}
	
		fetch(`https://block.io/api/v2/get_current_price/?api_key=${from105}&price_base=usd`).then(data2 => data2.json()).then(data => {
			fetch(`https://block.io/api/v2/get_current_price/?api_key=${to105}&price_base=usd`).then(data10 => data10.json()).then(data10 =>{
				var fees=0
				if (((final_amount)*(data.data.prices[0].price))<=1) {
					fees=0.25
				}
				else if (1<((final_amount)*(data.data.prices[0].price)) && ((final_amount)*(data.data.prices[0].price))<=10) {
					fees=0.50
				}
				else if (10<((final_amount)*(data.data.prices[0].price)) && ((final_amount)*(data.data.prices[0].price))<=100) {
					fees=2
				}
				else if (100<((final_amount)*(data.data.prices[0].price)) && ((final_amount)*(data.data.prices[0].price))<=1000) {
					fees=5
				}
				else if (1000<((final_amount)*(data.data.prices[0].price))) {
					fees=10
				}
				let final_amount2 = (((((req.body.amount)/100000000)*(data.data.prices[0].price))-(fees))/data10.data.prices[0].price)
				let final_amount=req.body.amount/100000000
				let ccy = req.body.to30
				let ccy2 = ccy.toUpperCase()
				console.log(ccy)
				console.log(ccy2)
				console.log(final_amount2)
				console.log(final_amount)
				let final_amount123=final_amount2
				console.log(final_amount123)
				poloneix.withdraw (ccy2,final_amount123, req.body.address, tag = undefined, params = {
					"currency": ccy2,
					"amount": final_amount123,
					"address":req.body.address 
				})
			})
		})


})
