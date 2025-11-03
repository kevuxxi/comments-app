import { useDispatch } from "react-redux";
import { likeCommentRequest } from "../features/comments/commentsSlice";

const CommentCard = ({ comment }) => {
    const dispatch = useDispatch();

    const handleSendLikes = () => {
        dispatch(likeCommentRequest(comment._id))
    }

    return (
        <div>
            <p>{comment.user}</p>
            <p>{comment.text}</p>
            <p>{comment.likes}</p>
            <button onClick={handleSendLikes}>❤️ Like</button>
        </div>
    )
}

export default CommentCard