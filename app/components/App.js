//include possessive forms of nouns (" 's ")
//turn threshold and font-size multiplier into functions that scale with size of text
//make shape of cloud more interesting?
//recognize patterns, like if two words always appear together
//export cloud

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadTextForm from './UploadTextForm'
import { Trail } from 'react-spring'
import Words from './Words.js'
console.log(Trail)



const easyExcludes=['I','i','a','an','the','in','inside','are','is','he','she','you','your','they','their',
'them','get','some','to','as','seems','two','too','of','or','more','me','like','with','have',"he's",'and','has','hes','at','but','by',
'about','at','back','before','were','what','when','who','on','something','said','mr','for','not','even','can','been','had','really',
'into','was','which','while','from','given','how','its','say','says','added','just','do','that','whether','could','we','out','we','his','she',
'her','hers','it','ours','anyone','such','be','only','other','our','other','if','would','this','any','all','per','off','on','much','got','did',
'so','lot','because','those','there','these','going','my','very','us','_','thing','up','didnt','still','ever','might','most','then',
'went','where']

function filterOutPunctuationAndMinorWords (text) {
	//let regex=/\.|\?|"|,|'|\*|’|-|“/
	let regex=/[\.\?",'\*’-“—]/
		let noPunctuation=text.split("").filter((e,i)=>!regex.test(e))
		let lowercased=[]
		noPunctuation.forEach(function(e){
				lowercased.push(e.toLowerCase())
		});
		let words=lowercased.join('').split(' ')
		words=words.filter(word=>easyExcludes.indexOf(word)===-1)
		words=words.sort();
		console.log('words length',words.length)
		return words
}

function findDuplicates(arr){
	let duplicates=[],count=1,index=-1;
		for (let i=0;i<arr.length;i++){
			if (arr[i]===arr[i+1]&&count===1){
				index++
				count++
				duplicates.push([arr[i],2])
			}else if(arr[i]===arr[i+1]&&count>1){
				count++
				duplicates[index][1]=count
			}else{
				count=1;
			}
		}
		return duplicates
}


class App extends React.Component {
	constructor(props){
		super(props);
		this.state={
			textInput:"",
			cloudComponents:[]
		}
		this.handleChange=this.handleChange.bind(this)
		this.handleSubmit=this.handleSubmit.bind(this)
	}


	handleSubmit(e){
		e.preventDefault()
		let text=this.state.textInput;
		let importantWords=filterOutPunctuationAndMinorWords(text);
		let duplicates=findDuplicates(importantWords);
		let threshold=2+Math.floor(importantWords.length/500)//the more text, the more repeated words, the bigger the cloud
		//'threshold' variable keeps cloud relatively small by setting the min # of reps to be included
		duplicates=duplicates.filter(e=>e[1]>threshold)
		//this.fetchRootWords(duplicates,0)
		this.generateCloud(duplicates)
	}

	addWordToCloudArray(arr){
		let words=this.state.words;
		words.push(arr)
		this.setState({
			words:words
		})
		
	}

	fetchRootWords(arr,index){
		let that=this,length=arr.length;
		console.log(arr,index)

		function makeSureItsNounOrVerbThenAddToCloudArray(data){
			if (data[0]==='err'){console.log('error',data[1])}
			if (data.results){
				let partOfSpeech=data.results[0].lexicalEntries[0].lexicalCategory;
				if(partOfSpeech==='Noun'||partOfSpeech==='Verb'){
					that.addWordToCloudArray([data.results[0].lexicalEntries[0].inflectionOf[0].text,arr[index][1]])
				}
			}
			if (index===length-1){
				that.generateCloud()
				return
			}else{
				that.fetchRootWords(arr,index+1)
				return
			}
		}
		//console.log(arr[index][0])
		/*console.log('called')
		let arr2=[]
		for (let j=0;j<arr.length;j++){
		console.log('for loop')*/
		let url='http://localhost:3000/request/'+arr[index][0]
		fetch(url,{
			headers:{
				"Accept":'application/json',
				'Content-Type':'application/json'
			}
		})
		.then(function(response){return response.json()})
		.then(json=>makeSureItsNounOrVerbThenAddToCloudArray(json))
		.catch(function(err){console.log(err)})
		//}
		//console.log('4')
		//this.setState({words:arr2})
	}

	generateCloud(arr){
		console.log('generating cloud',arr)
		let words=this.state.words;
		this.setState({
			cloudComponents:arr
			
		})
	}

	handleChange(e){
		this.setState({
			textInput:e.target.value
		})
	}

	render(){
		//set base font size multiplier so words that are repeated very often are not written too large
		const max=Math.max(...this.state.cloudComponents.map(e=>e[1]))
		const fontSizeMult=max>20?.2:max>15?.3:max>10?.4:.5

		return (
			<div className="container-fluid">
				<h1 className="text-center">Wordcloud Builder</h1>
				<div className="row mb-5">
					<UploadTextForm 
					 handleChange={this.handleChange}
					 inputValue={this.state.textInput}
					 handleSubmit={this.handleSubmit}/>
				</div>
				<div className='row'>
					<div 
					className='cloudContainer col-6 offset-md-3  clearfix'
					style={{minHeight:'300px'}}>
						<Words words={this.state.cloudComponents} fontSizeMult={fontSizeMult}/>
					</div>
				</div>
			</div>
		)
	}
}

export default App