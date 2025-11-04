import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createCommentRequest, fetchCommentsRequest } from "../features/comments/commentsSlice";
import CommentCard from "../components/CommentCard";
import Navbar from "../components/Navbar";

const CommentsPage = () => {
    const dispatch = useDispatch();
    const {
        comments = [],
        error,
        loading,
        creating,
        liking,
    } = useSelector((state) => state.comments ?? {});
    const { token } = useSelector((state) => state.auth ?? {});

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

    const isAuthenticated = Boolean(token);

    return (
        <div className="page comments-page">
            <Navbar />
            <div className="page__body">
                <header className="page__header">
                    <div>
                        <h2 className="page__title">Comentarios</h2>
                        <p className="page__subtitle">Comparte tus ideas con la comunidad.</p>
                    </div>
                    <div className="page__status-group">
                        {loading && (
                            <span className="status-pill status-pill--loading">Cargando comentarios...</span>
                        )}
                        {creating && (
                            <span className="status-pill status-pill--creating">Publicando comentario...</span>
                        )}
                    </div>
                </header>

                {!isAuthenticated ? (
                    <div className="page__empty">
                        <p>Inicia sesión para comentar.</p>
                    </div>
                ) : (
                    <form className="comment-form" onSubmit={handleSubmit}>
                        <label className="comment-form__label" htmlFor="comment-textarea">
                            Tu comentario
                        </label>
                        <textarea
                            id="comment-textarea"
                            className="comment-form__input"
                            value={textareaValue}
                            onChange={handleChange}
                            rows={5}
                            maxLength={500}
                            placeholder="Escribe algo interesante..."
                            disabled={creating}
                        />
                        <div className="comment-form__footer">
                            <span className="comment-form__counter">{textareaValue.length}/500</span>
                            <button type="submit" className="btn btn--primary" disabled={creating}>
                                Enviar
                            </button>
                        </div>
                    </form>
                )}

                <ul className="comments-list">
                    {comments.map((comment) => {
                        const commentId = comment?._id ?? comment?.id;
                        if (!commentId) {
                            return null;
                        }
                        return (
                            <li className="comments-list__item" key={commentId}>
                                <CommentCard comment={comment} isLiking={liking} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default CommentsPage;


