"use client";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
interface ModalProp {
  handleClose: () => void;
  handleSubmit: () => void;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  content: string;
  show: boolean;
}
const CancelRequestModal = ({
  handleClose,
  show,
  handleChange,
  handleSubmit,
  content,
}: ModalProp) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Gởi yêu cầu huỷ đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row gt-3">
            <div className="col-12">
              <label className="form-label">Vui lòng nhập lý do</label>
              <textarea
                name="description"
                className="form-control"
                value={content}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CancelRequestModal;
