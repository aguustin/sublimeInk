import axios from "axios";

export const saveAdminRequest = () => axios.post("/saveAdmin");

export const authAdminRequest = (adminObject) => axios.post("/authAdmin", adminObject);

export const deleteAllAdminsRequest = () => axios.delete("/deleteAllAdmins");
