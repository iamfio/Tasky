import { Link, NavLink } from 'react-router-dom'
import { BiSun, BiMoon } from 'react-icons/bi'
import { themeChange } from 'theme-change'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.context'

const Drawer = () => (
  <div className="drawer drawer-end">
    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col">
      <div className="w-full navbar bg-base-300">
        <div className="flex-1 px-2 mx-2">Navbar Title</div>
        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal">
            <li>
              <Link to={'#'}>Navbar Item 1</Link>
            </li>
            <li>
              <Link to={'#'}>Navbar Item 2</Link>
            </li>
          </ul>
        </div>

        <div className="flex-none lg:hidden">
          <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
      </div>
      Content
    </div>

    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 bg-base-100">
        <li>
          <Link to={'#'}>Sidebar Item 1</Link>
        </li>
        <li>
          <Link to={'#'}>Sidebar Item 2</Link>
        </li>
      </ul>
    </div>
  </div>
)

export default function HeaderNav() {
  const { isLoggedIn, isLoading } = useContext(AuthContext)

  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to={''}>Home</NavLink>
            </li>
            {!isLoggedIn && (
              <>
              <li>
                <NavLink to={'login'}>Login</NavLink>
              </li>
              <li>
                <NavLink to={'signup'}>Signup</NavLink>
              </li>
            </>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <NavLink to={'tasks'}>Tasks</NavLink>
                </li>
                <li>
                  <NavLink to={'profile'}>Profile</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to={'/'} className="btn btn-ghost normal-case text-xl">
          Tasky
        </Link>
      </div>
      <div className="navbar-end">
        {/* <input type="checkbox" className="toggle toggle-xs" dataChooseTheme /> */}
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => themeChange(true)}
        >
          <BiSun />
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  )
}
