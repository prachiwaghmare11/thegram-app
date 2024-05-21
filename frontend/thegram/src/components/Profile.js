import React, { useEffect, useState } from "react";
import "./Profile.css";
import PostDetails from "./PostDetails";
import ProfilePic from "./ProfilePic";
export default function Profile() {
  var picLink =
    "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-blue-default-avatar-png-image_2813123.jpg";
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [changePic, setChangePic] = useState();
  const [user, setUser] = useState("");
  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setPosts(posts);
      setShow(true);
    }
  };

  const changeProfile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };
  useEffect(() => {
    fetch(
      `http://localhost:5000/user/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setPic(result.post);
        setUser(result.user);
        console.log(result.user);
      });
  }, []);

  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            onClick={changeProfile}
            src={user.Photo ? user.Photo : picLink}
            alt="Profile Photo"
          ></img>
        </div>
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{pic ? pic.length : "0"} posts</p>
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
        {pic.map((pics) => {
          return (
            <img
              key={pics._id}
              src={pics.photo}
              className="item"
              onClick={() => toggleDetails(pics)}
            ></img>
          );
        })}
      </div>
      {show && (
        <PostDetails item={posts} toggleDetails={toggleDetails}></PostDetails>
      )}

      {changePic && <ProfilePic changeProfile={changeProfile}></ProfilePic>}
    </div>
  );
}
