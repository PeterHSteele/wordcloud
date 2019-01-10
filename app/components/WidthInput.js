import React from 'react';

function WidthInput (props){
	return (
		<div className="form-check form-check-inline">
			<input className="form-check-input" checked={props.checked} onChange={(e)=>props.handleRadio(e)} type="radio" name={props.width} id={'width'+props.width}/>
			<label htmlFor={'width'+props.width} className="pt-2">{props.width+props.copyUnit}</label>
		</div>
	)
}

export default WidthInput;