import http from "@/lib/http";
import { CancellationRequest } from "@/types/cancelationRequest";

export const sendRequest = async (
  payload: Partial<CancellationRequest>,
  id: number,
  user_id: number
): Promise<boolean> => {
  return await http
    .post(`/cancellation_request/send/${id}/user/${user_id}`, payload)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const processRequest = async (
  payload: Partial<CancellationRequest>,
  id: number
): Promise<boolean> => {
  return await http
    .post(`/cancellation_request/processed/${id}`, payload)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
