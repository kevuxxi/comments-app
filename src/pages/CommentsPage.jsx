import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { createCommentRequest, fetchCommentsRequest } from "../features/comments/commentsSlice";
import CommentCard from "../components/CommentCard";
import { toast } from "react-toastify";

const CommentsPage = () => {

    const dispatch = useDispatch();
    const { comments, error, loading } = useSelector((state) => state.comments)
    const [textareaValue, setTextareaValue] = useState('');

    useEffect(() => {
        dispatch(fetchCommentsRequest())
    }, [dispatch])

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const handleChange = (event) => {
        setTextareaValue(event.target.value);
    }

    const handleSubmit = (event) => {
        if (!textareaValue.trim()) return;

        event.preventDefault();
        dispatch(createCommentRequest({ text: textareaValue }))
        setTextareaValue('')
    }

    return (
        <div>
            <h2>Comentarios</h2>

            {loading && <p>Cargando...</p>}

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

                <button type="submit">Enviar</button>
            </form>

            <ul> {Array.isArray(comments) && comments.map((comment) => (<li key={comment._id}><CommentCard comment={comment} /></li>))}</ul>
        </div>
    )
}

export default CommentsPage