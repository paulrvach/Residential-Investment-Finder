import React from 'react';
import { Download, Trash } from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';

const SelectedPropertyMenu = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Selection</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <div className='flex flex-row gap-4'><Download className='w-4 h-4'/>Export</div>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <div className='flex flex-row gap-4'><Trash className='w-4 h-4'/>Delete</div>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default SelectedPropertyMenu;
