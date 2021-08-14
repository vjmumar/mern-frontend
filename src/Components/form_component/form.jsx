import React from 'react';
import css from '../form_component/form.css'

const Form = (props) => {
const {inputState,handleInputChange,handleSubmitInput} = props;
    return(
        <div>
            <form className = "form_form" onSubmit = {handleSubmitInput}>
            <h1 className = "form_text">Post</h1>
            <input 
            className = "form_input"
            type="text"
            placeholder = "Post"
            value = {inputState}
            onChange = {handleInputChange}
            />
            <button
            className = "form_submit" 
            onClick = {handleSubmitInput}>
            Submit
            </button>
            </form>
        </div>
    )
}

export default Form;