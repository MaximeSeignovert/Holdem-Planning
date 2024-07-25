import { Outlet } from "react-router-dom";
import Header from '@/components/Header/Header';
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';

const Layout = () =>{

    return(
        <>
        
        <div className="flex absolute left-0 top-0 h-full w-full">
            <Sidebar/>
            <div className="flex-col h-full w-full">
                <Header />
                <Outlet />
            </div>
            
        </div>
        
        <Navbar />
        </>

    );
}

export default Layout;