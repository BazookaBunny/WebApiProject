// Navbar.tsx
import { Link } from "react-router-dom"; // Use this if you are using React Router for navigation

export default function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
                <li>
                    <Link to="/appointments">Appointments</Link>
                </li>
                {/* Add more links as needed */}
            </ul>
        </nav>
    );
}
