import React from 'react'
import { Trail } from 'react-spring'

class Words extends React.Component{
	render (){
		return (
			<Trail
				items={this.props.words}
				from={{transform:'translate(0,500px)'}}
				to={this.props.style}>
				{item=>props=>(
					<div style={props} className={'wordContainer'}>
						<span style={{fontSize:(this.props.fontSizeMult*item[1])+'em'}} >{item[0]}</span>
					</div>
					)
				}
			</Trail>
		)
	}
}

export default Words