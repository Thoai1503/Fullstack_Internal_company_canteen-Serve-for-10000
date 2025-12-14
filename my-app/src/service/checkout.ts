import http from "@/lib/http";

export const checkOutAPI = async (
  paymentInfo: any,
  token: string
): Promise<any> => {
  return await http.post(
    `/payment?orderInfo=${paymentInfo.orderInfo}&ordertype=other&amount=${paymentInfo.amount}&bankcode=${paymentInfo.bankCode}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
};
