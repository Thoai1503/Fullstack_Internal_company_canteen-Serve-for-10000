import { Order } from "@/types/order";
import React, { useState } from "react";
import ResponseCancelModal from "./ResponseCancelModal";
import { useProccessMutation } from "@/hook/admin/useProccessMutation";

const OrderItem = ({ item }: { item: Order }) => {
  const admin = JSON.parse(localStorage.getItem("user")!) as any;

  const { handleChange, handleSubmit, handleDenied, feedBack } =
    useProccessMutation(item, admin.id);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [order, setOrder] = useState(item);
  const {
    cancellation_status,
    cancellation_request_reason,
    cancellation_admin_note,
  } = item.cancellation_status;
  const renderStatus = (status: number) => {
    switch (status) {
      case 1:
        return (
          <span className="badge bg-warning-subtle text-warning">
            Đang chờ duyệt huỷ
          </span>
        );
      case 2:
        return (
          <span className="badge bg-primary-subtle text-primary">
            Đã duyệt huỷ
          </span>
        );
      case 3:
        return (
          <span className="badge bg-danger-subtle text-danger">
            Từ chối huỷ
          </span>
        );
      case 4:
        return (
          <span className="badge bg-danger-subtle text-danger">
            Huỷ thanh toán
          </span>
        );
      default:
        return (
          <span className="badge bg-secondary-subtle text-secondary">
            Chưa có yêu cầu
          </span>
        );
    }
  };
  let data = {
    status: "",
    badge: "",
  };
  switch (item.status) {
    case 3:
      data.status = "Đã huỷ";
      data.badge = "danger";
      break;
    case 2:
      data.status = "Đã thanh toán";
      data.badge = "success";
      break;
    case 1:
      data.status = "Đang thanh toán";
      data.badge = "warning";
      break;
  }

  const created_date = new Date(order.created_at).toLocaleString("vi-VN");
  return (
    <>
      <tr>
        <th scope="row">{order.id}</th>
        <td>{order.user.email}</td>
        <td>{order.total_amount}</td>
        <td>{created_date}</td>
        <td>
          {cancellation_status != 0 ? (
            renderStatus(cancellation_status)
          ) : (
            <span
              className={`badge bg-${data.badge}-subtle text-${data.badge}`}
            >
              {data.status}
            </span>
          )}
        </td>
        <td>
          <a href={`/admin/order/${order.id}`} className="btn btn-outline-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </a>
          {cancellation_status == 1 && (
            <button
              className="btn btn-outline-primary mx-2"
              onClick={handleShow}
            >
              Xem
            </button>
          )}
        </td>
      </tr>
      <ResponseCancelModal
        handleClose={handleClose}
        handleChange={handleChange}
        handleDeny={handleDenied}
        handleSubmit={handleSubmit}
        show={show}
        cancellation_request_reason={cancellation_request_reason}
        feedBack={feedBack}
      />
    </>
  );
};

export default OrderItem;
