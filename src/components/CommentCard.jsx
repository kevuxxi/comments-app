import { useDispatch } from "react-redux";
import { likeCommentRequest } from "../features/comments/commentsSlice";

const CommentCard = ({ comment, isLiking = false }) => {
    const dispatch = useDispatch();

    const handleSendLikes = () => {
        const commentId = comment?._id ?? comment?.id;
        if (!commentId) {
            return;
        }
        dispatch(likeCommentRequest(commentId));
    };

    return (
        <div>
            <p>{comment.user}</p>
            <p>{comment.text}</p>
            <p>{comment.likes ?? 0}</p>
            <button onClick={handleSendLikes} disabled={isLiking}>
                {'\u2764\uFE0F Like'}
            </button>
        </div>
    );
};

export default CommentCard;
