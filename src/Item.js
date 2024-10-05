import React, { useState } from "react";
import { IconButton } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import "./Item.css";
import Modal from "react-modal";

const FavoriteIcon = StarRoundedIcon;
const DeleteIcon = CancelRoundedIcon;

function Item(props) {
  const [favorited, setFavorited] = useState(false);
  const [ModalShowing, setModalShowing] = useState(false);
  const [ariaLabel, setAriaLabel] = useState("unfavorite");

  const handleFavorite = () => {
    setFavorited((prevFavorited) => {
      const newFavorited = !prevFavorited;
      alert(`This item is now ${newFavorited ? "favorited" : "not favorited"}`);
      return newFavorited;
    });
    setAriaLabel(favorited ? "unfavorite" : "favorite");
  };

  const handleDeleteConfirmation = () => {
    setModalShowing(!ModalShowing);
  };

  const handleDelete = () => {
    handleDeleteConfirmation();
    alert("This item is now deleted");
  };

  return (
    <div className="item">
      <IconButton
        onClick={handleFavorite}
        data-testid="favorite-btn"
        aria-label={ariaLabel}
      >
        <FavoriteIcon color={favorited ? "primary" : "disabled"} />
      </IconButton>
      <div>
        <h4>{props.name}</h4>
        <img alt=""></img>
        <p>Price: {props.price}</p>
        <p>Website: {props.link}</p>
      </div>
      <IconButton
        onClick={handleDeleteConfirmation}
        data-testid="delete-modal-btn"
        aria-label="delete"
      >
        <DeleteIcon color="error" />
      </IconButton>
      <Modal
        isOpen={ModalShowing}
        style={{
          overlay: {
            backgroundColor: "rgb(0, 0, 0, 0.12)",
          },
          content: {
            width: "500px",
            height: "500px",
            margin: "auto",
          },
        }}
      >
        <div className="modal">
          <div className="modal-content">
            Are you sure you want to delete this Item? (This cannot be undone)
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleDeleteConfirmation}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Item;
