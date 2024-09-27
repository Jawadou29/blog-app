import { Link } from "react-router-dom";
import "./notFound.css";

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found-title">404</div>
      <h1 className="not-found-text">page not found</h1>
      <Link to="/" className="not-found-link">go to home page</Link>
    </section>
  )
}

export default NotFound