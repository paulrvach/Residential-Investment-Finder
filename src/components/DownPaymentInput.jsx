'use client';
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

// type Props = {
//   setDownPayment: React.Dispatch<SetStateAction<number>>;
//   downPayment: number;
// };

const DownPaymentInput = ({ setDownPayment, downPayment }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='w-24'>{downPayment}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Down Payment</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Input
                type='number'
                placeholder={downPayment.toLocaleString()}
                onChange={(e) => setDownPayment(e.target.value)}
                className='p-4 '
              />
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setDownPayment(20000)}>
                $20,000
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDownPayment(30000)}>
                $30,000
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDownPayment(40000)}>
                $40,000
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDownPayment(50000)}>
                $50,000
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>
          <p>Down Payment</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DownPaymentInput;
