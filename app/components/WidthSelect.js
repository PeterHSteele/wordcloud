import React from 'react';

function WidthSelect (props){
	return (
		<div className="form-group">
			<label htmlFor="widthSelect">Unit of Width</label>
			<select className="form-control" onChange={(e)=>props.handleWidthSelectChange(e)} type="select">	
				<option>%</option>
				<option>px</option>
			</select>
		</div>
	)
}

export default WidthSelect;