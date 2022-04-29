import {v4 as uuidv4} from 'uuid'

import {Component} from 'react'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {name: '', comment: '', commentsCount: 0, commentsList: []}

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  likeComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachComment => eachComment.id !== id,
      ),
      commentsCount: prevState.commentsCount - 1,
    }))
  }

  onAddComment = () => {
    event.preventDefault()
    
    const {name, comment} = this.state

    const arraySize = initialContainerBackgroundClassNames.length

    const randomIndex = Math.ceil(Math.random() * arraySize) - 1

    //    console.log(randomIndex)

    const randomColor = initialContainerBackgroundClassNames[randomIndex]

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      randomColor,
      isLiked: false,
      date: new Date(),
    }

    this.setState(prevState => ({
      name: '',
      comment: '',
      commentsCount: prevState.commentsCount + 1,
      commentsList: [...prevState.commentsList, newComment],
    }))
  }

  render() {
    const {name, comment, commentsCount, commentsList} = this.state

    return (
      <div className="bg-container">
        <div>
          <h1 className="heading">Comments</h1>
          <div className="card-container">
            <div className="inputs-container">
              <p className="side-heading">
                Say something about 4.0 Technologies
              </p>
              <form>
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={this.onChangeName}
                    placeholder="Your Name"
                    className="input"
                  />
                </div>

                <textarea
                  rows="7"
                  cols="30"
                  value={comment}
                  onChange={this.onChangeComment}
                  placeholder="Your Comment"
                  className="input"
                />
                <button
                  className="button"
                  type="submit"
                  onClick={this.onAddComment}
                >
                  Add Comment
                </button>
              </form>
            </div>

            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-image"
            />
          </div>

          <hr className="hr-line" />
          <p className="comments-count">
            <span className="count">{commentsCount}</span> Comments
          </p>

          <ul className="comments-container">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                likeComment={this.likeComment}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div> 
      </div>
    )
  }
}

export default Comments
