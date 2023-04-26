import { createContext, useState } from "react";
import { authAdminRequest,} from "../api/adminRequest";

const AdminContext = createContext();

export const AdminContextProvider = ({children}) => {

    const [admin, setAdmin] = useState([]);

    const authAdminContext = async (adminObject) => {
        const res = await authAdminRequest(adminObject);
        localStorage.setItem("admin", JSON.stringify(res.data[0].username));
        setAdmin(JSON.parse(localStorage.getItem("admin")));
        return 1;
    }

    return(
        <AdminContext.Provider value={{authAdminContext, admin, setAdmin}}>{children}</AdminContext.Provider>
    )
}

export default AdminContext;