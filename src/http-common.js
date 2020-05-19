import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api/notes",
  headers: {
    "Content-type": "application/json"
  }
});