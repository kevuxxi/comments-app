import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { createCommentRequest, fetchCommentsRequest } from "../features/comments/commentsSlice";
import CommentCard from "../components/CommentCard";

const CommentsPage = () => {

    const dispatch = useDispatch();
    const { comments, error, loading } = useSelector((state) => state.comments)
    const [textareaValue, setTextareaValue] = useState('');


    useEffect(() => {
        dispatch(fetchCommentsRequest())
    }, [])

    handleChange = (event) => {
        setTextareaValue(event.target.value);
    }


    const handleSudmit = () => {
        dispatch(createCommentRequest({ textareaValue }))
    }


    return (
        <div>
            <h2>Comentarios</h2>
            {error && <p>{error}</p>}
            {loading && <p>Cargando...</p>}

            <form onSubmit={handleSudmit}>
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

            {comments.map((comment) => (<li key={comment.id}><CommentCard comment={comment} /></li>))}
        </div>
    )
}

export default CommentsPage