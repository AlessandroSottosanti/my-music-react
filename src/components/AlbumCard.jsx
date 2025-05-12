import { Link } from "react-router-dom";

function AlbumCard({ album }) {
  return (
    <Link to={`/albums/${album.id}`} className="text-decoration-none text-white">
      <div className="card bg-card text-white h-100 shadow">
        <img src={album.coverUrl} className="card-img-top" alt={album.title} />
        <div className="card-body">
          <h5 className="card-title">{album.title}</h5>
          <p className="card-text">{album.artistNames.join(", ")}</p>
          <p className="card-text text-white">{new Date(album.releaseDate).getFullYear()}</p>
        </div>
      </div>
    </Link>
  );
}

export default AlbumCard;
