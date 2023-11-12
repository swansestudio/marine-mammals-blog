import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../config";

import "../styles/post.css";
import closeIcon from "../assets/close_black_24dp.svg";

export default function App() {
  let params = useParams();

  let [post, setPost] = useState({});
  let [author, setAuthor] = useState("");
  let [body, setBody] = useState("");

  const navigate = useNavigate();

  const loadPost = async () => {
    let results = await fetch(`${baseUrl}/posts/${params.id}`).then((resp) =>
      resp.json()
    );
    setPost(results);
  };

  const handleNewComment = async () => {
    await fetch(`${baseUrl}/posts/comment/${params.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        author,
        body,
      }),
    });

    loadPost();
    setAuthor("");
    setBody("");
  };

  const handleDeleteComment = async (id) => {
    await fetch(`${baseUrl}/posts/comment/${params.id}/${id}`, {
      method: "DELETE",
    });

    loadPost();
  };

  useEffect(() => {
    loadPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className="modal-overlay" onClick={() => navigate("/")}></div>

      <div className="modal">
        <div className="edit-post-header">
          <h2>{post.title}</h2>
        </div>
        <h3>by {post.author}</h3>
        <p>Published on {new Date(post.date).toLocaleDateString()}</p>
        <p dangerouslySetInnerHTML={{ __html: post.body }} />

        {post && post.comments && (
          <div className="comments">
            {post.comments.map((comment) => {
              return (
                <div className="comment" key={comment._id}>
                  <div className="comment-header">
                    <span className="author">
                      {comment.author} commented on{" "}
                      {comment.date
                        ? new Date(comment.date).toLocaleDateString()
                        : "Once Upon A Time"}
                      :{" "}
                    </span>
                    <div>
                        <span>Delete Comment</span>
                        <div
                          className="delete-btn"
                          onClick={() => handleDeleteComment(comment._id)}>
                            <img src={closeIcon} alt="" />
                        </div>
                    </div>
                  </div>
                  <div>
                    <p>{comment.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <h4>Add New Comment</h4>
        <div className="modal-add-post">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
          <label htmlFor="body">Comment Text:</label>
          <textarea
            className="add-comment"
            id="body"
            rows="5"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </div>
        <button className='btn' onClick={handleNewComment}>
          Add Comment
        </button>
      </div>
    </React.Fragment>
  );
}
