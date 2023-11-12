import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config";
import '../styles/create.css';




export default function Create(props) {

  const { loadPosts } = props;

  let [ author, setAuthor ] = useState("");
  let [ title, setTitle ] = useState("");
  let [ body, setBody ] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(`${baseUrl}/posts`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        author, title, body
      })
    });


    // setAuthor("");
    // setTitle("");
    // setBody("");

    loadPosts()
  }

  return (
    <React.Fragment>
      <div className="modal-overlay" onClick={() => navigate("/")}></div>
      <div className="modal">
        <div className="add-new-header">
          <h2>Write New Post</h2>
        </div>
        <form className='create-new'>
          <label htmlFor="author">Author:</label>
          <input type="text"
            id='author'
            onChange={e => setAuthor(e.target.value)}
            value={author}
          />
          <label htmlFor="title">Title:</label>
          <input type="text"
            id='title'
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="body">Post:</label>
          <textarea
            id='body'
            onChange={e => setBody(e.target.value)}
            rows="10"
            value={body}
          />
          <button
            className="btn add-new-submit"
            onClick = { handleSubmit }>
              Add Post
          </button>
        </form>
      </div>
    </React.Fragment>
  )
}