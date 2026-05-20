import Navbar from '@/components/shared/Navbar';
import { ToastContainer } from 'react-toastify';


const Layout = ({children}) => {
    return (
        <>
        <Navbar/>
            {children}
            <ToastContainer/>
        </>
    );
};

export default Layout;