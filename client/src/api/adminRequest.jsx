import axios from "axios";

export const saveAdminRequest = () => axios.post("http://localhost:4000/saveAdmin");

export const authAdminRequest = (adminObject) => axios.post("/authAdmin", adminObject);

export const deleteAllAdminsRequest = () => axios.delete("/deleteAllAdmins");
