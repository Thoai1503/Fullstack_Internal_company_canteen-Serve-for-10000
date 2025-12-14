import { CancellationRequest } from "./cancelationRequest";

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  cancel_reason: string;
  user: any;
  status: number;
  cancellation_status: CancellationRequest;

  created_at: Date;
}
