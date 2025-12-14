import { uploadByFoodId } from "@/service/foodItem";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useAddImageMutation = (id: number) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleSubmit = () => {
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("imageFile", file);
    });
    upload({ id, food: formData });
  };

  const { mutate: upload } = useMutation({
    mutationFn: ({ id, food }: { id: number; food: any }) =>
      uploadByFoodId(id, food),
    onSuccess: (data) => {
      alert(data);
    },
    onError: (error) => {
      alert(error);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      //read file info
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
  return { selectedImages, handleFileChange, handleSubmit };
};
