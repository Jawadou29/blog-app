import { Link } from "react-router-dom";
import "./admin-table.css";
import AdminSidebar from './AdminSidebar'
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProfile, getAllUsresProfiles } from "../../redux/apiCalls/profileApiCall";

function UsersTable() {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector(state => state.profile);
  // delete user handler
  const deleteUserHandler = (profileId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((isOK) => {
      if (isOK) {
        dispatch(deleteProfile(profileId))
      }
    });
  }
  useEffect(() => {
    dispatch(getAllUsresProfiles())
  }, [isProfileDeleted])
  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>cout</th>
              <th>user</th>
              <th>email</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile, index) => (
              <tr key={index+1}>
                <td>{index+1}</td>
                <td>
                  <div className="table-image">
                    <img src={profile.profilePhoto?.url} alt="img" className="table-user-image" />
                    <span className="table-username">{profile.username}</span>
                  </div>
                </td>
                <td>{profile.email}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/${profile._id}`}>view porfile</Link>
                    </button>
                    <button onClick={() => deleteUserHandler(profile._id)}>delete user</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default UsersTable