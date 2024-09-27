import { Link, useParams } from "react-router-dom";
import "./verify-email.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";

function VerifyEmail() {

  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector(state => state.auth);
  const {userId, token} = useParams();

  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [userId, token]);

  return (
    <section className="verify-email">
      {
        isEmailVerified ?
        <>
          <i className="bi bi-patch-check verify-email-icon"></i>
          <h1 className="verfiy-email-title">
            your email address has been successfully verified
          </h1>
          <Link to="/login" className="verify-email-link">go to login page</Link>
        </> :
        <>
          <h1 className="verify-email-not-found">
            not found
          </h1>
        </>
      }
    </section>
  )
}

export default VerifyEmail;