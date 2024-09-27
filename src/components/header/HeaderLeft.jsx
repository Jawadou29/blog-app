import React from 'react'

export default function HeaderLeft({ toggle, setToggle}) {
  return (
    <div className="header-left">
        <div className="header-logo">
          <i className="bi bi-vector-pen"></i>
          <span>blog</span>
        </div>
        <div onClick={() => setToggle(prev=> !prev)} className="header-menu">
          {toggle ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i>}
        </div>
      </div>
  )
}
