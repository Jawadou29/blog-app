import { useEffect, useState } from 'react';
import "./form.css";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getResetPassword, resetPassword } from '../../redux/apiCalls/passwordApiCall';

function ResetPassword() {
  const dispatch = useDispatch();
  const { isError } = useSelector(state => state.password);
  const {userId, token} = useParams();

  useEffect(() => {
    dispatch(getResetPassword(userId, token))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, token]);

  const [password, setPassword] = useState("");

  // form handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Password is required");
    dispatch(resetPassword(password, {userId, token}))
  }

  return (
    <section className="form-container">
      <h1 className="form-title">reset passord</h1>
      {isError ? <h1>not found</h1> : 
        <>
          <form className="form" onSubmit={formSubmitHandler}>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              new password
              <input type="password" id="password" className="form-input" placeholder='enter your new password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>          
          </div>
          <button type="submit" className='form-btn'>submit</button>
        </form>
        </>
      }
    </section>
  )
}

export default ResetPassword;