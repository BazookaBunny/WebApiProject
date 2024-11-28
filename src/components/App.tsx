// App.tsx
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './Home';


const App: React.FC = () => {
    return (
        <div>
            <nav>
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
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<Home />} />
                <Route path="/contact" element={<Home />} />
                {/* Add more routes as needed */}
            </Routes>
        </div>
    );
};

export default App;
