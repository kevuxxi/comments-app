import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { likeCommentRequest } from "../features/comments/commentsSlice";

const CommentCard = ({ comment, isLiking = false }) => {
    const dispatch = useDispatch();

    const commentId = comment?._id ?? comment?.id;
    const username = comment?.user ?? "An\u00F3nimo";
    const likes = comment?.likes ?? 0;

    const initials = useMemo(() => {
        if (!username) {
            return "?";
        }
        return username.trim().charAt(0).toUpperCase();
    }, [username]);

    const handleSendLikes = () => {
        if (!commentId) {
            return;
        }
        dispatch(likeCommentRequest(commentId));
    };

    return (
        <article className="comment-card">
            <div className="comment-card__avatar" aria-hidden="true">
                {initials}
            </div>
            <div className="comment-card__body">
                <header className="comment-card__header">
                    <span className="comment-card__user">{username}</span>
                    <span className="comment-card__likes" aria-live="polite">
                        {likes} {likes === 1 ? "like" : "likes"}
                    </span>
                </header>
                <p className="comment-card__text">{comment?.text ?? ""}</p>
                <div className="comment-card__actions">
                    <button
                        type="button"
                        className="btn btn--ghost comment-card__like-btn"
                        onClick={handleSendLikes}
                        disabled={isLiking}
                    >
                        {isLiking ? "Procesando..." : "\u2764\uFE0F Like"}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default CommentCard;

