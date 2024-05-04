import React, { useState } from "react";
import "./PostDetails.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function PostDetails({ item, toggleDetails }) {
  const navigate = useNavigate();
  const notifyError = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const removePost = (postId) => {
    console.log(postId);

    if (window.confirm("Do you really want to delete the post?")) {
      fetch(`http://localhost:5000/deletePost/${postId}`, {
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          toggleDetails();
          navigate("/");
          notifyB(result.message);
        });
    }
  };

  return (
    <div className="showComment">
      <div className="container">
        <div className="postpic">
          <img src={item.photo}></img>
        </div>
        <div className="details">
          {/* card header */}
          <div
            className="card-header"
            style={{ borderBottom: "1px solid #00000029" }}
          >
            <div className="card-pic">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoLyku9z5NMcJI903GVWLJU82eaF2x5-UgCA&usqp=CAU"
                alt="Profile Photo"
              ></img>
            </div>
            <h5>{item.postedBy.name}</h5>
            <div
              className="deletePosts"
              onClick={() => {
                removePost(item._id);
              }}
            >
              <span className="material-symbols-outlined">delete</span>
            </div>
          </div>

          {/* commentSection */}
          <div
            className="comment-section"
            style={{ borderBottom: "1px solid #00000029" }}
          >
            {item.comments.map((comment) => {
              return (
                <p className="comm">
                  <span className="commenter" style={{ fontWeight: "bolder" }}>
                    {comment.postedBy.name}{" "}
                  </span>
                  <span className="commentText">{comment.comment}</span>
                </p>
              );
            })}
          </div>

          <div className="card-content">
            <p>{item.likes.length} Likes</p>
            <p>{item.body}</p>
          </div>

          {/* add comment */}
          <div className="add-comment">
            <span className="material-symbols-outlined">mood</span>
            <input
              type="text"
              placeholder="Add Comment"
              //   value={comment}
              //   onChange={(e) => {
              //     setComment(e.target.value);
              //   }}
            ></input>
            <button
              className="comment"
              //   onClick={() => {
              //     makeComment(comment, item._id);
              //     toggleComment();
              //   }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div
        className="close-comment"
        onClick={() => {
          toggleDetails();
        }}
      >
        <span className="material-symbols-outlined material-symbols-outlined-comment ">
          close
        </span>
      </div>
    </div>
  );
}
