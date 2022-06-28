import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Popular actors of the day
      </Link>
      <ul>
        <CustomLink to="/">List of actors</CustomLink>
        <CustomLink to="/barmovieyear"> Bar chart movies by year</CustomLink>
        <CustomLink to="/piegender">Pie chart actors by gender ratio</CustomLink>
        <CustomLink to="/piemovietv">Pie chart actor movie tv ratio</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
