import React, { useEffect, useState } from "react";
import "./Profile.css";
import PostDetails from "./PostDetails";
import { useParams } from "react-router-dom";
export default function UserProfile() {
  var picLink = "https://www.flaticon.com/free-icon/user_456141";

  const [pic, setPic] = useState([]);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const { userId } = useParams();
  console.log(userId);
  useEffect(() => {
    fetch(`http://localhost:5000/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUser(result.user);
        setPosts(result.post);

        if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ) {
          setIsFollow(true);
        }
      });
  }, [isFollow]);

  const followUser = (userId) => {
    fetch("http://localhost:5000/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(true);
      });
  };

  const unfollowUser = (userId) => {
    fetch("http://localhost:5000/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(false);
      });
  };
  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            src={user.Photo ? user.Photo : picLink}
            alt="Profile Photo"
          ></img>
        </div>
        <div className="profile-data">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>{user.name}</h1>
            <button
              className="followBtn"
              onClick={() => {
                if (isFollow) {
                  unfollowUser(user._id);
                } else {
                  followUser(user._id);
                }
              }}
            >
              {isFollow ? "Unfollow" : "Follow"}
            </button>
          </div>
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{posts.length} posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
          </div>
        </div>
      </div>

      <hr
        style={{
          width: "90%",
          margin: "auto",
          opacity: "0.8",
          margin: "25px auto",
        }}
      ></hr>
      <div className="profile-gallery">
        {posts.map((pics) => {
          return (
            <img
              key={pics._id}
              src={pics.photo}
              className="item"
              //   onClick={() => toggleDetails(pics)}
            ></img>
          );
        })}
      </div>
      {/* {show && (
        <PostDetails item={posts} toggleDetails={toggleDetails}></PostDetails>
      )} */}
    </div>
  );
}
