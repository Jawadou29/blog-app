import { useState } from 'react';
import "./form.css";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/apiCalls/passwordApiCall';

function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  // form handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");
    dispatch(forgotPassword(email))
  }

  return (
    <section className="form-container">
      <h1 className="form-title">forgot password</h1>
      <form className="form" onSubmit={formSubmitHandler}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            email
            <input type="email" id="email" className="form-input" placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          </label>          
        </div>
        <button type="submit" className='form-btn'>submit</button>
      </form>
    </section>
  )
}

export default ForgotPassword;