import React, { useState } from "react";
import { useSelector } from "react-redux";
import CommentBox from "../comment_box_component/commentBox";
import css from "../list_component/list.css";

const List = (props) => {
	//props
	const { data, handleLikes, handleRemovePost, getPostId, postId, handleFilter } = props;

	//comments prop
	const { commentInput, handleCommentChange, handleCommentSubmit, handleDeleteComment } = props;

	//variables
	const myId = useSelector(state =>  state.GET_USER_ID);
    const userData = useSelector((state) => state.GET_DATA_REDUCER);

	//states
	const [commentBoxId, setCommentBoxId] = useState("");
	const [commentsArray, setCommentsArray] = useState([]);

	//functions
	const likeButton = (likeArray, post, details) => {
		let text;
		const findMyId = likeArray.find((id) => id === myId);
		if (findMyId !== undefined) {
			text = "UnLike";
		} else {
			text = "Like";
		}
		return (
			<button onClick={handleLikes.bind(this, post, details)} className="list_postLike">
				{text} {likeArray.length}
			</button>
		);
	};

	const deletePostButton = (post) => {
		if (post.belongsTo === myId) {
			return (
				<button onClick={handleRemovePost.bind(this, post._id)} className="list_removePost">
					Delete
				</button>
			);
		}
	};

	const showCommentOnSpecificPost = (post) => {
		getPostId(post._id);
		setCommentBoxId(post._id);
		setCommentsArray(commentsArray.splice(0, commentsArray.length));
		setCommentsArray(commentsArray.concat(post.comments));
	};

	const appendTheCommentBox = (post) => {
		if (post._id === commentBoxId) {
			return (
				<CommentBox
					//functions
					handleCommentChange={handleCommentChange}
					handleCommentSubmit={handleCommentSubmit}
					handleDeleteComment={handleDeleteComment}
					postId={postId}
					//states
					commentInput={commentInput}
					commentsArray={commentsArray}
				/>
			);
		}
	};

	return (
		<div className="list_wrapper">
			<div className="list_filter">
				<select onChange={handleFilter}>
					<option value="allPost">All Post</option>
					<option value="yourPost">Your Post</option>
				</select>
			</div>
			<ul className="list_ul">
				{userData.map((details, index) =>
					details.Post.map((post) =>
                        <li className="list_li" key={post._id}>
                            <div className="list_item">
                                {deletePostButton(post)}
                                <h3 className="list_postName">{details.Username}</h3>
                                <p className="list_postText">{post.text}</p>
                                {likeButton(post.likes, post, details)}
                                <p onClick={showCommentOnSpecificPost.bind(this, post)} className="list_commentLabel">
                                    Comments
                                </p>
                                {appendTheCommentBox(post)}
                            </div>
                        </li>
					)
				)}
			</ul>
		</div>
	);
};

export default List;
