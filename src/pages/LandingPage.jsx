import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentCard from '../components/CommentCard';

const LandingPage = () => {
    const { comments = [], } = useSelector((state) => state.comments ?? {});

    return (
        <div>
            <Link to={'/login'} className="page__empty">
                <button>Inicia sesión para comentar.</button>
            </Link>

            <ul className="comments-list">
                {comments.map((comment) => {
                    const commentId = comment?._id ?? comment?.id;
                    if (!commentId) {
                        return null;
                    }
                    return (
                        <li className="comments-list__item" key={commentId}>
                            <CommentCard comment={comment} />
                        </li>
                    );
                })}
            </ul>
        </div >
    )
}

export default LandingPage