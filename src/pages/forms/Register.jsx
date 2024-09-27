import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./form.css";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/apiCalls/authApiCall';
import swal from 'sweetalert';

function Register() {
  
  const dispatch = useDispatch();
  const {registerMessage} = useSelector((state) => state.auth)

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // form handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("Username is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
    dispatch(registerUser({username, email, password}))
  }
  const navigate = useNavigate();
  if (registerMessage) {
    swal({
      title: registerMessage,
      icon: "success"
    }).then(isOk => {
      if (isOk) {
        // go to login page
        navigate("/login")
      }
    })
  }

  return (
    <section className="form-container">
      <h1 className="form-title">create account</h1>
      <form className="form" onSubmit={formSubmitHandler}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            username
            <input type="text" id="username" className="form-input" placeholder='enter your username' value={username} onChange={(e) => setUsername(e.target.value)}/>
          </label>          
        </div>
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
        <button type="submit" className='form-btn'>register</button>
      </form>
      <div className="form-footer">
        already have an account? <Link to="/login">login</Link>
      </div>
    </section>
  )
}

export default Register