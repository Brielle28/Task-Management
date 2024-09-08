import React from 'react';
import { SideBarItems } from '../../Utils/sideBarItems';

const Aside = () => {
  return (
    <aside>
      {SideBarItems.map((item) => (
        <div key={item.id} className='flex flex-row items-center justify-start text-center gap-1'>
          <img src={item.icon} alt={item.title} className='size-5' />
          <a href={item.link}>{item.title}</a>
        </div>
      ))}
    </aside>
  );
};

export default Aside;
