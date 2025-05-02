import axios from "axios";
import { CreateEntryDto } from "./EntryEntity";

export class EntriesAPI {
  static baseUrl = "http://127.0.0.1:3000/entries";

  static async getEntries() {
    const response = await axios.get<CreateEntryDto[]>(this.baseUrl);
    return response.data;
  }

  static async createEntry(entry: CreateEntryDto) {
    console.log("calling " + EntriesAPI.baseUrl);
    console.log("entry to send to db", entry);

    const response = await fetch(EntriesAPI.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const createdEntry = await response.json();
    return createdEntry;
  }

  static async removeEntry(id: number) {
    console.log(`Deleting entry with ID: ${id}`);

    // Correct the URL here
    const response = await fetch(`${EntriesAPI.baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const deletedEntry = await response.json();
    console.log("Entry deleted", deletedEntry);
    return deletedEntry;
  }
}
