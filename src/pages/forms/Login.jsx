import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./form.css";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { loginUser } from '../../redux/apiCalls/authApiCall';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // form handler
  // const auth = useSelector((state) => state.auth)
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
    // console.log({email, password});
    dispatch(loginUser({email, password}))
  }


  return (
    <section className="form-container">
      <h1 className="form-title">login to your account</h1>
      <form className="form" onSubmit={formSubmitHandler}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            email
            <input type="email" id="email" className="form-input" placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          </label>          
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            password
            <input type="password" id="password" className="form-input" placeholder='enter your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </label>          
        </div>
        <button type="submit" className='form-btn'>login</button>
      </form>
      <div className="form-footer">
        did you forgot your password? <Link to="/forgot-password">forgot password</Link>
      </div>
    </section>
  )
}

export default Login;