import React, { useState } from "react";
import Modal from "react-modal";
import { IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useItems } from "./ItemContext";
import "./AddItem.css";

function AddItem(props) {
  const [ModalShowing, setModalShowing] = useState(false);
  const [text, setText] = useState("");
  const [price, setPrice] = useState(0);
  const [link, setLink] = useState("");
  const { addItem } = useItems();

  const handleModal = () => {
    setModalShowing(!ModalShowing);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!text.trim() || isNaN(price) || !link.trim()) return;
    handleModal();
    addItem(text, price, link);
    setText("");
    setPrice(0);
    setLink("");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    handleModal();
    setText("");
    setPrice(0);
    setLink("");
  };

  return (
    <>
      <div className="add-btn">
        <IconButton data-testid="add-btn" size="large" onClick={handleModal}>
          <AddCircleRoundedIcon fontSize="inherit" color="primary" />
        </IconButton>
      </div>
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
            <form>
              <label htmlFor="item-name">Item Name: </label>
              <input
                type="text"
                onChange={(e) => {
                  setText(e.target.value);
                }}
                value={text}
                id="item-name"
                data-testid="item-name"
              ></input>
              <br />
              <label htmlFor="item-price">Item Price: $</label>
              <input
                type="number"
                onChange={(e) => {
                  setPrice(parseFloat(e.target.value) || 0);
                }}
                value={price}
                id="item-price"
                data-testid="item-price"
              ></input>
              <br />
              <label htmlFor="item-link">Item Link: </label>
              <input
                type="text"
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                value={link}
                id="item-link"
                data-testid="item-link"
              ></input>
              <br />
              <button type="submit" onClick={handleSave}>
                Save
              </button>
            </form>

            <IconButton data-testid="cancel-save-btn" onClick={handleCancel}>
              <CancelRoundedIcon color="error" />
            </IconButton>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddItem;
