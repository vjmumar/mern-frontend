import './App.css';
import React, {useState,useEffect} from 'react';
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
if (type === "Sign In" && result === "Successful") {
// eslint-disable-next-line no-restricted-globals
location.href = "http://localhost:3000/home";
} else if (type === "Sign Up" && result === "Successful") {
alert(`${type} Successfully`);
} else {
alert(`${type} Failed`);
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
if (signIn === true) {
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
} else if(signIn === false) {
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
}


//sign up function
const submitSignUp = (e) => {
e.preventDefault();
const url = 'https://test-api-node1.herokuapp.com/users/signUp';
postAxiosLogInOut(url,'Sign Up');
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

  return (
    <Router>
    <div className="App">
    <h1 className = "username">{myName}</h1>
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
