// SongCard.jsx
import React from "react";
import { redirect } from "react-router-dom";

function SongCard({ song, handleCardClick }) {
    return (
        <div className="card card-song bg-card text-white h-100 shadow-sm rounded-3 overflow-hidden hover border-0"
            onClick={() => handleCardClick(song.id)}>
            <img
                src={song.albumCoverUrl}
                className="card-img-top"
                alt={song.albumTitle}
                style={{ objectFit: "cover", height: "250px" }}
            />
            <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title mb-1">{song.title}</h5>
                <p className="card-text mt-auto">
                    <strong>Artista:</strong> {song.artistNames.join(", ")}
                </p>
                <p className="card-text mt-auto">
                    <strong>Album:</strong> {song.albumTitle}
                </p>
                <p className="card-text">
                    {song.genreNames.map((g, idx) => (
                        <span key={idx} className="badge bg-secondary me-1">{g}</span>
                    ))}
                </p>

                <p className="card-text mt-3">
                    <small>Durata: {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')} min</small>
                </p>
            </div>
        </div>
    );
}

export default SongCard;
