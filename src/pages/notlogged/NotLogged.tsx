import { Fragment } from "react/jsx-runtime"

const NotLogged = () => {
    const role = localStorage.getItem('roles');
    return <Fragment>
        {role}
        hãy đăng nhập bạn ơ, trên navbar có cái nút đó!!!!!!!!!!!!!!!!!!!!!!
    </Fragment>
}

export default NotLogged;