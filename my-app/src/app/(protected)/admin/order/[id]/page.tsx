import { OrderStatusHistory } from "@/types/orderStatusHistory";
import axios from "axios";
import { cookies } from "next/headers";

import moment from "moment";
import { redirect } from "next/navigation";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user_id = 6;
  if (!user_id) {
    return redirect("/login");
  }
  const { id } = await params;

  console.log("Id: " + id);

  const { data: orders } = await axios.get(
    `http://backend:8080/orderitem/order/${id}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );

  // TODO: Thêm API calls để lấy dữ liệu đơn hàng và lịch sử
  // const { data: orderDetail } = await axios.get(`http://localhost:8000/Thoai-pro-spring/order/${id}`, {...});
  const { data: statusHistorys } = await axios.get<OrderStatusHistory[]>(
    `http://backend:8080/order-status-history/order/${id}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
  console.log("Status historys:", statusHistorys);

  const orderDetail = {
    id: id,
    customer: {
      name: "Nguyễn Văn A",
      phone: "0123456789",
      email: "customer@example.com",
      address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
    },
    status: "processing", // pending, processing, shipping, completed, cancelled
    createdAt: "2024-12-04 10:30:00",
    totalAmount: orders.reduce(
      (sum: number, item: any) => sum + item.total_price,
      0
    ),
  };

  const statusHistory = [
    {
      id: 1,
      status: "pending",
      statusLabel: "Chờ xác nhận",
      changedBy: "Khách hàng",
      changedAt: "2024-12-04 10:30:00",
      note: "Đơn hàng được tạo",
    },
    {
      id: 2,
      status: "processing",
      statusLabel: "Đang chuẩn bị",
      changedBy: "Admin - Trần Thị B",
      changedAt: "2024-12-04 10:35:00",
      note: "Xác nhận đơn hàng và bắt đầu chuẩn bị",
    },
  ];

  const getStatusBadgeClass = (status: string) => {
    const statusClasses = {
      pending: "badge bg-warning text-dark",
      processing: "badge bg-info text-white",
      shipping: "badge bg-primary",
      completed: "badge bg-success",
      cancelled: "badge bg-danger",
    };
    return (
      statusClasses[status as keyof typeof statusClasses] ||
      "badge bg-secondary"
    );
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: "Chờ xác nhận",
      processing: "Đang chuẩn bị",
      shipping: "Đang giao hàng",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
    };
    return labels[status as keyof typeof labels] || status;
  };
  const renderByCancellationStatus = (status: number) => {
    switch (status) {
      case 1:
        return (
          <span className="badge bg-warning text-dark">Đang chờ duyệt huỷ</span>
        );
      case 2:
        return (
          <span className="badge bg-primary text-light">Đã duyệt huỷ</span>
        );
      case 3:
        return <span className="badge bg-danger text-light">Từ chối huỷ</span>;
      case 4:
        return (
          <span className="badge bg-danger text-light">Huỷ thanh toán</span>
        );
      default:
        return (
          <span className="badge bg-secondary-subtle text-secondary">
            Chưa có yêu cầu
          </span>
        );
    }
  };

  return (
    <div
      className="container my-4"
      style={{ height: "95vh", overflow: "auto" }}
    >
      {/* Header */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2 className="card-title mb-2">
                Chi tiết đơn hàng #{orderDetail.id}
              </h2>
              <p className="text-muted mb-0">
                <i className="bi bi-clock me-2"></i>
                Đặt lúc: {orderDetail.createdAt}
              </p>
            </div>
            <div>
              <span
                className={getStatusBadgeClass(orderDetail.status)}
                style={{ fontSize: "1rem", padding: "0.5rem 1rem" }}
              >
                {/* {getStatusLabel(orderDetail.status)} */}
                {statusHistorys[statusHistorys.length - 1]
                  ?.new_cancellation_status &&
                statusHistorys[statusHistorys.length - 1]
                  ?.new_cancellation_status != 0
                  ? getStatusLabel("cancelled")
                  : getStatusLabel("completed")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Thông tin khách hàng */}
        <div className="col-lg-8 mb-4">
          <div className="card h-100">
            <div className="card-header text-primary bg-light">
              <h5 className="mb-0">
                <i className="bi bi-person-circle me-2"></i>
                Thông tin khách hàng
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-person-fill text-muted me-3 fs-5"></i>
                    <div>
                      <small className="text-muted d-block">Họ tên</small>
                      <strong>{orderDetail.customer.name}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-telephone-fill text-muted me-3 fs-5"></i>
                    <div>
                      <small className="text-muted d-block">
                        Số điện thoại
                      </small>
                      <strong>{orderDetail.customer.phone}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-envelope-fill text-muted me-3 fs-5"></i>
                    <div>
                      <small className="text-muted d-block">Email</small>
                      <strong>{orderDetail.customer.email}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-geo-alt-fill text-muted me-3 fs-5"></i>
                    <div>
                      <small className="text-muted d-block">
                        Địa chỉ giao hàng
                      </small>
                      <strong>{orderDetail.customer.address}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tổng quan đơn hàng */}
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-header bg-light text-primary">
              <h5 className="mb-0">
                <i className="bi bi-cart-check me-2"></i>
                Tổng quan
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span className="text-muted">Số món</span>
                <strong>
                  {orders.reduce(
                    (sum: number, item: any) => sum + item.quantity,
                    0
                  )}
                </strong>
              </div>
              <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span className="text-muted">Tạm tính</span>
                <strong>
                  {orderDetail.totalAmount.toLocaleString("vi-VN")} ₫
                </strong>
              </div>
              <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span className="text-muted">Phí vận chuyển</span>
                <strong className="text-success">Miễn phí</strong>
              </div>
              <div className="d-flex justify-content-between align-items-center pt-3">
                <span className="fs-5 fw-bold">Tổng cộng</span>
                <span className="fs-4 fw-bold text-primary">
                  {orderDetail.totalAmount.toLocaleString("vi-VN")} ₫
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách món ăn */}
      <div className="card mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">Danh sách món ăn</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th
                    scope="col"
                    className="text-center"
                    style={{ width: "60px" }}
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-center"
                    style={{ width: "100px" }}
                  >
                    Hình ảnh
                  </th>
                  <th scope="col">Tên món</th>
                  <th
                    scope="col"
                    className="text-center"
                    style={{ width: "120px" }}
                  >
                    Số lượng
                  </th>
                  <th
                    scope="col"
                    className="text-end"
                    style={{ width: "150px" }}
                  >
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item: any, index: number) => (
                  <tr key={item.id || index}>
                    <th scope="row" className="align-middle text-center">
                      {index + 1}
                    </th>
                    <td className="align-middle text-center">
                      <img
                        src={`http://localhost:8000/Thoai-pro-spring/upload/${item?.food.image}`}
                        alt={item.food.name}
                        className="rounded"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td className="align-middle">
                      <strong>{item.food.name}</strong>
                    </td>
                    <td className="align-middle text-center">
                      <span className="badge bg-secondary">
                        x{item.quantity}
                      </span>
                    </td>
                    <td className="align-middle text-end">
                      <strong className="text-primary">
                        {item.total_price.toLocaleString("vi-VN")} ₫
                      </strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Lịch sử thay đổi trạng thái */}
      <div className="card">
        <div className="card-header bg-white">
          <h5 className="mb-0">Lịch sử thay đổi trạng thái</h5>
        </div>
        <div className="card-body">
          <div className="timeline">
            {/* {statusHistory.map((history: any, index: number) => (
              <div
                key={history.id}
                className="timeline-item mb-4 position-relative"
              >
                <div className="row">
                  <div className="col-auto">
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center ${
                        index === statusHistory.length - 1
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                      style={{ width: "40px", height: "40px" }}
                    >
                      <i className="bi bi-circle-fill text-white"></i>
                    </div>
                    {index < statusHistory.length - 1 && (
                      <div
                        className="bg-secondary position-absolute"
                        style={{
                          width: "2px",
                          height: "calc(100% + 1rem)",
                          left: "19px",
                          top: "40px",
                        }}
                      ></div>
                    )}
                  </div>
                  <div className="col">
                    <div className="card border">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <span
                              className={getStatusBadgeClass(history.status)}
                            >
                              {history.statusLabel}
                            </span>
                            <p className="mt-2 mb-0">{history.note}</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center text-muted small mt-2">
                          <i className="bi bi-person me-1"></i>
                          <span className="me-3">{history.changedBy}</span>
                          <i className="bi bi-clock me-1"></i>
                          <span>{history.changedAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))} */}
            <div key={0} className="timeline-item mb-4 position-relative">
              <div className="row">
                <div className="col-auto">
                  <div
                    className={`rounded-circle d-flex align-items-center justify-content-center bg-secondary `}
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i className="bi bi-circle-fill text-white"></i>
                  </div>

                  <div
                    className="bg-secondary position-absolute"
                    style={{
                      width: "2px",
                      height: "calc(100% + 1rem)",
                      left: "19px",
                      top: "40px",
                    }}
                  ></div>
                </div>
                <div className="col">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          {/* <span
                              className={getStatusBadgeClass(history.status)}
                            >
                              {history.statusLabel}
                            </span> */}

                          <span className="badge bg-info text-light">
                            Đơn hàng được khởi tạo
                          </span>

                          <p className="mt-2 mb-0">
                            Đơn hàng được khởi tạo, chờ thanh toán
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center text-muted small mt-2">
                        <i className="bi bi-person me-1"></i>
                        <span className="me-3">
                          Khách hàng {orders.user_id}
                        </span>
                        <i className="bi bi-clock me-1"></i>
                        <span>{orderDetail.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {statusHistorys.map((history: OrderStatusHistory, index) => {
              let created_date = new Date(history.created_at).toLocaleString(
                "vi-VN"
              );
              const m = moment(history.created_at);
              created_date = m.format("DD-MM-YYYY HH:mm:ss");
              const orderDate = new Date(history.created_at).toLocaleDateString(
                "en-GB"
              );
              return (
                <div
                  key={history.id}
                  className="timeline-item mb-4 position-relative"
                >
                  <div className="row">
                    <div className="col-auto">
                      <div
                        className={`rounded-circle d-flex align-items-center justify-content-center ${
                          index === statusHistorys.length - 1
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="bi bi-circle-fill text-white"></i>
                      </div>
                      {index < statusHistorys.length - 1 && (
                        <div
                          className="bg-secondary position-absolute"
                          style={{
                            width: "2px",
                            height: "calc(100% + 1rem)",
                            left: "19px",
                            top: "40px",
                          }}
                        ></div>
                      )}
                    </div>
                    <div className="col">
                      <div className="card border">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              {/* <span
                              className={getStatusBadgeClass(history.status)}
                            >
                              {history.statusLabel}
                            </span> */}
                              {history.new_cancellation_status &&
                              history.new_cancellation_status != 0 ? (
                                renderByCancellationStatus(
                                  history.new_cancellation_status
                                )
                              ) : history.new_status == 3 ? (
                                <span className="badge bg-danger text-light">
                                  Huỷ thanh toán
                                </span>
                              ) : (
                                <span className="badge bg-success text-light">
                                  Đã thanh toán
                                </span>
                              )}
                              <p className="mt-2 mb-0">{history.note}</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center text-muted small mt-2">
                            <i className="bi bi-person me-1"></i>
                            <span className="me-3">
                              {history.changed_by_role == "admin"
                                ? `Admin - ${history.changed_by_user.email}`
                                : `Khách hàng `}
                            </span>
                            <i className="bi bi-clock me-1"></i>
                            <span>{created_date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
