import React from 'react'
import { Trail } from 'react-spring'

class Words extends React.Component{
	render (){
		return (
			<Trail
				items={this.props.words}
				from={{transform:'translate(0,500px)',opacity:0}}
				to={{transform:"translate(0,0)",opacity:1}}>
				{item=>props=>(
					<div style={props} className={'wordContainer  mx-1 float-left'}>
						<span style={{fontSize:(this.props.fontSizeMult*item[1])+'em'}} >{item[0]}</span>
					</div>)
				}
			</Trail>
		)
	}
}

export default Words