'use client';

import React, { HTMLAttributes } from 'react';

interface TabProps extends HTMLAttributes<HTMLLIElement> {
  selected: boolean;
}
function Tab(props: TabProps) {

  return (
    <li
      className={'tt-li'}
      {...props}
    >
      <p>
        {props.children}
      </p>
    </li>
  );
}

export default Tab;
