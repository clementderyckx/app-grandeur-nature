import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function IconLink({to, icon, className, text, isActive}) {
  const getIcon = () => {
    
  }
  return (
    <Link className={className} to={to}>
        {/* <FontAwesomeIcon icon={icon} /> */}
        <div className="nav-icon">
          {icon}
        </div>
        { (text && isActive) ? <span className="icon-link-text">{text}</span> : null } 
    </Link>
  )
}
