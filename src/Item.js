import React, { useState } from "react";
import { IconButton } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import Modal from "react-modal";
import { useItems } from "./ItemContext";
import "./Item.css";

const FavoriteIcon = StarRoundedIcon;
const DeleteIcon = CancelRoundedIcon;
const EditIcon = EditNoteRoundedIcon;

function Item(props) {
  const [favorited, setFavorited] = useState(false);
  const [DeleteModalShowing, setDeleteModalShowing] = useState(false);
  const [ariaLabel, setAriaLabel] = useState("unfavorite");
  const { items, deleteItem, updateItem } = useItems();
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToUpdate, setItemToUpdate] = useState(null);

  const handleFavorite = () => {
    setFavorited((prevFavorited) => {
      const newFavorited = !prevFavorited;
      alert(`This item is now ${newFavorited ? "favorited" : "not favorited"}`);
      return newFavorited;
    });
    setAriaLabel(favorited ? "unfavorite" : "favorite");
  };

  const handleDeleteConfirmation = (id) => {
    setItemToDelete(id);
    setDeleteModalShowing(true);
  };

  const handleCancel = () => {
    setDeleteModalShowing(false);
  };

  const handleDelete = () => {
    if (itemToDelete !== null) {
      deleteItem(itemToDelete);
      setItemToDelete(null);
      setDeleteModalShowing(false);
      alert("This item is now deleted");
    }
  };

  const handleEdit = (item) => {
    setItemToUpdate(item);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (
      itemToUpdate === null ||
      !itemToUpdate.text.trim() ||
      isNaN(itemToUpdate.price) ||
      !itemToUpdate.link.trim()
    ) {
      return;
    }
    updateItem(itemToUpdate);
    setItemToUpdate(null);
    alert("This item is now updated");
  };

  return (
    <div className="item-list">
      {items.map((item) => (
        <div key={item.id} className="item">
          <IconButton
            onClick={handleFavorite}
            data-testid="favorite-btn"
            aria-label={ariaLabel}
          >
            <FavoriteIcon color={favorited ? "primary" : "disabled"} />
          </IconButton>
          <div>
            <h4>{item.text}</h4>
            <img alt=""></img>
            <p>Price: {item.price}</p>
            <p>Website: {item.link}</p>
          </div>
          <IconButton
            onClick={() => handleEdit(item)}
            aria-label="edit"
            data-testid="edit-btn"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteConfirmation(item.id)}
            data-testid="delete-modal-btn"
            aria-label="delete"
          >
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      ))}

      <Modal
        isOpen={DeleteModalShowing}
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
        <div className="delete-modal">
          <div className="delete-modal-content">
            Are you sure you want to delete this Item? (This cannot be undone)
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </Modal>
      {itemToUpdate && (
        <Modal
          isOpen={!!itemToUpdate}
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
          <div className="edit-modal">
            <div className="edit-modal-content">
              <form>
                <label htmlFor="item-name">Item Name: </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setItemToUpdate({ ...itemToUpdate, text: e.target.value });
                  }}
                  value={itemToUpdate.text}
                  id="item-name"
                  data-testid="item-name"
                ></input>
                <br />
                <label htmlFor="item-price">Item Price: $</label>
                <input
                  type="number"
                  onChange={(e) => {
                    setItemToUpdate({
                      ...itemToUpdate,
                      price: parseFloat(e.target.value) || 0,
                    });
                  }}
                  value={itemToUpdate.price}
                  id="item-price"
                  data-testid="item-price"
                ></input>
                <br />
                <label htmlFor="item-link">Item Link: </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setItemToUpdate({ ...itemToUpdate, link: e.target.value });
                  }}
                  value={itemToUpdate.link}
                  id="item-link"
                  data-testid="item-link"
                ></input>
                <br />
                <button type="submit" onClick={handleSave}>
                  Save
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Item;
