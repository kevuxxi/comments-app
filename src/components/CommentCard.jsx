import { useDispatch } from "react-redux";
import { likeComment } from "../services/commentService";

const CommentCard = ({ comment }) => {
    const dispatch = useDispatch();

    const handleSendLikes = () => {
        dispatch(likeComment(comment.id))
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