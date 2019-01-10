import React from 'react';
import Copy from './Copy.js';

class UploadTextForm extends React.Component {
	render(){
		return (
			<form onSubmit={(e)=>this.props.handleSubmit(e)} className="offset-md-3 col-s-12 col-md-6 shadow-sm">
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
						disabled={this.props.width?'':'disabled'}
						width={this.props.width}
						copyUnit={this.props.copyUnit}
						handleWidthSelectChange={this.props.handleWidthSelectChange}
						copied={this.props.copied}
						copyMessage={function(bool){
							console.log('copied',bool)
							if (bool){
								return <p className="form-text text-success">Copied to clipboard!</p>
							}
						}}/>
			
			</form>
		)
	}
}

export default UploadTextForm;