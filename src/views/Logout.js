import { useEffect } from "react";
import { useHistory } from "react-router";
import useApi from '../services/api'

export default () => {
    const history = useHistory();
    const api = useApi();

    useEffect(()=>{
        const doLogout = async () => {
            await api.logout();
            history.push('/login');
        }
        doLogout();
    }, []);
    return null;
}