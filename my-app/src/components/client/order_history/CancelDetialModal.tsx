import { Order } from "@/types/order";
import React from "react";
import { Button, Modal } from "react-bootstrap";

const CancelDetialModal = ({
  item,
  show,
  handleClose,
}: {
  item: Order;
  show: boolean;
  handleClose: () => void;
}) => {
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
              value={item.cancellation_status.cancellation_request_reason || ""}
              rows={4}
            />
          </div>
          <div className="col-12 mt-3">
            <label className="form-label">Phần phản hồi của admin:</label>
            <textarea
              name="description"
              value={item.cancellation_status.cancellation_admin_note || ""}
              className="form-control"
              rows={4}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelDetialModal;
