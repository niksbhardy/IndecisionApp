import React from 'react';
import ReactModal from 'react-modal';

const OptionModal = (props) => (
  <ReactModal
    ariaHideApp={false}
    isOpen={!!props.selectedOption}
    onRequestClose={props.handleClearSelectedOption}
    contentLabel="Selected Option"
    closeTimeoutMS={200}
    className="modal"
    >
    <h3 className="modal__title">Selected Option</h3>
    {
      props.selectedOption &&
      <p className="modal__body">{props.selectedOption}</p>
    }
    <button
      className="button"
      onClick={props.handleClearSelectedOption}>
        okay
      </button>
  </ReactModal>
);

export default OptionModal;
