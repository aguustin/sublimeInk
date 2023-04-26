import { useContext } from 'react';
import './adminAccount.css';
import AdminContext from '../../context/adminContext';
import {useNavigate} from "react-router-dom";

const AdminAccount = () => {

    const {authAdminContext} = useContext(AdminContext);
    const navigate = useNavigate();

    const authAdmin = async (e) => {
        e.preventDefault();

        const adminObject = {
            username: e.target.elements.username.value,
            password: e.target.elements.password.value,
            repitePassword: e.target.elements.repitePassword.value
        }

        let sessionLength = await authAdminContext(adminObject);

        if(sessionLength >= 1){
            navigate("/");
        }else{
            console.log("nada");
        }
    }

    return(
        <div className='adminAccount'>
            <form onSubmit={(e) => authAdmin(e)}>
                <div className='form-title'>
                    <h2>ADMIN ACCOUNT</h2>
                </div>
                <div className='form-group'>
                    <input className='form-input' type="text" name="username" placeholder=" "></input>
                    <label className='form-label'>Username</label>
                </div>
                <div className='form-group'>
                    <input className='form-input' type="password" name="password" placeholder=" "></input>
                    <label className='form-label'>Password</label>
                </div>
                <div className='form-group'>
                    <input className='form-input' type="password" name="repitePassword" placeholder=" "></input>
                    <label className='form-label'>Repite password</label>
                </div>
                <button onSubmit={(e) => authAdmin(e)}>Verificar</button>
            </form>
        </div>
    )
}

export default AdminAccount;