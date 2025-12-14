export interface OrderStatusHistory {
  //   id: 50;
  //   order_id: 67;
  //   old_status: 2;
  //   new_status: 3;
  //   changed_by: 6;
  //   old_cancellation_status: 1;
  //   new_cancellation_status: 2;
  //   changed_by_role: "admin     ";
  //   note: "Duyệt hủy: Ko cu";
  //   reason: null;
  //   created_at: "2025-12-04T14:40:28.48";
  id: number;
  order_id: number;
  old_status: number;
  new_status: number;
  changed_by: number;
  old_cancellation_status: number | null;
  new_cancellation_status: number | null;
  changed_by_role: string;
  changed_by_user: {
    email: string;
  };
  note: string | null;
  reason: string | null;
  created_at: Date;
}
