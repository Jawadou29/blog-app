import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

function HeaderRight() {
  const { user } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  // logoutHandler
  const logoutHandler = () => {
    setDropdown(false);
    dispatch(logoutUser());
  }
  return (
    <div className="header-right">
      {user ? 
        <>
          <div className="header-right-user-info">
            <span className="header-right-username" onClick={() => setDropdown(prev => !prev )}>
              {user.username}
            </span>
            <img src={user?.profilePhoto?.url} alt="img" className="header-right-user-photo"/>
            {dropdown && (
              <div className="header-right-dropdown">
                <Link to={`/profile/${user?._id}`} className="header-dropdown-item" onClick={() => setDropdown(false)}>
                  <i className="bi bi-file-person"></i>
                  <span>profile</span>
                </Link>
                <div className="header-dropdown-item" onClick={logoutHandler}>
                  <i className="bi bi-box-arrow-in-left"></i>
                  <span>logout</span>
                </div>
              </div>
            )}
          </div>
        </> : (
          <>
            <Link to="/login" className="header-right-link">
              <i className="bi bi-box-arrow-in-right"></i>
              <span>login</span>
            </Link>
            <Link to="/register" className="header-right-link">
              <i className="bi bi-person-plus"></i>
              <span>register</span>
            </Link>
          </>
        )
      }
    </div>
  )
}

export default HeaderRight