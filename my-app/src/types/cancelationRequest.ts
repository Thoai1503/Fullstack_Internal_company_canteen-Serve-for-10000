export interface CancellationRequest {
  cancellation_status: number;
  cancellation_request_reason: string | null;

  cancellation_processed_by: number | null;
  cancellation_request_date: Date | null;

  cancellation_processed_date: Date | null;
  cancellation_admin_note: string | null;
  status?: number;
}
