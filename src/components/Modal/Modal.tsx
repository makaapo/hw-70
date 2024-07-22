import React from 'react';

interface Props extends React.PropsWithChildren {
  show: boolean;
  onClose: React.MouseEventHandler;
}

const Modal: React.FC<Props> = ({show, onClose, children}) => {
  return (
    <>
      <div
        className="modal-backdrop show"
        style={{display: show ? 'block' : 'none'}}
      />
      <div
        className="modal show"
        style={{display: show ? 'block' : 'none'}}
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Contact Information</h1>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;