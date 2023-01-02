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

const okx= new ccxt.okx({
	'apiKey':'90c20bee-efbc-45c2-84e4-56b3d6bd0ae1',
	'secret':'1AAE0C5188FF6FEC75074F729422FB26',
	'password':'t3_AZSXDCFV'
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


app.post('/address_bnb', (req, res) => {

            fetch(`https://coinremitter.com/api/v3/BNB/get-new-address`,{
			method: 'POST',
			headers:{'Content-type':'application/json'},
			body: JSON.stringify({
				'api_key':'$2y$10$oRlxF0tWjZIouPjiXx1Ileqnv8qT1jm7vIXoQuxbvT8LEP2dgrsoy',
				'password':'t3_AZSXDCFV'
			})
			
		}).then(data10 => data10.json()).then(data20 => {
			res.send({'address_bnb':`${data20.data.address}`})
		})
	
})

app.post('/address_dash', (req, res) => {
	
	fetch(`https://coinremitter.com/api/v3/DASH/get-new-address`,{
		method: 'POST',
	   headers:{'Content-type':'application/json'},
	   body: JSON.stringify({
		   'api_key':'$2y$10$OqmV/hIIbvmyO//I7pjX/OQVjBDuOuDc2Zy08yA5h7hJHQGIz5M4G',
		   'password':'t3_AZSXDCFV'
	   })
	   
	}).then(data10 => data10.json()).then(data20 => {
		res.send({'address_dash':`${data20.data.address}`})
	})
	
})


app.post('/address_dot', (req, res) => {
	
	async function getdp() {
		const value = await okx.fetchDepositAddress('DOT',params = {
			'ccy':'DOT',
			'password':'t3_AZSXDCFV'
		})
		const value2=await value
		console.log(value2)
		return value2.address
	}
	getdp().then(data2 => res.send({'dot':`${data2}`}))
	
})


app.post('/address_bch', (req, res) => {
	
	fetch(`https://coinremitter.com/api/v3/BCH/get-new-address`,{
		method: 'POST',
	   headers:{'Content-type':'application/json'},
	   body: JSON.stringify({
		   'api_key':'$2y$10$KklbdSLdugTjQtJpxA0iQOrd8NJqK28jbDyFqLtFyEdGEWk93JK16',
		   'password':'t3_AZSXDCFV'
	   })
	   
	}).then(data10 => data10.json()).then(data20 => {
		res.send({'address_bch':`${data20.data.address}`})
	})
	
})

app.post('/address_xmr', (req, res) => {
	
	fetch(`https://agoradesk.com/api/v1/wallet-addr/XMR`,{
		method: 'get',
	   headers:{'Content-type':'application/json',
'Authorization':'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTTDEyMyIsImNyZWF0ZWQiOjE2NzA0MTkwMTEwODcsImFwaSI6InB1YmxpYyIsImV4cCI6MTgyODIwNzAxMSwianRpIjoiMDNhMjhjMmMtNDI2Ny00MzRkLTkxMDUtOWZlMjRkNDlmYTQxIn0.sV1n36RAcfP3UVHQbKhGF2uOxDIJYuv0CPaHmSTKYzivBl9pxNYpDX3DUZLJYafNuUiB5U-vSRxkNBhlYQiGYQ'
	}
	}).then(data10 => data10.json()).then(data20 => {
		res.send({'address_xmr':`${data20.data.address}`})
	})
	
})

app.get('/balance_xmr', (req, res) => {
	
	fetch(`https://agoradesk.com/api/v1/wallet-balance/XMR`,{
		method: 'get',
	   headers:{'Content-type':'application/json',
		   'Authorization':'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTTDEyMyIsImNyZWF0ZWQiOjE2NzA0MTkwMTEwODcsImFwaSI6InB1YmxpYyIsImV4cCI6MTgyODIwNzAxMSwianRpIjoiMDNhMjhjMmMtNDI2Ny00MzRkLTkxMDUtOWZlMjRkNDlmYTQxIn0.sV1n36RAcfP3UVHQbKhGF2uOxDIJYuv0CPaHmSTKYzivBl9pxNYpDX3DUZLJYafNuUiB5U-vSRxkNBhlYQiGYQ'
	   }
	}).then(data10 => data10.json()).then(data20 => {
		res.send({'xmr_b':`${data20.data.total.balance}`})
	})
	
})

app.get('/address_xmr2', (req, res) => {
	
	fetch(`https://agoradesk.com/api/v1/wallet-balance/XMR`,{
		method: 'GET',
	   headers: {
		   'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTTDEyMyIsImNyZWF0ZWQiOjE2NzA0MTkwMTEwODcsImFwaSI6InB1YmxpYyIsImV4cCI6MTgyODIwNzAxMSwianRpIjoiMDNhMjhjMmMtNDI2Ny00MzRkLTkxMDUtOWZlMjRkNDlmYTQxIn0.sV1n36RAcfP3UVHQbKhGF2uOxDIJYuv0CPaHmSTKYzivBl9pxNYpDX3DUZLJYafNuUiB5U-vSRxkNBhlYQiGYQ',
	   },
	}).then(data10 => data10.json()).then(data20 => {
		res.send({'balance_monero':`${data20.data.total.balance}`})
	})
	
})

app.post('/get_fees',(req,res)=>{
	
	var final_amount3 = (req.body.amount)
	
	if (req.body.from30 =='ltc' && req.body.to30=='doge'){
		from105=ltc_apikey
		to105 = doge_apikey
		
		fetch(`https://block.io/api/v2/get_current_price/?api_key=${from105}&price_base=usd`).then(data2 => data2.json()).then(data => {
			fetch(`https://block.io/api/v2/get_current_price/?api_key=${to105}&price_base=usd`).then(data10 => data10.json()).then(data10 =>{
				var fees=0
				if (((final_amount3)*(data.data.prices[0].price))<=1) {
					fees=0.25
				}
				else if (1<((final_amount3)*(data.data.prices[0].price)) && ((final_amount3)*(data.data.prices[0].price))<=10) {
					fees=0.50
				}
				else if (10<((final_amount3)*(data.data.prices[0].price)) && ((final_amount3)*(data.data.prices[0].price))<=100) {
					fees=2
				}
				else if (100<((final_amount3)*(data.data.prices[0].price)) && ((final_amount3)*(data.data.prices[0].price))<=1000) {
					fees=5
				}
				else if (1000<((final_amount3)*(data.data.prices[0].price))) {
					fees=10
				}
				
				res.send({'fees':`${fees}`})
				
			})
			
	}
	if (req.body.from30 =='btc' && req.body.to30=='doge'){
		
		from105=btc_apikey
		to105 = doge_apikey
		
		fetch(`https://block.io/api/v2/get_current_price/?api_key=${from105}&price_base=usd`).then(data2 => data2.json()).then(data => {
			fetch(`https://block.io/api/v2/get_current_price/?api_key=${to105}&price_base=usd`).then(data10 => data10.json()).then(data10 =>{
				var fees=0
				if (((final_amount3)*(data.data.prices[0].price))<=1) {
					fees=0.25
				}
				else if (1<((final_amount3)*(data.data.prices[0].price)) && ((final_amount3)*(data.data.prices[0].price))<=10) {
					fees=0.50
				}
				else if (10<((final_amount3)*(data.data.prices[0].price)) && ((final_amount3)*(data.data.prices[0].price))<=100) {
					fees=2
				}
				else if (100<((final_amount3)*(data.data.prices[0].price)) && ((final_amount3)*(data.data.prices[0].price))<=1000) {
					fees=5
				}
				else if (1000<((final_amount3)*(data.data.prices[0].price))) {
					fees=10
				}
				
				res.send({'fees':`${fees}`})
				
			})
	}


	
})})

app.post('/withdraw',(req,res) =>{
	var final_amount=req.body.amount/100000000
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

    if(req.body.to30=='btc'){
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
				var final_amount2 = ((((final_amount)*(data.data.prices[0].price))-(fees))/data10.data.prices[0].price)
				var final_amount3=final_amount2.toFixed(5)
				async function first500() {
					const fees = await block_io_b.get_network_fee_estimate({ amounts: `${final_amount3}`, to_addresses: `${req.body.address}`});
					const first20 = await block_io_b.prepare_transaction({amounts:`${final_amount3}`, to_addresses:`${req.body.address}`,priority: 'custom', custom_network_fee: `${fees.data.estimated_min_custom_network_fee}`})
					const first30 = await block_io_b.create_and_sign_transaction({data:first20 , pin : 'alskdjfasdf2342134'})
					const first40 = await block_io_b.submit_transaction({transaction_data:first30})
				}
				first500()

		})
	})
}

	if(req.body.to30=='ltc'){
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
			var final_amount2 = ((((final_amount)*(data.data.prices[0].price))-(fees))/data10.data.prices[0].price)
			var final_amount3=final_amount2.toFixed(5)
			async function first500() {
				const first20 = await block_io_l.prepare_transaction({amounts:`${final_amount3}`, to_addresses:`${req.body.address}`,priority: 'low'})
				const first30 = await block_io_l.create_and_sign_transaction({data:first20 , pin : 'alskdjfasdf2342134'})
				const first40 = await block_io_l.submit_transaction({transaction_data:first30})
			}
			first500()
			
		})
	})
	}
	
	if(req.body.to30=='doge'){
		
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
			var final_amount2 = ((((final_amount)*(data.data.prices[0].price))-(fees))/data10.data.prices[0].price)
			var final_amount3=final_amount2.toFixed(5)
			async function first500() {
				const first20 = await block_io_d.prepare_transaction({amounts:`${final_amount3}`, to_addresses:`${req.body.address}`,priority: 'low'})
				const first30 = await block_io_d.create_and_sign_transaction({data:first20 , pin : 'alskdjfasdf2342134'})
				const first40 = await block_io_d.submit_transaction({transaction_data:first30})
			}
			first500()
			
		})
	})
	
	}

})

app.post('/withdraw_xmr',(req,res)=>{
	
	var xmr_input=req.body.amount
	if(req.body.to30=='btc'){
		fetch(`https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=btc`).then(data10 => data10.json()).then(data10 =>{
				var fees=0
				if (((xmr_input)*(data10.monero.btc))<=0.000060) {
					fees=0.000030
				}
				else if (0.000060<((xmr_input)*(data10.monero.btc)) && ((xmr_input)*(data10.monero.btc))<=0.00060) {
					fees=0.000060
				}
				else if (0.000060<((xmr_input)*(data10.monero.btc)) && ((xmr_input)*(data10.monero.btc))<=0.006) {
					fees=0.0002
				}
				else if (0.000060<((xmr_input)*(data10.monero.btc)) && ((xmr_input)*(data10.monero.btc))<=0.06) {
					fees=0.00030
				}
				else if (0.06<((xmr_input)*(data10.monero.btc))) {
					fees=0.001
				}
				let final_amount31 = ((xmr_input)*(data10.monero.btc))-fees
				async function first500() {
					const fees = await block_io_b.get_network_fee_estimate({ amounts: `${final_amount31}`, to_addresses: `${req.body.address}`});
					const first20 = await block_io_b.prepare_transaction({amounts:`${final_amount31}`, to_addresses:`${req.body.address}`,priority: 'custom', custom_network_fee: `${fees.data.estimated_min_custom_network_fee}`})
					const first30 = await block_io_b.create_and_sign_transaction({data:first20 , pin : 'alskdjfasdf2342134'})
					const first40 = await block_io_b.submit_transaction({transaction_data:first30})
				}
				first500()
				
			})
	}

	
	if(req.body.to30=='ltc'){
		fetch(`https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=ltc`).then(data10 => data10.json()).then(data10 =>{
			var fees=0
			if (((xmr_input)*(data10.monero.ltc))<=0.013) {
				fees=0.0033
			}
			else if (0.013<((xmr_input)*(data10.monero.ltc)) && ((xmr_input)*(data10.monero.ltc))<=0.13) {
				fees=0.0066
			}
			else if (0.13<((xmr_input)*(data10.monero.ltc)) && ((xmr_input)*(data10.monero.ltc))<=1.33) {
				fees=0.015
			}
			else if (1.33<((xmr_input)*(data10.monero.ltc)) && ((xmr_input)*(data10.monero.ltc))<=13.27) {
				fees=0.03
			}
			else if (13.27<((xmr_input)*(data10.monero.ltc))) {
				fees=0.065
			}
			let final_amount27 = ((xmr_input)*(data10.monero.ltc))-fees
			async function first500() {
				const first20 = await block_io_l.prepare_transaction({amounts:`${final_amount27}`, to_addresses:`${req.body.address}`,priority: 'low'})
				const first30 = await block_io_l.create_and_sign_transaction({data:first20 , pin : 'alskdjfasdf2342134'})
				const first40 = await block_io_l.submit_transaction({transaction_data:first30})
			}
			first500()
			
		})
	}

})


app.post('/txn',(req,res)=>{
	
	if(req.body.to58=='ltc'){
	async function first501() {
		const first20 = await block_io_ltc.get_transactions({ type: 'sent', before_tx: '' })
		res.send({'txid':`${first20.data.txs[0].txid}`})
	}
	first501()
	}
	
	
	if(req.body.to58=='btc'){
		async function first501() {
			const first20 = await block_io_btc.get_transactions({ type: 'sent', before_tx: '' })
			res.send({'txid':`${first20.data.txs[0].txid}`})
		}
		first501()
	}
	
	if(req.body.to58=='doge'){
		async function first501() {
			const first20 = await block_io_doge.get_transactions({ type: 'sent', before_tx: '' })
			res.send({'txid':`${first20.data.txs[0].txid}`})
		}
		first501()
	}
})

app.post('/withdraw_bnb',(req,res)=>{
	
	var first_bnb=req.body.amount
	var bnb_input=(first_bnb/1000000000000000)

	if(req.body.to30=='btc'){
		fetch(`https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=btc`).then(data10 => data10.json()).then(data10 =>{
			var fees=0
			if (((bnb_input)*(data10.binancecoin.btc))<=0.000060) {
				fees=0.000030
			}
			else if (0.000060<((bnb_input)*(data10.binancecoin.btc)) && ((bnb_input)*(data10.binancecoin.btc))<=0.00060) {
				fees=0.000060
			}
			else if (0.000060<((bnb_input)*(data10.binancecoin.btc)) && ((bnb_input)*(data10.binancecoin.btc))<=0.006) {
				fees=0.0002
			}
			else if (0.000060<((bnb_input)*(data10.binancecoin.btc)) && ((bnb_input)*(data10.binancecoin.btc))<=0.06) {
				fees=0.00030
			}
			else if (0.06<((bnb_input)*(data10.monero.btc))) {
				fees=0.001
			}
			let final_amount27 = ((bnb_input)*(data10.binanceoin.btc))-fees
			async function first500() {
				const fees = await block_io_b.get_network_fee_estimate({ amounts: `${final_amount31}`, to_addresses: `${req.body.address}`});
				const first20 = await block_io_b.prepare_transaction({amounts:`${final_amount31}`, to_addresses:`${req.body.address}`,priority: 'custom', custom_network_fee: `${fees.data.estimated_min_custom_network_fee}`})
				const first30 = await block_io_b.create_and_sign_transaction({data:first20 , pin : 'alskdjfasdf2342134'})
				const first40 = await block_io_b.submit_transaction({transaction_data:first30})
			}
			first500()
			
		})
	}

	if(req.body.to30=='ltc'){
		fetch(`https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=ltc`).then(data10 => data10.json()).then(data10 =>{
			var fees=0
			if (((bnb_input)*(data10.binancecoin.ltc))<=0.013) {
				fees=0.0033
			}
			else if (0.013<((bnb_input)*(data10.binancecoin.ltc)) && ((bnb_input)*(data10.binancecoin.ltc))<=0.13) {
				fees=0.0066
			}
			else if (0.13<((bnb_input)*(data10.binancecoin.ltc)) && ((bnb_input)*(data10.binancecoin.ltc))<=1.33) {
				fees=0.015
			}
			else if (1.33<((bnb_input)*(data10.binancecoin.ltc)) && ((bnb_input)*(data10.binancecoin.ltc))<=13.27) {
				fees=0.03
			}
			else if (13.27<((xmr_input)*(data10.monero.ltc))) {
				fees=0.065
			}
			let final_amount27 = ((xmr_input)*(data10.monero.ltc))-fees
			async function first500() {
				const first20 = await block_io_l.prepare_transaction({amounts:`${final_amount27}`, to_addresses:`${req.body.address}`,priority: 'low'})
				const first30 = await block_io_l.create_and_sign_transaction({data:first20 , pin : 'alskdjfasdf2342134'})
				const first40 = await block_io_l.submit_transaction({transaction_data:first30})
			}
			first500()
			
		})
	}
	
})


app.post('/withdraw_bch',(req,res)=>{
	
	var first_bch=req.body.amount
	var bch_input=(first_bch/100000000)
	
	if(req.body.to30=='btc'){
		fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-cash&vs_currencies=btc`).then(data10 => data10.json()).then(data10 =>{
			var fees=0
			if (((bch_input)*(data10["bitcoin-cash"].btc))<=0.000060) {
				fees=0.000030
			}
			else if (0.000060<((bch_input)*(data10["bitcoin-cash"].btc)) && ((bch_input)*(data10["bitcoin-cash"].btc))<=0.00060) {
				fees=0.000060
			}
			else if (0.000060<((bch_input)*(data10["bitcoin-cash"].btc)) && ((bch_input)*(data10["bitcoin-cash"].btc))<=0.006) {
				fees=0.0002
			}
			else if (0.000060<((bch_input)*(data10["bitcoin-cash"].btc)) && ((bch_input)*(data10["bitcoin-cash"].btc))<=0.06) {
				fees=0.00030
			}
			else if (0.06<((bch_input)*(data10["bitcoin-cash"].btc))) {
				fees=0.001
			}
			let final_amount27 = ((bch_input)*(data10["bitcoin-cash"].btc))-fees
			async function first500() {
				const fees = await block_io_b.get_network_fee_estimate({ amounts: `${final_amount31}`, to_addresses: `${req.body.address}`});
				const first20 = await block_io_b.prepare_transaction({amounts:`${final_amount31}`, to_addresses:`${req.body.address}`,priority: 'custom', custom_network_fee: `${fees.data.estimated_min_custom_network_fee}`})
				const first30 = await block_io_b.create_and_sign_transaction({data:first20 , pin : 'alskdjfasdf2342134'})
				const first40 = await block_io_b.submit_transaction({transaction_data:first30})
			}
			first500()
			
		})
	}
	
	if(req.body.to30=='ltc'){
		fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-cash&vs_currencies=ltc`).then(data10 => data10.json()).then(data10 =>{
			var fees=0
			if (((bch_input)*(data10["bitcoin-cash"].ltc))<=0.013) {
				fees=0.0033
			}
			else if (0.013<((bch_input)*(data10["bitcoin-cash"].ltc)) && ((bch_input)*(data10["bitcoin-cash"].ltc))<=0.13) {
				fees=0.0066
			}
			else if (0.13<((bch_input)*(data10["bitcoin-cash"].ltc)) && ((bch_input)*(data10["bitcoin-cash"].ltc))<=1.33) {
				fees=0.015
			}
			else if (1.33<((bch_input)*(data10["bitcoin-cash"].ltc)) && ((bch_input)*(data10["bitcoin-cash"].ltc))<=13.27) {
				fees=0.03
			}
			else if (13.27<((bch_input)*(data10["bitcoin-cash"].ltc))) {
				fees=0.065
			}
			let final_amount27 = ((bch_input)*(data10["bitcoin-cash"].ltc))-fees
			async function first500() {
				const first20 = await block_io_l.prepare_transaction({amounts:`${final_amount27}`, to_addresses:`${req.body.address}`,priority: 'low'})
				const first30 = await block_io_l.create_and_sign_transaction({data:first20 , pin : 'alskdjfasdf2342134'})
				const first40 = await block_io_l.submit_transaction({transaction_data:first30})
			}
			first500()
			
		})
	}
	
})
