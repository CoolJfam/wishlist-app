import React, { useState } from "react";
import Modal from "react-modal";
import { IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import "./AddItem.css";

function AddItem(props) {
  const [ModalShowing, setModalShowing] = useState(false);

  const handleModal = () => {
    setModalShowing(!ModalShowing);
  };

  const handleSave = (e) => {
    e.preventDefault();
    handleModal();
    alert("This item is now saved");
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
              <input type="text" id="item-name"></input>
              <br />
              <label htmlFor="item-price">Item Price: </label>
              <input type="number" id="item-price"></input>
              <br />
              <label htmlFor="item-link">Item Link: </label>
              <input type="text" id="item-link"></input>
              <br />
              <button onClick={handleSave}>Save</button>
            </form>

            <IconButton data-testId="cancel-save-btn" onClick={handleModal}>
              <CancelRoundedIcon color="error" />
            </IconButton>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddItem;
