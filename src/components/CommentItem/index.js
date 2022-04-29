import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails, likeComment, deleteComment} = props

  const {id, name, comment, randomColor, isLiked, date} = commentDetails

  const userProfile = name ? name.substring(0, 1).toUpperCase() : ''

  const postedTime = formatDistanceToNow(date)

  //   console.log(isLiked)

  const likeOrLiked = isLiked ? 'liked' : 'like'

  const likeOrLikedImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onClickLike = () => {
    likeComment(id)
  }

  const onClickDelete = () => {
    deleteComment(id)
  }

  return (
    <li>
      <div className="comment-details">
        <p className={`user-profile ${randomColor}`}>{userProfile}</p>
        <div className="description">
          <p className="name">
            {name}
            <span className="format-distance">{postedTime} ago</span>
          </p>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="like-delete">
        <div className="like-container">
          <img src={likeOrLikedImage} alt="like" className="image" />
          <button
            type="button"
            className={`btn ${likeOrLiked}`}
            onClick={onClickLike}
          >
            Like
          </button>
        </div>
        <button
          type="button"
          className="btn"
          testid="delete"
          onClick={onClickDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
      <hr className="hr-line" />
    </li>
  )
}

export default CommentItem
