import React from "react";

const PaymentMethod = ({
  paymentList,
  selectedMethod,
  handleSelectPaymentMethod,
}: {
  paymentList: any;
  selectedMethod: any;
  handleSelectPaymentMethod: React.Dispatch<React.SetStateAction<any>>;
}) => {
  return (
    <div className="head">
      <h5>
        <strong>Phương thức thanh toán</strong>
      </h5>
      <p className="text">Chọn phương thức thanh toán phù hợp với bạn</p>
      <div className="row container">
        {paymentList.map((item: any) => (
          <div className="col-lg-6 method-item py-2">
            <div className="position-relative h-100">
              <div
                className="p-3 rounded h-100"
                style={{
                  border:
                    selectedMethod == item.method
                      ? "1px solid  #06b6d4"
                      : "1px solid  lightgray",
                  overflow: "hidden",
                }}
                onClick={() => handleSelectPaymentMethod(item.method)}
              >
                <div className="d-flex">
                  <img
                    width={20}
                    src="/paylogo/0oxhzjmxbksr1686814746087.png"
                  ></img>
                  <h5 className="text mb-1">{item.head}</h5>
                </div>
                <p className="text mb-0">{item.title}</p>
              </div>
              {/* Icon checkmark for VNPAY */}
              {selectedMethod === item.method && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "0",
                    height: "0",
                    borderTop: "35px solid #06b6d4",
                    borderLeft: "35px solid transparent",
                    borderTopRightRadius: "0.375rem",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="white"
                    viewBox="0 0 16 16"
                    style={{
                      position: "absolute",
                      top: "-28px",
                      right: "4px",
                    }}
                  >
                    <path d="M13.485 1.929a.75.75 0 0 1 .09 1.06l-7 8a.75.75 0 0 1-1.08.04l-3-3a.75.75 0 0 1 1.06-1.06l2.47 2.47 6.47-7.41a.75.75 0 0 1 1.06-.1z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
