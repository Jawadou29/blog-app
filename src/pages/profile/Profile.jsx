import "./profile.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateProfileModal from "./UpdateProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, getUserProfile, uploadProfilePhoto } from "../../redux/apiCalls/profileApiCall";
import { useNavigate, useParams } from "react-router-dom";
import PostItem from "../../components/posts/PostItem";
import { TailSpin } from "react-loader-spinner";
import { logoutUser } from "../../redux/apiCalls/authApiCall";


function Profile() {
  const dispatch = useDispatch();
  const { profile, loading, isProfileDeleted } = useSelector(state => state.profile);
  const { user } = useSelector(state => state.auth);


  
  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);
  
  const { id } = useParams();
  useEffect(() => {
    dispatch(getUserProfile(id))
    window.scrollTo(0, 0);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useNavigate();
  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [navigate, isProfileDeleted]);

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file!");
    const formdata = new FormData();
    formdata.append("image", file);
    dispatch(uploadProfilePhoto(formdata))
  }

  // delete account handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((isOK) => {
      if (isOK) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
    });
  }

  if (loading) {
    return (
      <div className="profile-loader">
        <TailSpin
          visible={true}
          height="120"
          width="120"
          color="#0275d8"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          // strokeWidth={3}
        />
      </div>
    )
  }

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img src={file ? URL.createObjectURL(file) : profile?.profilePhoto?.url} className="profile-image" alt="avatar"/>
          {
            user?._id === profile?._id &&
            <form onSubmit={formSubmitHandler}>
            <abbr title="choose profile photo">
              <label htmlFor="file" className="bi bi-camera-fill upload-profile-photo-icon"></label>
            </abbr>
            <input 
                  style={{display: "none"}}
                  type="file" 
                  name="file" 
                  id="file" 
                  onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit" className="upload-profile-photo-btn">upload</button>
          </form>
          }
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">
          {profile?.bio}
        </p>
        <div className="user-date-joined">
          <strong>date joined</strong>
          <span>
            {new Date(profile?.createdAt).toDateString()}
          </span>
        </div>
        {
            user?._id === profile?._id &&
            <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
              <i className="bi bi-file-person-fill"></i>
                update profile
            </button>
          }
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.username} posts</h2>
        {
          profile?.posts?.map((post) => (
            <PostItem key={post?._id} post={post} username={profile?.username} userId={profile?._id}/>
          ))
        }
      </div>
      {
        user?._id === profile?._id &&
        <button onClick={deleteAccountHandler} className="delete-account-btn">delete your account</button>
      }
      {updateProfile && <UpdateProfileModal profile={profile} setUpdateProfile={setUpdateProfile} />}
    </section>
  )
}

export default Profile;