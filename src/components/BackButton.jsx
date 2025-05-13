// src/components/BackButton.jsx
import { useNavigate } from "react-router-dom";

function BackButton() {
    const navigate = useNavigate();

    return (
        <button
            className="btn btn-danger position-fixed m-4 shadow rounded-circle back-button"
            onClick={() => navigate(-1)}
            title="Torna indietro"
        >
            <i class="fa-solid fa-arrow-left
            "></i>
        </button>
    );
}

export default BackButton;
