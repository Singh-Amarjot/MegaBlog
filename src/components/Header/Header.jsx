import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import Logo from '../Logo'
import Container from '../Container'


function Header() {
    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    // console.log(isLoggedIn)
    const navItems = [
        {
            name: "Home",
            slug: "/",
            isActive: true
        },
        {
            name: "Signup",
            slug: "/signup",
            isActive: !isLoggedIn
        },
        {
            name: "Login",
            slug: "/login",
            isActive: !isLoggedIn
        },
        {
            name: "All-Posts",
            slug: "/all-posts",
            isActive: isLoggedIn
        },
        {
            name: "My-Posts",
            slug: "/my-posts",
            isActive: isLoggedIn
        },
        {
            name: "Add-Post",
            slug: "/add-post",
            isActive: isLoggedIn
        }

    ]
    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to="/"><Logo width='70px' /></Link>
                    </div>
                    <ul className='flex ml-auto'>
                 {/* // add the nav items .. loop on the nav items array */}
                        {navItems.map((item) => item.isActive ? (
                            <li key={item.name}>
                                <button onClick={(e) => navigate(item.slug)}
                                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                >{item.name}</button>
                            </li>
                        ) : null
                        )}
                        {
                            isLoggedIn && (
                                <li>
                                    <LogoutBtn/>
                                </li>
                            )
                        }
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header;