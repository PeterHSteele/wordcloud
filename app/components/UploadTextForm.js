import React from 'react';
import Copy from './Copy.js';

class UploadTextForm extends React.Component {
	render(){
		return (
			<form onSubmit={(e)=>this.props.handleSubmit(e)} className="col-6 offset-md-3 shadow-sm">
				<div className='form-group'>
					<label htmlFor='uploadText'>Paste some text below:</label>
					<textarea 
						id="uploadText" 
						className="form-control" 
						rows='5' 
						onChange={(e)=>this.props.handleChange(e)} 
						value={this.props.inputValue}>
					</textarea>
				</div>
				
				<input type="submit" className="btn btn-primary mb-2" value='Generate Cloud'/>

				<Copy 
						show={this.props.showCopyButton} 
						handleClick={this.props.handleCopyButtonClick}
						handleRadio={this.props.handleRadio}
						disabled={this.props.width?'dummy':'disabled'}
						width={this.props.width}
						copyUnit={this.props.copyUnit}
						handleWidthSelectChange={this.props.handleWidthSelectChange}/>
			
			</form>
		)
	}
}

export default UploadTextForm;