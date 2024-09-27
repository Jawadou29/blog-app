import "./updateProfileModal.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfileInfo } from "../../redux/apiCalls/profileApiCall";


function UpdateProfileModal({setUpdateProfile, profile}) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [password, setPassword] = useState("");

  // form submit handler
  const fromSubmitHandler = (e) => {
    e.preventDefault()
    
    const updatedUser = {username, bio};
    if (password.trim() !== "") {
      updatedUser.password = password;
    }

    dispatch(updateProfileInfo(profile?._id, updatedUser));
    setUpdateProfile(false);
    
  }
  return (
    <div className="update-profile">
      <form className="update-profile-form" onSubmit={fromSubmitHandler}>
        <abbr title="close">
          <i onClick={() => setUpdateProfile(false)} className="bi bi-x-circle-fill update-profile-form-close"></i>
        </abbr>
        <h1 className="update-profile-title">update profile</h1>
        <input type="text" className="update-profile-input" value={username} onChange={(e) => setUsername(e.target.value) } placeholder="username" />
        <input type="text" className="update-profile-input" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
        <input type="password" className="update-profile-input" value={password} onChange={(e) => setPassword(e.target.value) } placeholder="Password" />
        <button type="submit" className="update-profile-btn">update profile</button>
      </form>
    </div>
  )
}

export default UpdateProfileModal;