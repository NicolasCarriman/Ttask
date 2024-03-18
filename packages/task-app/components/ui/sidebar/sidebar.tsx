'use client';

import React, { useState } from 'react';
import AvatarComponent from '../../common/avatar';
import Link from 'next/link';
import './sidebar.css';
import {
  MdNotificationsActive,
  MdWork,
  MdCalendarToday,
  MdContacts
} from 'react-icons/md';
import {
  IoIosBuild,
  IoIosStats
} from 'react-icons/io';

/**
 * todo: fix navigation structure
 * navigation structure should be composed by li, a
 */

function Sidebar() {
  const [active, setActive] = useState(false);

  const onHover = () => {
    setActive(true);
  };

  const onLeave = () => {
    setActive(false);
  };


  return (
    <aside
      className={`sidebar-container ${active ? 'sb-active' : 'sb-disabled'}`}
      onMouseEnter={() => onHover()}
      onMouseLeave={() => onLeave()}
    >
      <nav className='sidebar-content'>
        <h1>My Company</h1>
        <ul className='tt-ul'>
          <li className='tt-li'>
            <Link href={'./dashboard/tasks'} >
              <IoIosBuild />
              <i className='tt-li-info'>tasks</i>
            </Link>
          </li>
          <li className='tt-li'>
            <Link href={'./dashboard'} >
              <MdWork />
              <i className='tt-li-info'>project</i>
            </Link>
          </li>
          <li className='tt-li'>
            <MdCalendarToday />
            <i className='tt-li-info'>tasks</i>
          </li>
          <li className='tt-li'>
            <MdNotificationsActive />
            <i className='tt-li-info'>notifications</i>
          </li>
          <li className='tt-li'>
            <IoIosStats />
          </li>
          <li className='tt-li'>
            <MdContacts />
          </li>
        </ul>
        <article className='sidebar-footer'>
          <AvatarComponent isCurrentUser={true} label={'Emily Brown'} />
        </article>
      </nav>
    </aside>
  );
}

export default Sidebar;
