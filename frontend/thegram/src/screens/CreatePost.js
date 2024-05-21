import React, { useState, useEffect } from "react";
import "../css/CreatePost.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function CreatePost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const notifyError = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const navigate = useNavigate();

  const loadFile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  useEffect(() => {
    if (imageUrl) {
      //saving data to mongodb only after the image is set in cloud and we get the url
      fetch("http://localhost:5000/createPost/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          pic: imageUrl,
        }),
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {
          if (data && data.err) {
            notifyError(data.error);
            navigate("/");
          } else {
            notifyB("Successfully posted");
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [imageUrl]);
  //Post images to cloudinary
  const postDetails = () => {
    console.log(body, image);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "thegram");
    data.append("cloud_name", "dreamercloud");

    fetch("https://api.cloudinary.com/v1_1/dreamercloud/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="createPost">
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button
          id="post-btn"
          onClick={() => {
            postDetails();
          }}
        >
          Share
        </button>
      </div>

      <div className="main-div">
        <img
          id="output"
          src="https://seekicon.com/free-icon-download/images_4.svg"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadFile(event);
            setImage(event.target.files[0]);
          }}
        ></input>
      </div>

      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoLyku9z5NMcJI903GVWLJU82eaF2x5-UgCA&usqp=CAU"
              alt="Profile Photo"
            ></img>
          </div>
          <h5>Prachi</h5>
        </div>
        <textarea
          type="text"
          placeholder="Caption"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
}
