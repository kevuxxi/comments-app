import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { fetchCommentsRequest } from "../features/comments/commentsSlice";
import CommentCard from "../components/CommentCard";

const CommentsPage = () => {

    const dispatch = useDispatch();
    const { comments, error, loading } = useSelector((state) => state.comments)


    useEffect(() => {
        dispatch(fetchCommentsRequest())
    }, [])


    return (
        <div>
            <h2>Comentarios</h2>
            {error && <p>{error}</p>}
            {loading && <p>Cargando...</p>}

            {comments.map((comment) => (<li key={comment.id}><CommentCard comment={comment} /></li>))}
        </div>
    )
}

export default CommentsPage