import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createCommentRequest, fetchCommentsRequest } from "../features/comments/commentsSlice";
import CommentCard from "../components/CommentCard";

const CommentsPage = () => {
    const dispatch = useDispatch();
    const {
        comments = [],
        error,
        loading,
        creating,
        liking,
    } = useSelector((state) => state.comments ?? {});
    const [textareaValue, setTextareaValue] = useState("");

    useEffect(() => {
        dispatch(fetchCommentsRequest());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleChange = (event) => {
        setTextareaValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const text = textareaValue.trim();
        if (!text) {
            return;
        }
        dispatch(createCommentRequest({ text }));
        setTextareaValue("");
    };

    return (
        <div>
            <h2>Comentarios</h2>

            {loading && <p>Cargando comentarios...</p>}
            {creating && <p>Publicando comentario...</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Comentar:
                    <textarea
                        value={textareaValue}
                        onChange={handleChange}
                        rows={5}
                        cols={30}
                    />
                </label>
                <p>Comentario actual: {textareaValue}</p>

                <button type="submit" disabled={creating}>
                    Enviar
                </button>
            </form>

            <ul>
                {comments.map((comment) => {
                    const commentId = comment?._id ?? comment?.id;
                    if (!commentId) {
                        return null;
                    }
                    return (
                        <li key={commentId}>
                            <CommentCard comment={comment} isLiking={liking} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CommentsPage;
