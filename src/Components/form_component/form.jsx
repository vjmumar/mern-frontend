import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { IS_UPDATE_ACTION } from '../../Redux/actions/IS_UPDATE';
import css from '../form_component/form.css'

const Form = (props) => {
//props
const {inputState,handleInputChange,handleSubmitInput,handleFileChange} = props;
//dipatch
const dispatch = useDispatch();
//redux state
const isUpdate = useSelector(state => state.IS_UPDATE_REDUCER);
//function
const handleCancel = () => {
dispatch(IS_UPDATE_ACTION(false));
}

    return(
        <div class = "form_wrapper">
            <form className = "form_form" onSubmit = {handleSubmitInput}>
            <h1 className = "form_text">Post</h1>
          {
              isUpdate === false ? 
              <input
              type = "file"
              className = "form_input_file"
              placeholder = "Choose Image"
              onChange = {handleFileChange}
              />
              : ""
          }
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
            {
                isUpdate === true ?
                <button onClick = {handleCancel} className = "form_cancel">Cancel</button>
                : ''
            }
            </form>
        </div>
    )
}

export default Form;