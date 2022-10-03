import React, { useState } from "react";
import Modal from "react-modal";

type Props = {
  children: any;
  isOpen: boolean;
  handleClose: () => void;
};

export default function SpreadsModal(props: Props) {
  const { children, isOpen, handleClose } = props;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

  // Modal.setAppElement(document.getElementById("root"));

  Modal.setAppElement("#__next");

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={handleClose} style={customStyles}>
        {children}
      </Modal>
    </div>
  );
}
