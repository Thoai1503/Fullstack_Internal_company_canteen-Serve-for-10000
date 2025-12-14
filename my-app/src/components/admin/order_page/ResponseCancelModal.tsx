import React from "react";
import { Button, Modal } from "react-bootstrap";
interface ModalProp {
  handleClose: () => void;

  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  cancellation_request_reason: string | null;
  show: boolean;
  handleSubmit: () => void;
  handleDeny: () => void;
  feedBack: string;
}
const ResponseCancelModal = ({
  feedBack,
  handleDeny,
  handleSubmit,
  handleClose,
  handleChange,
  show,
  cancellation_request_reason,
}: ModalProp) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Lý do huỷ đơn</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row gt-3">
          <div className="col-12">
            <label className="form-label">Lý do:</label>
            <textarea
              name="description"
              className="form-control"
              value={cancellation_request_reason || ""}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div className="col-12 mt-3">
            <label className="form-label">Phần phản hồi của admin:</label>
            <textarea
              name="description"
              value={feedBack}
              className="form-control"
              onChange={handleChange}
              rows={4}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDeny}>
          Từ chối
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Chấp thuận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResponseCancelModal;
