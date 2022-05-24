import React from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import style from './style.module.css'

const Layout=()=>{
  return(
    <div>
      <div className={style.mainMenu}>
          <div className={style.item}>
            Example
          </div>
      </div>
      <div className={style.content}>
        <Outlet/>
      </div>
    </div>
  )
}
export default Layout;