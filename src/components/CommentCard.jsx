import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeCommentRequest } from "../features/comments/commentsSlice";

const selectCurrentUserId = (state) => {
    const user = state?.auth?.user;
    return (
        user?.id ??
        user?.user_id ??
        user?.userId ??
        user?.userID ??
        user?.profile?.id ??
        null
    );
};

const CommentCard = ({ comment, isLiking = false, currentUserId }) => {
    const dispatch = useDispatch();
    const fallbackUserId = useSelector(selectCurrentUserId);

    const activeUserId = currentUserId ?? fallbackUserId;

    const commentId = comment?.id ?? comment?._id ?? comment?.comment_id ?? null;
    const username =
        comment?.user ??
        (comment?.userId ? `Usuario #${comment.userId}` : "Anónimo");
    const likes = comment?.likes ?? 0;
    const dislikes = comment?.dislikes ?? 0;

    const initials = useMemo(() => {
        if (!username) {
            return "?";
        }
        return username.trim().charAt(0).toUpperCase();
    }, [username]);

    const handleSendLikes = () => {
        if (!commentId || !activeUserId) {
            return;
        }
        dispatch(
            likeCommentRequest({
                commentId,
                userId: activeUserId,
                reaction: "like",
            })
        );
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
                        <span className="comment-card__likes-count">?? {likes}</span>
                        {dislikes > 0 && (
                            <span className="comment-card__dislikes"> · ?? {dislikes}</span>
                        )}
                    </span>
                </header>
                <p className="comment-card__text">{comment?.text ?? ""}</p>
                <div className="comment-card__actions">
                    <button
                        type="button"
                        className="btn btn--ghost comment-card__like-btn"
                        onClick={handleSendLikes}
                        disabled={!activeUserId || isLiking}
                    >
                        {isLiking ? "Procesando..." : "?? Like"}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default CommentCard;

