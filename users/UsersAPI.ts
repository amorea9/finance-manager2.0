import axios from "axios";
import { CreateUserDto } from "./CreateUserDto";

export class UsersAPI {
  static baseUrl = "http://127.0.0.1:3000/auth/";

  //   static async getUsers() {
  //     const response = await axios.get<CategoryEntity[]>(this.baseUrl);
  //     return response.data;
  //   }

  static async login(createUserDto: CreateUserDto) {
    console.log("calling " + `${UsersAPI.baseUrl}login`);

    const response = await fetch(`${UsersAPI.baseUrl}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createUserDto),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const loggedInUser = await response.json();
    return loggedInUser;
  }

  static async signup(createUserDto: CreateUserDto) {
    console.log("calling " + `${UsersAPI.baseUrl}signup`);

    const response = await fetch(`${UsersAPI.baseUrl}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createUserDto),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const createdUser = await response.json();
    return createdUser;
  }

  //   static async removeCategory(id: number) {
  //     console.log(`Deleting category with ID: ${id}`);

  //     // Correct the URL here
  //     const response = await fetch(`${CategoriesAPI.baseUrl}/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const deletedCategory = await response.json();
  //     console.log("Category deleted", deletedCategory);
  //     return deletedCategory;
  //   }
}
