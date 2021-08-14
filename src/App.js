import './App.css';
import React, {useState,useEffect} from 'react';
import gear from '../src/Gear-0.2s-200px.gif';
import Form from './Components/form_component/form';
import List from './Components/list_component/list';
import SignInForm from './Components/sign_in_form_component/signin';
import SignUpForm from './Components/sign-up-form-component/signup';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from 'axios';


function App() {
//variables
const isLogin = localStorage.getItem("isLogIn");

//My states
const [postId,setPostId] = useState("");
const [input, setInput] = useState('');
const [data, setData] = useState([]);
const [signInClicked,setSignInClicked] = useState(false);
const [signIn, setSignIn] = useState(true);
const [user,setUser] = useState('');
const [password,setPassword] = useState('');
const [commentInput,setCommentInput] = useState('');


//normal Variables 
const myId = localStorage.getItem("myId");
const myName = localStorage.getItem("myName");

//useEffect
useEffect(() => {
getUser();
},[]);

//functions helper
const getUser = () => {
const getUserDetails = axios.get("https://test-api-node1.herokuapp.com/users");
getUserDetails.then(result => { 
const dataClone = [...data];
dataClone.push(result.data);
setData(dataClone);
});
getUserDetails.catch(err => {
throw err
});
}

const reloadPage = () => {
// eslint-disable-next-line no-restricted-globals
location.reload();
}

const storeTokenToStorage = (token) => {
localStorage.setItem('token',token);
}

const storeMyId = (id) => {
localStorage.setItem("myId",id);
}

const storeMyName = (name) => {
localStorage.setItem("myName",name);
}

const getTokenFromStorage = () => {
const token = localStorage.getItem('token');
return token
}

const alertHelper = (result,type) => {

const helper = (status,click,msg) => {
setTimeout(() => {
setSignInClicked(click);
setSignIn(status);
},1000);
setTimeout(() => {
alert(`${type} ${msg}`);
},1500);
}

console.log(result, type)

if (type === "Sign In" && result === "Successful") {
// eslint-disable-next-line no-restricted-globals
location.href = "https://vjmumar.github.io/mern-frontend/#/home";
} else if (type === "Sign Up" && result === "Successful") {
helper(false,false, "Successfully Please Sign In Now!");
} else if (type === "Sign In" && result === "User Not Found") {
helper(true,false,result);
} else if (type === "Sign Up" && result === "Failed") {
helper(false,false, 'Failed')
}
}

const checkUrlType = (type, result) => {
const signInIndex = type.indexOf("signIn");
if (signInIndex !== -1 && result === "Successful") {
localStorage.setItem("isLogIn", true);
}else {
localStorage.setItem("isLogIn", false);
}
}

const postAxiosLogInOut = (url,type) => {
const details = {
Username: user,
Password: password
}

const postDetails = axios.post(url, details);
postDetails.then(result => {
const data = result.data;
const token =  data.Token;
const status = data.Status;
const username  = data.myUsername;

storeTokenToStorage(token);
checkUrlType(url,status);
storeMyId(data.myId);
storeMyName(username)
alertHelper(status,type);
});
postDetails.catch(err => {
throw err
}) 

}

//Form Component Functions
const handleInputChange = (e) => {
const inputValue = e.target.value;
setInput(inputValue);
}

const addPost = () => {
const post = {
text: input,
userId: myId
}

const postText = axios.post("https://test-api-node1.herokuapp.com/post",post,{
headers: {
authorization: `Bearer ${getTokenFromStorage()}`
}
});

postText.then(() => {
reloadPage();
})
postText.catch((err) => {
throw err
})

}

const handleSubmitInput = (e) => {
e.preventDefault();
addPost();
}


//List Component Functions

const removePost = (postId) => {
const details = {
postId: postId
}
const url = "https://test-api-node1.herokuapp.com/post/del";

const postRemove = axios.post(url,details, {
headers: {
authorization: `Bearer ${getTokenFromStorage()}`
}
});

postRemove.then(() => {
reloadPage();
});

postRemove.catch((err) => {
throw err
})

}

const handleRemovePost = (postId) => {
removePost(postId)
}

const checkLikes = (post) => {
const findLike = post.likes.find(id => id === myId);
const postId = post._id;
if (findLike) {
updateLike(postId,"https://test-api-node1.herokuapp.com/post/likes/dec");
} else {
updateLike(postId, "https://test-api-node1.herokuapp.com/post/likes");
}
}

const updateLike = async (id, url) => {
const postDetails = {
postId: id,
likeId: myId
}

const postLikesBackEnd = axios.post(url,postDetails, {
headers: {
authorization: `Bearer ${getTokenFromStorage()}`
}});

postLikesBackEnd.then(() => {
reloadPage();
});
postLikesBackEnd.catch((err) => {
throw err
});
}


const handleLikes = (post) => {
checkLikes(post);
}


//log In functions
const switchBetweenForms = () => {
if (signIn === true && signInClicked === false) {
return <SignInForm
//functions
handleSignIn = {handleSignIn}
handleUserChange = {handleUserChange}
handlePasswordChange = {handlePasswordChange}
submitSignIn = {submitSignIn}
//states
user = {user}
password = {password}
/>
} else if(signIn === false && signInClicked === false) {
return  <SignUpForm
//functions
handleSignUp = {handleSignUp}
handleUserChange = {handleUserChange}
handlePasswordChange = {handlePasswordChange}
submitSignUp = {submitSignUp}
//states
user = {user}
password = {password}
/>
} else if (signInClicked === true) {
return <img className = "gear" src = {gear} />
}
}

//input handlers
const handleUserChange = (e) => {
const value = e.target.value;
setUser(value);
}

const handlePasswordChange = (e) => {
const value = e.target.value;
setPassword(value);
}

//sign in functions
const handleSignIn = (e) => {
e.preventDefault();
setSignIn(false);
switchBetweenForms();
}

const submitSignIn = (e) => {
e.preventDefault();
const url = 'https://test-api-node1.herokuapp.com/users/signIn';
postAxiosLogInOut(url,'Sign In');
setSignInClicked(true);
setSignIn(true);
}


//sign up function
const submitSignUp = (e) => {
e.preventDefault();
const url = 'https://test-api-node1.herokuapp.com/users/signUp';
postAxiosLogInOut(url,'Sign Up');
setSignInClicked(true);
setSignIn(false);
}

const handleSignUp = (e) => {
e.preventDefault();
setSignIn(true);
switchBetweenForms();
}


//comment box function
const getPostId = (postId) => {
setPostId(postId);
}

const handleCommentChange = (e) => {
setCommentInput(e.target.value);
}

const sendCommentToBackEnd = () => {
const details = {
name: myName,
postId: postId,
comment: commentInput
}
const url = 'https://test-api-node1.herokuapp.com/post/comments';
const sendComment = axios.post(url,details,{
headers: {
authorization: `Bearer ${getTokenFromStorage()}`
}
});
sendComment.then((result) => {
reloadPage();
});
sendComment.catch(err => {
throw err
})
}

const handleCommentSubmit = (e) => {
e.preventDefault();
sendCommentToBackEnd();
}

const deleteComment = (commentId,postId) => {
const url = 'https://test-api-node1.herokuapp.com/post/comments/del';
const details = {
postId: postId,
commentId: commentId
}
const deleteCommentAxios = axios.post(url,details);
deleteCommentAxios.then(() => {
reloadPage();
});
deleteCommentAxios.catch((err) => {
throw err
})

}

const handleDeleteComment = (commentId,postId) => {
deleteComment(commentId,postId)
}


//filter arrays handlers
const handleFilter  = (e) => {
const value = e.target.value;
let dataClone = [...data];
if (value === "yourPost") {
const filtered = dataClone[0].filter(i => i._id === myId);
dataClone = [filtered];
setData(dataClone)
} else {
getUser();
}
}

//logOut handlers
const logOut = () => {
localStorage.removeItem("isLogIn");
localStorage.removeItem("myId");
localStorage.removeItem("token");
localStorage.removeItem("myName");
// eslint-disable-next-line no-restricted-globals
reloadPage();
}

const handleLogOut = () => {
logOut();
}

  return (
    <Router>
    <div className="App">
    <Switch>
      <Route exact path = "/">
        <div className = "logIn_wrapper"> 
        {switchBetweenForms()}
        </div>
      </Route>
     
     <Route exact path = "/home">
     {
        isLogin === 'true' ?
        <div className = "home_wrapper">

        <div className = "userDetails">
        <h1 className = "username">{myName}</h1>
        <button onClick = {handleLogOut} className = "logOut">Log Out</button>
        </div>

        <Form
        //functions
        handleInputChange = {handleInputChange}
        handleSubmitInput = {handleSubmitInput}
        //states
        inputState = {input}
        />
        
        <List
        //functions
        handleLikes = {handleLikes}
        handleRemovePost = {handleRemovePost}
        handleCommentChange = {handleCommentChange}
        handleCommentSubmit = {handleCommentSubmit}
        getPostId = {getPostId}
        handleDeleteComment = {handleDeleteComment}
        handleFilter = {handleFilter}
        //states
        data = {data}
        postId = {postId}
        commentInput = {commentInput}
        />
       </div>
        :
        <Redirect to = "/" />
      }
     </Route>

      </Switch>
    </div>
    </Router>
  );
}

export default App;
