'use client'
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
const AdditionalCostsBtn = ({addCost, setAddCost}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='w-24'>${addCost.toLocaleString()}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Additional Costs</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Input
                type='number'
                placeholder={addCost.toLocaleString()}
                onChange={(e) => setAddCost(e.target.value)}
                className='p-4 '
              />
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setAddCost(0)}>
                $0
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAddCost(30000)}>
                $30,000
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAddCost(60000)}>
                $60,000
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAddCost(90000)}>
                $90,000
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>
          <div>Additional Costs</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AdditionalCostsBtn;
