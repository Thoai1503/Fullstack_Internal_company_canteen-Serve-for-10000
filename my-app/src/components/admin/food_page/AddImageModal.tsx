import { useAddImageMutation } from "@/hook/admin/useAddImageMutation";
import Image from "next/image";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
interface AddImageModalProps {
  show: boolean;
  handleClose: () => void;
  id: number;
}
function AddImageModal({ show, handleClose, id }: AddImageModalProps) {
  const { selectedImages, handleFileChange, handleSubmit } =
    useAddImageMutation(id);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} multiple />
          </Form.Group>
          <div className="mt-4">
            {selectedImages.length > 0 &&
              selectedImages.map((src, index) => (
                <img key={index} src={src} alt={src} />
              ))}
          </div>
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
}

export default AddImageModal;
