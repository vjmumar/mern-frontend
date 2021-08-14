import React from 'react';
import '../sign-up-form-component/signup.css';

const SignUpForm = (props) => {
const {handleSignUp,handleUserChange,handlePasswordChange,submitSignUp,user,password} = props;
return(
<div>
<form className = "signUp_form">
<h2 className = "signUp_text">Sign Up</h2>
<input className = "signUp_userInput"
value = {user}
onChange = {handleUserChange}
type = "text"
placeholder = "Username"
/>
<input className = "signUp_passwordInput"
value = {password}
onChange = {handlePasswordChange}
type = "password"
placeholder = "Password"
/>
<button
onClick = {submitSignUp}
className = "signUp_submit">Submit</button>
<a 
onClick = {handleSignUp}
className = "signUp_signUpLabel">SignIn</a>
</form>
</div>
)
}

export default SignUpForm;