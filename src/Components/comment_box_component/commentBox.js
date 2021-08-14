import React from 'react';
import '../comment_box_component/commentBox.css';

const CommentBox = (props) => {
//props
const {commentInput,handleCommentChange,commentsArray,handleCommentSubmit,handleDeleteComment,postId} = props;
const myId = localStorage.getItem("myId")

//functions
const appendDeleteButton = (id,commentId) => {
if (id === myId) {
return <button onClick = {handleDeleteComment.bind(this,commentId,postId)} className = "comment_delete">Delete</button>
}
}

return (
<div className = "comment_wrapper">
<div className = "comment_box">

<div className = "comment_comments">
<ul>
{
commentsArray.map((comment,index) => (
<li key = {index} className = "comment_list">
{
appendDeleteButton(comment.belongsTo,comment._id)
}
<h4 className = "comment_name">{comment.name}</h4>
<p className = "comment_text">{comment.text}</p>
</li>
))
}
</ul>
</div>

<div className = "comment_form">
<form>
<input
type = "text"
placeholder = "Type Comment Here"
value = {commentInput}
onChange = {handleCommentChange}
/>
<button onClick = {handleCommentSubmit} className = "comment_submit">Comment</button>
</form>
</div>
</div>
</div>
)
}

export default CommentBox