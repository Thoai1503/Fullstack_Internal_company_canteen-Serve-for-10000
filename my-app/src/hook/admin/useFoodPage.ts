import { createNewFood } from "@/service/foodItem";
import { FoodItem } from "@/types/foodItem";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { foodTypeQuery } from "@/query/foodType";

export const useFoodPage = (
  setFoodList: React.Dispatch<React.SetStateAction<FoodItem[]>>
) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const { data: list_data } = useQuery(foodTypeQuery.list);
  const [foodInfo, setFoodInfo] = useState<FoodItem>({
    id: 0,
    name: "",
    type_id: 0,
    description: "",
    type_name: "",
    price: 0,
    image: "default.jpg",
    is_vegetarian: false,
    is_enabled: true,
    slug: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFoodInfo((pre) => ({ ...pre, [name]: value }));
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("foodItem", JSON.stringify(foodInfo));
    selectedFiles.forEach((file) => {
      formData.append("file", file);
    });
    if (foodInfo.name == "") {
      alert("Vui lòng nhập tên món ăn");
      return;
    }
    if (foodInfo.type_id == 0) {
      alert("Vui lòng chọn loại món");
      return;
    }
    if (foodInfo.price == 0) {
      alert("Vui lòng nhập giá");
      return;
    }
    createFood(foodInfo);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileContent = file;
          console.log(e);
          console.log("File content:", fileContent);
        };
        reader.onerror = (e) => {
          console.error("Error reading file:", e?.target?.error);
        };
        reader.readAsDataURL(file);
      });
      setSelectedFiles((prev) => [...prev, ...files]);

      // tạo preview
      const filesArray = files.map((file) => URL.createObjectURL(file));
      setSelectedImages((prev) => [...prev, ...filesArray]);
    }
  };

  const { mutate: createFood } = useMutation({
    mutationFn: (food: any) => createNewFood(food),
    onSuccess: (data) => {
      console.log("Data: " + JSON.stringify(data));
      // window.location.href = "/admin/food";
      setFoodList((pre) => [...pre, data]);
    },
    onError: (error) => {
      alert(error);
    },
  });

  return { handleChange, handleSubmit, foodInfo, list_data, handleFileChange };
};
