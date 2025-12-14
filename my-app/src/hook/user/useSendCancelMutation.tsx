import { sendRequest } from "@/service/cancallationRequest";
import { CancellationRequest } from "@/types/cancelationRequest";
import { Order } from "@/types/order";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useSendRequestMutation = (
  onSuccessCallBack: (item: Order) => void,
  item: Order,
  time: any
) => {
  console.log("User_id in hook: " + item.user_id);
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const currentTime = new Date().toLocaleTimeString("en-GB");
    console.log("Current time: " + currentTime);
    if (currentTime > time) {
      alert("Đơn hàng đang được chuẩn bị, không thể huỷ đơn!");
      return;
    }
    send({
      id: item.id,
      payload: { cancellation_request_reason: content, cancellation_status: 1 },
      user_id: item.user_id,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setContent(value);
  };
  const { mutate: send } = useMutation({
    mutationFn: ({
      payload,
      id,
      user_id,
    }: {
      payload: Partial<CancellationRequest>;
      id: number;
      user_id: number;
    }) => sendRequest(payload, id, user_id),
    onSuccess: (data) => {
      if (!data) {
        alert("Đơn hàng đang được chuẩn bị, không thể huỷ đơn!");
        return;
      }

      onSuccessCallBack(item);
    },
    onError: (err) => {
      alert("Error: " + err);
    },
  });
  return { content, handleSubmit, handleChange };
};
