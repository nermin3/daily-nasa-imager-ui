import { ChangeEvent, useState, useEffect } from 'react';
import { UserInfo } from '../../model/userInfo';
import { LoginService } from '../../service/loginService';
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs'
import Cookies from 'universal-cookie';
import './login.css';

export interface LoginProps {
    userInfo: UserInfo;
    setUserInfo: React.Dispatch<UserInfo | {}>;
}

const Login = (props: LoginProps) => {
    const {userInfo, setUserInfo} = props;

    const loginService = new LoginService();
    const navigate = useNavigate();
    const cookies = new Cookies();

    const [newUserInfo, setNewUserInfo] = useState({username: "", password: ""});
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if(userInfo && userInfo.username && userInfo.password) {
          navigate("/image");
        }
      }, []);

    const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewUserInfo(previousValue => {
            return {...previousValue, username: event.target.value};
        });
    };

    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewUserInfo(previousValue => {
            return {...previousValue, password: event.target.value};
        });
    };

    const onlogin = () => {
        if (newUserInfo && newUserInfo.username && newUserInfo.password) {
            loginService.login({username: newUserInfo.username}).then((resp: Array<UserInfo>) => {
                const user = resp.find(user => bcrypt.compareSync(newUserInfo.password, user.password));
                if (user) {
                    setUserInfo(user);
                    cookies.set("user", JSON.stringify(user));
                    navigate("/image");
                } else {
                    setErrorMsg("Username or password is incorrect!");
                }
            });
        }
    };

    const onRegister = () => {
        if (newUserInfo && newUserInfo.username && newUserInfo.password) {
            const hashedUserInfo = {...newUserInfo, password: bcrypt.hashSync(newUserInfo.password)};
            loginService.register(hashedUserInfo).then(resp => {
                if (!resp.error) {
                    setUserInfo(resp);
                    cookies.set("user", JSON.stringify(resp));
                    navigate("/image");
                } else if (resp.error.code = 11000) {
                    setErrorMsg("Username already exists!");
                } else {
                    setErrorMsg("There was an error, please try again later.");
                }
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login">
                <div className="login-title">Login</div>
                <input className="input" type="text" onChange={onUsernameChange} />
                <input className="input" type="password" onChange={onPasswordChange} />
                <div>
                    <button className="button" onClick={onlogin}>Login</button>
                    <button className="button" onClick={onRegister}>Register</button>
                </div>
                {errorMsg ? <div className="error">{errorMsg}</div> : null}
            </div>
        </div>
    )
}

export default Login