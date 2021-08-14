import React from 'react';
import '../sign_in_form_component/signin.css';

const SignInForm = (props) => {
const {handleSignIn,handleUserChange,handlePasswordChange,submitSignIn,user,password} = props;
return(
<div>
<form className = "signIn_form">
<h2 className = "signIn_text">Sign In</h2>
<input className = "signIn_userInput"
onChange = {handleUserChange}
value = {user}
type = "text"
placeholder = "Username"
/>
<input className = "signIn_passwordInput"
onChange = {handlePasswordChange}
value = {password}
type = "password"
placeholder = "Password"
/>
<button 
onClick = {submitSignIn}
className = "signIn_submit">Submit</button>
<a
onClick = {handleSignIn}
className = "signIn_signUpLabel"
>SignUp</a>
</form>
</div>
)
}

export default SignInForm;