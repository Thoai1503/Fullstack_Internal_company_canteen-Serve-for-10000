import { updateInventoryStock } from "@/service/inventory";
import { Dispatch } from "@reduxjs/toolkit";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useInventoryItemMutation = (
  onSuccessCallback?: (message: string) => void
) => {
  const queryClient = useQueryClient();
  const { mutate: updateStock } = useMutation({
    mutationFn: ({ id, stock }: { id: number; stock: number }) =>
      updateInventoryStock(id, stock),
    onSuccess: (data) => {
      console.log("Data: " + data);
      onSuccessCallback &&
        onSuccessCallback("Cập nhật kho thành công: " + data);
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
    onError: (error) => alert("Error: " + error.message),
  });

  return { updateStock };
};
