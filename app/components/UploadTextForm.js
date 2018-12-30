import React from 'react';

class UploadTextForm extends React.Component {
	render(){
		return (
			<form onSubmit={(e)=>this.props.handleSubmit(e)} className="col-6 offset-md-3">
				<div className='form-group'>
					<label htmlFor='uploadText'>Paste some text below:</label>
					<textarea id="uploadText" className="form-control" rows='5' onChange={(e)=>this.props.handleChange(e)} value={this.props.inputValue}></textarea>
				</div>
				<input type="submit" className="btn btn-primary" value='Generate Cloud'/>
			</form>
		)
	}
}

export default UploadTextForm;