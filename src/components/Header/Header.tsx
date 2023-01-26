import { UserInfo } from '../../model/userInfo';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import './header.css';

export interface HeaderProps {
    userInfo: UserInfo;
    setUserInfo: React.Dispatch<UserInfo | {}>
}

const Header = (props: HeaderProps) => {
    const cookies = new Cookies();
    const {userInfo, setUserInfo} = props;
    const navigate = useNavigate();

    const onLogout = () => {
        cookies.set("user", "");
        setUserInfo({});
        navigate("/");
    }

    return (
        <div className="header">
            <div className="sub-title">
                Daily NASA Image Viewer
            </div>
            <div>
                {userInfo?.username ? <button className="logout" onClick={onLogout}>Logout</button> : null}
            </div>
        </div>
    )
}

export default Header