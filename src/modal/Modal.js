import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const portalElement = document.getElementById('overlay-root');

const Modal = (props) => {
    return (
        props.open &&
        <React.Fragment>
            {ReactDOM.createPortal(
                <div
                    className="backdrop"
                    onClick={() => (props.onClose())}
                />,
                portalElement
            )}
            {ReactDOM.createPortal(
                <div className="modal">
                    <div className="content">{props.children}</div>
                </div>,
                portalElement
            )}
        </React.Fragment>
    );
};

export default Modal;