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
            <DropdownMenuTrigger asChild className=''>
              <Button className='w-24 '>${downPayment.toLocaleString()}</Button>
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
              <DropdownMenuItem onClick={() => setDownPayment(downPayment - 20000)}>
                ${(downPayment - 20000).toLocaleString()}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDownPayment(downPayment + 30000)}>
                ${(downPayment + 30000).toLocaleString()}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDownPayment(downPayment + 40000)}>
                ${(downPayment + 40000).toLocaleString()}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDownPayment(downPayment + 50000)}>
                ${(downPayment + 50000).toLocaleString()}
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
