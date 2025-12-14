"use client";
import { FoodItem } from "@/types/foodItem";
import { FoodType } from "@/types/foodType";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: () => void;
  foodInfo: FoodItem;
  foodTypeList: FoodType[];
  setFoodList: React.Dispatch<React.SetStateAction<FoodItem[]>>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AddFoodModal({
  show,
  handleClose,
  handleChange,
  handleSubmit,
  foodInfo,
  foodTypeList,
  handleFileChange,
}: ModalProps) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên món:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên món"
                autoFocus
                name="name"
                value={foodInfo.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Giá:</Form.Label>
              <Form.Control
                type="number"
                step={0.1}
                value={foodInfo.price}
                onChange={handleChange}
                name="price"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Loại món ăn:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={foodInfo.type_id}
                onChange={handleChange}
                name="type_id"
              >
                <option>Open this select menu</option>

                {foodTypeList.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Small file input example</Form.Label>
              <Form.Control
                type="file"
                size="sm"
                name="file"
                multiple
                onChange={handleFileChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleChange}
                value={foodInfo.description}
                name="description"
              />
            </Form.Group>
          </Form>
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

export default AddFoodModal;
