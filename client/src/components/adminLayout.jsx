import styled from "styled-components";
import { Outlet } from "react-router-dom";
import SideBar from "./sidebar";

const AdminContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`;

const AdminPanel = styled.div`
    width: 100%;
    height: 100vh;
`

const AdminLayout = ({isOpen, setIsOpen}) => {
    return (
        <AdminContainer>
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
            <AdminPanel>
                <Outlet/>
            </AdminPanel>
        </AdminContainer>
    )
}

export default AdminLayout;