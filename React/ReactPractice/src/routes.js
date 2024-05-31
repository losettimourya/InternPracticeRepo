import TicTacToe from "./Tictactoe";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import App from "./App";

const Routing = () => {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/tictactoe" element={<TicTacToe />} />
        </Routes>
        </Router>
    );
    }

export default Routing;