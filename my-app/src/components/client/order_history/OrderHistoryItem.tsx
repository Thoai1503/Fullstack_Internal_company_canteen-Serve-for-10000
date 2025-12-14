"use client";
import React, { use, useEffect, useState } from "react";
import CancelRequestModal from "./CancelRequestModal";
import { useSendRequestMutation } from "@/hook/user/useSendCancelMutation";
import { Order } from "@/types/order";
import CancelDetialModal from "./CancelDetialModal";

const OrderHistoryItem = ({ item, time }: { item: Order; time: any }) => {
  // the value of time is string like "14:30:00" ,so convert it to Date object

  const [order, setOrder] = useState(item);

  useEffect(() => {
    setOrder(item);
  }, [item]);

  // useEffect(() => {
  //   console.log("Order updated: ", order);
  // }, [order]);

  const onSuccess = (item: Order) => {
    console.log("OnSuccess: " + item);

    handleClose();
    setOrder((pre) => ({
      ...pre,
      cancellation_status: {
        ...pre.cancellation_status,
        cancellation_status: 1,
      },
    }));
  };
  const { handleChange, handleSubmit, content } = useSendRequestMutation(
    onSuccess,
    item,
    time
  );

  const currentDate = new Date().toLocaleDateString("en-GB");
  console.log("Current time: " + currentDate);
  const prepareTime = time;
  console.log("Prepare time: " + prepareTime);
  const [showIndo, setShowInfo] = useState(false);

  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    // const time = new Date().toLocaleTimeString("vi-VN");
    const currentTime = new Date().toLocaleTimeString("en-GB");
    console.log("Current time: " + currentTime);
    const prepareTime = time;
    console.log("Prepare time: " + prepareTime);
    if (currentTime > time) {
      alert("Đơn hàng đang được chuẩn bị, không thể huỷ đơn!");
      return;
    }
    setShow(true);
  };
  const {
    cancellation_status,
    cancellation_request_reason,
    cancellation_admin_note,
  } = item.cancellation_status;
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

  const renderCancelStatus = (status: number) => {
    switch (status) {
      case 4:
        return (
          <span className={`badge bg-danger-subtle text-danger`}>
            Huỷ thanh toán
          </span>
        );
      case 3:
        return (
          <>
            <span className={`badge bg-danger-subtle text-danger`}>
              Từ chối
            </span>
          </>
        );
      case 2:
        return (
          <span className={`badge bg-primary-subtle text-primary`}>
            Chấp nhận huỷ
          </span>
        );
      case 1:
        return (
          <>
            <span className={`badge bg-warning-subtle text-warning`}>
              Chờ duyệt huỷ
            </span>
          </>
        );
    }
  };

  const created_date = new Date(item.created_at).toLocaleString("vi-VN");
  const orderDate = new Date(item.created_at).toLocaleDateString("en-GB");
  return (
    <>
      <tr>
        <td scope="col">{order.id}</td>
        <td scope="col">
          {order.status == 3 ? "0" : order.total_amount.toLocaleString("vi-VN")}{" "}
          VNĐ
        </td>
        <td>
          {cancellation_status != 0 ? (
            <>{renderCancelStatus(cancellation_status)}</>
          ) : (
            <span
              className={`badge bg-${data.badge}-subtle text-${data.badge}`}
            >
              {data.status}
            </span>
          )}
        </td>
        <td scope="col">{created_date}</td>
        <td scope="col">
          <a
            href={`/order_detail/${order.id}`}
            className="btn btn-outline-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-journal-richtext"
              viewBox="0 0 16 16"
            >
              <path d="M7.5 3.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047L11 4.75V7a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 7v-.5s1.54-1.274 1.639-1.208M5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
            </svg>
          </a>
          {cancellation_status == 0 &&
          order.status == 2 &&
          new Date().toLocaleTimeString("en-GB") < time &&
          orderDate === currentDate ? (
            <button className="btn btn-danger mx-2" onClick={handleShow}>
              Huỷ
            </button>
          ) : (
            //  renderCancelStatus(cancellation_status)
            <></>
          )}
          {cancellation_status != 0 && cancellation_status != 4 && (
            <button
              className="btn btn-outline-secondary mx-2"
              onClick={handleShowInfo}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chat-left-dots"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
            </button>
          )}
        </td>
      </tr>
      <CancelDetialModal
        item={item}
        show={showIndo}
        handleClose={handleCloseInfo}
      />
      <CancelRequestModal
        handleClose={handleClose}
        show={show}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        content={content}
      />
    </>
  );
};

export default OrderHistoryItem;
