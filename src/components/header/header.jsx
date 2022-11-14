import { IconLogo } from 'components/icon'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { USER_INFO_KEY } from '../../constants/common'
import { setUserInfoAction } from '../../store/actions/user.action'

import './index.scss'

export default function Header() {
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.userReducer)
    const navigate = useNavigate()

    let pathname = useLocation().pathname

    useEffect(() => {
        console.log(pathname)
        if (pathname === '/') {
            window.onscroll = function () {
                if (window.scrollY > 100) {
                    document.querySelector('.header').classList.add('fixed')
                } else {
                    document.querySelector('.header').classList.remove('fixed')
                }
            }
        } else {
            document.querySelector('.header').className = 'fixed header'
        }
    }, [pathname])

    const handleLogout = () => {
        localStorage.removeItem(USER_INFO_KEY)
        dispatch(setUserInfoAction(null))
        navigate('/')
    }

    return (
        <div className="container wrapper">
            <header className="header">
                <nav className="navbar navbar-expand-md">
                    {/* Brand */}
                    <a className="navbar-brand" onClick={() => navigate('/')}>
                        <IconLogo />
                    </a>

                    {/* Navbar links */}
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item mr-4 nav__li">
                            <a
                                className="nav-link nav__header active"
                                onClick={() => navigate('/')}
                            >
                                Home
                            </a>
                        </li>
                        <li className="nav-item mr-4 nav__li">
                            <a
                                className="nav-link nav__header"
                                target="_blank"
                                href="https://www.facebook.com/hthanh711"
                            >
                                Contact
                            </a>
                        </li>
                        <li className="nav-item mr-4 nav__li">
                            <a
                                className="nav-link nav__header"
                                target="_blank"
                                href="https://kenh14.vn/"
                            >
                                News
                            </a>
                        </li>
                        <li className="nav-item mr-4 nav__li">
                            <a
                                className="nav-link nav__header"
                                target="_blank"
                                href="https://www.vietnamworks.com/it-software-jobs-i35-en?utm_source=SEM&utm_medium=MA&utm_campaign=SEM_IT&utm_content=all&gclid=CjwKCAjwx7GYBhB7EiwA0d8oexN0aUa5UCZcJDRFy5VU_4-w8KJuHq-vgb5aOO6vZODq4lTzrGB4cxoCtGgQAvD_BwE"
                            >
                                Works
                            </a>
                        </li>
                        <div className="m-auto">
                            <div className="d-flex justify-content-center btn__display">
                                {!userState.userInfo ? (
                                    <>
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="login-btn m-0"
                                        >
                                            Login
                                        </button>
                                        <button
                                            className="register-btn m-0"
                                            onClick={() => navigate('/register-form')}
                                        >
                                            Register
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h1 className="m-0">
                                            Hello {userState.userInfo.hoTen}
                                            <sup
                                                onClick={() => navigate('/profile')}
                                                className="text-info"
                                            >
                                                <i className="far fa-eye"></i>
                                            </sup>
                                        </h1>

                                        <button onClick={handleLogout} className="logout-btn m-0">
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </ul>
                </nav>
            </header>
        </div>
    )
}
