import React from "react";
import Modal from "react-awesome-modal";
import NewItem from "./NewItem";
import NewMachine from "./NewMachine";

const ModalPopup = ({ visibility, setVisibility, machine }) => {
  const openModal = () => {
    setVisibility(true);
  };
  const closeModal = () => {
    setVisibility(false);
  };

  return (
    <section>
      <Modal
        visible={visibility}
        width="50%"
        minHeight="265"
        effect="fadeInUp"
        onClickAway={closeModal}
      >
        {machine ? (
          <NewMachine closeModal={closeModal} />
        ) : (
          <NewItem closeModal={closeModal} />
        )}
      </Modal>
    </section>
  );
};

export default ModalPopup;
