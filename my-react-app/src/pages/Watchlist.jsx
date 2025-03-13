import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        setWatchlist(savedWatchlist);
    }, []);

    return (
        <div>
            <h1>My Watchlist</h1>
            {watchlist.length > 0 ? (
                <ul>
                    {watchlist.map((ticker, index) => (
                        <li key={index}>{ticker}</li>
                    ))}
                </ul>
            ) : (
                <p>Your watchlist is empty</p>
            )}
        </div>
    );
}

export default Watchlist;
