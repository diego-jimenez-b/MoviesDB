import { createPortal } from 'react-dom';
import { Fragment } from 'react/cjs/react.production.min';
import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const ModalOverlay = (props) => {
  const modalClasses = `${classes.modal} ${
    props.className ? props.className : ''
  }`;

  return <div className={modalClasses}>{props.children}</div>;
};

const Modal = (props) => {
  const overlays = document.getElementById('overlays');
  return (
    <Fragment>
      {createPortal(<Backdrop onClick={props.onClose} />, overlays)}
      {createPortal(
        <ModalOverlay className={props.className}>
          {props.children}
        </ModalOverlay>,
        overlays
      )}
    </Fragment>
  );
};

export default Modal;
