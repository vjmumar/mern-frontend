import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommentBox from "../comment_box_component/commentBox";
import { GET_COMMENTS_ACTION } from "../../Redux/actions/GET_COMMENTS";
import css from "../list_component/list.css";

const List = (props) => {
	//props
	const { handleLikes, handleRemovePost, getPostId, postId, handleFilter , handleUpdatePost} = props;

	//comments prop
	const { commentInput, handleCommentChange, handleCommentSubmit, handleDeleteComment } = props;

	//variables
	const dispatch = useDispatch();
	const myId = localStorage.getItem("myId");
	const userData = useSelector((state) => state.GET_DATA_REDUCER);

	//states
	const [commentBoxId, setCommentBoxId] = useState("");

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

	const updatePostButton = (post) => {
		if (post.belongsTo === myId) {
			return (
				<button onClick={handleUpdatePost.bind(this, post)} className="list_removePost">
					Update
				</button>
			);
		}
	};

	const deletePostButton = (post) => {
		if (post.belongsTo === myId) {
			return (
				<button onClick={handleRemovePost.bind(this, post._id,post.cloudinaryId)} className="list_removePost">
					Delete
				</button>
			);
		}
	};

	const showCommentOnSpecificPost = (post) => {
		getPostId(post._id);
		setCommentBoxId(post._id);
		if (post.comments.length !== 0) {
			dispatch(GET_COMMENTS_ACTION(post.comments));
		} else {
			dispatch(GET_COMMENTS_ACTION([]));
		}
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
					details.Post.map((post) => (
						<li className="list_li" key={post._id}>
							<div className="list_item">
								{deletePostButton(post)}
								{updatePostButton(post)}
								<h3 className="list_postName">{details.Username}</h3>
							   {
								post.postImg !== "none" ?
								<img className = "list_image" src={post.postImg} />
								: ""
							   }
								<p className="list_postText">{post.text}</p>
								{likeButton(post.likes, post, details)}
								<p onClick={showCommentOnSpecificPost.bind(this, post)} className="list_commentLabel">
									Comments {post.comments.length}
								</p>
								{appendTheCommentBox(post)}
							</div>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default List;
