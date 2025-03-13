import { CategoryEntity } from "./CategoryEntity";
import axios from "axios";

export class CategoriesAPI {
  static baseUrl = "http://127.0.0.1:3000/categories";

  static async getCategories() {
    const response = await axios.get<CategoryEntity[]>(this.baseUrl);
    return response.data;
  }

  static async createCategory(category: CategoryEntity) {
    console.log("calling " + CategoriesAPI.baseUrl);

    const response = await fetch(CategoriesAPI.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const createdCategory = await response.json();
    return createdCategory;
  }

  static async removeCategory(id: number) {
    console.log(`Deleting category with ID: ${id}`);

    // Correct the URL here
    const response = await fetch(`${CategoriesAPI.baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const deletedCategory = await response.json();
    console.log("Category deleted", deletedCategory);
    return deletedCategory;
  }
}
