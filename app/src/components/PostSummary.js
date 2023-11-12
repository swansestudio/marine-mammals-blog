import React from "react";
import { Link } from "react-router-dom";
import '../styles/post-summary.css'


export default function PostSummary(props) {

  const {title, author, date, _id, deletePost } = props;


  return (
    <div className='card'>
      <div className='post-summary-header'>
        <h3>{title}</h3>
      </div>
      <div className="post-summary-body">
        by {author} on {(new Date(date)).toLocaleDateString()}<br/>
        <div className="post-footer">
          <div className='readmore'>
            <Link to={`/post/${_id}`}>Read More...</Link><br/>
          </div>
          <button className='btn' id="remove" onClick={() => deletePost(_id)}>
                Delete Post
          </button>
        </div>
      </div>
    </div>
  )
}