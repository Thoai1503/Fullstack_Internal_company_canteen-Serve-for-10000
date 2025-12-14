import http from "@/lib/http";
import axios from "axios";

export const getConfigValueByKey = async (key: string): Promise<any> => {
  return await http
    .get(`/config/get?key=${key}`)
    .then((res) => {
      res.data;
    })
    .catch((err) => {
      throw err;
    });
};
