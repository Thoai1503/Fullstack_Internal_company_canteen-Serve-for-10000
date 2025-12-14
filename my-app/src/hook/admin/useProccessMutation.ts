import { processRequest } from "@/service/cancallationRequest";
import { CancellationRequest } from "@/types/cancelationRequest";
import { Order } from "@/types/order";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useProccessMutation = (
  // onSuccessCallBack: (item: Order) => void,

  item: Order,
  admin_id: number
) => {
  const [feedBack, setFeedBack] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFeedBack(value);
  };

  const handleSubmit = () => {
    send({
      id: item.id,
      payload: {
        cancellation_admin_note: feedBack,
        cancellation_processed_by: admin_id,
        cancellation_status: 2,
      },
    });
  };
  const handleDenied = () => {
    send({
      id: item.id,
      payload: {
        cancellation_admin_note: feedBack,
        cancellation_processed_by: admin_id,
        cancellation_status: 3,
      },
    });
  };
  const { mutate: send } = useMutation({
    mutationFn: ({
      payload,
      id,
    }: {
      payload: Partial<CancellationRequest>;
      id: number;
    }) => processRequest(payload, id),
    onSuccess: (data) => {
      alert("Data: " + JSON.stringify(data));
    },
    onError: (err) => {
      alert("Error: " + err);
    },
  });
  return { handleChange, handleSubmit, handleDenied, feedBack };
};
