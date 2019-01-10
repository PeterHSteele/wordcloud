import React from 'react';
import WidthInput from './WidthInput.js'
import WidthSelect from './WidthSelect'

class Copy extends React.Component {
	render(){
		
		let widths=this.props.copyUnit==='%'?[25,50,75,100]:[800,600,400,200]

		return this.props.show?(
			<div>
				<small id="copyHelpText" className="text-muted form-text">Add your wordcloud to your page. Select its width and click the button to copy its html to your clipboard.</small>
				<fieldset>
					<WidthSelect 
						handleWidthSelectChange={this.props.handleWidthSelectChange}/>
					<div className="form-group">
						{widths.map((e)=>{
							return (
								<WidthInput 
									width={e}
									checked={this.props.width==e}
									handleRadio={this.props.handleRadio}
									copyUnit={this.props.copyUnit}/>
							)
						})}
					</div>
				</fieldset>
				<button role='button' ariaDescribedby="copyHelpText" className={'btn btn-success mb-1 '+this.props.disabled} onClick={this.props.handleClick}>
						Copy Cloud
				</button>
				{this.props.copyMessage(this.props.copied)}
			</div>
		):null
	}
}

export default Copy;