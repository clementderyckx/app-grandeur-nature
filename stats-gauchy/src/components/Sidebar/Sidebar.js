import React from 'react'
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCaretRight, faCaretLeft, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import IconLink from '../IconLink/IconLink';
import { ReactComponent as LogoGrandeurNature} from "./../../imgs/logo-grandeur-nature.svg";
import { ReactComponent as SubscribersIcon} from "./../../imgs/icons/users.svg";
import { ReactComponent as BadgeCheckIcon} from "./../../imgs/icons/badge-check.svg";
import { ReactComponent as StatsIcon} from "./../../imgs/icons/histogramme.svg";
import { ReactComponent as ParamsIcon} from "./../../imgs/icons/params-icon.svg";
import { useState } from 'react';

export default function SideBar() {

  const [active, updateActive] = useState(false);
  const toggleNav = () => {
    (active === true) ? updateActive(false) : updateActive(true);
  }
  return (
    <div className={ (active) ? "sidebar active" : "sidebar" }>
      <div className="sidebar-title">
        <div className="sidebar-logo"><LogoGrandeurNature /></div>
      </div>
      <div className="toggle-nav">
        <div className="toggle-nav-btn" onClick={toggleNav}>
          <FontAwesomeIcon icon={(active) ? faCaretLeft : faCaretRight }/>
        </div>
      </div>


      <nav className="sidebar-nav">
        <ul className="sidebar-list">

          <li className="sidebar-elem">
            <IconLink to="/inscrits" className="sidebar-link" icon={<SubscribersIcon />} text="Inscrits" isActive={active}/> 
          </li>
          <li className="sidebar-elem">
            <IconLink to="/presents" className="sidebar-link" icon={<BadgeCheckIcon />} text="Présents" isActive={active}/>
          </li>
          <li className="sidebar-elem">
            <IconLink to="/reponses" className="sidebar-link" icon={<StatsIcon />} text="Statistiques" isActive={active}/>
          </li>

        </ul>
      </nav>

      <div className="sidebar-params">
        <Link to={'/params'} className='sidebar-params-link'>
          <ParamsIcon />
        </Link>
      </div>
    </div>
  )
}
