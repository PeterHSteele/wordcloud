const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const reqProm=require('request-promise')
import dotenv from 'dotenv';
const env = dotenv.config()

const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.route("/request/:word")
	.get(function(req,res){
		console.log(req.params.word)
		let url='https://od-api.oxforddictionaries.com/api/v1/inflections/en/'+req.params.word
		let options={
			uri:url,
			headers:{
				'User-Agent':'Request-Promise',
				'app_id':process.env.KEY,
				'app_key':process.env.ID,
			},
			json:true
		}
		reqProm(options)
		.then(function(json){
			res.send(json)
		})
		.catch(function(err){
			res.json(['err',req.params.word,err])
		})
	})

app.listen(3000,function(){
	console.log('app is listening')
})