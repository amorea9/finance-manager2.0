import { useQuery } from "@tanstack/react-query";
import { CategoriesAPI } from "./CategoriesAPI";

export const useGetCategories = () => {
  // If you have some custom code to run before the query, you can add it here
  return useQuery({
    queryKey: ["categories"],
    queryFn: CategoriesAPI.getCategories,
  });
};
