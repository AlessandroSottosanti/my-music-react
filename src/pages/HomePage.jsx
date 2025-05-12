import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <main className="home-container flex-grow-1 page-bg">
            
            <section className="hero-section bg-dark rounded">
                <div className="hero-content">
                    <h1>Benvenuti in My Music Library</h1>
                    <p>Visualizza liberamente la tua personale libreria musicale</p>
                </div>
                <Link to="/songs" className="btn btn-success">Vai alla lista delle canzoni</Link>
            </section>
        </main>
    );
}

export default HomePage;
