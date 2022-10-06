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

  Modal.setAppElement("#__next");

  return (
    <div>
      <Modal
        className="modal"
        overlayClassName="overlay"
        isOpen={isOpen}
        onRequestClose={handleClose}
        closeTimeoutMS={200}
      >
        {children}
      </Modal>
    </div>
  );
}
