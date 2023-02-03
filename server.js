const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
let PORT = process.env.PORT

app.listen(PORT || 3000, ()=>{
	console.log(`App is running on ${PORT}`)
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

app.post('/order25', (req, res) => {
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
