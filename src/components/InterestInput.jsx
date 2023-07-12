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

import { Slider } from '@/components/ui/slider';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Input } from '@/components/ui/input';
import { Button } from './ui/button';

const InterestInput = ({interestRate, setInterestRate}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='w-24'>{interestRate}%</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Interest Rate</DropdownMenuLabel>
              <DropdownMenuSeparator />
                <Slider
                  onValueChange={(e) => {setInterestRate(e)}}
                  defaultValue={[5]}
                  max={10}
                  step={0.1}
                  className='w-48 p-4'
                />
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>
          <p>Interest Rate</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InterestInput;
