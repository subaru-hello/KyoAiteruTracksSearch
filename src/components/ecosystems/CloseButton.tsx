import React from 'react';
import {
  IconButton as ChakraIconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import { LuX } from 'react-icons/lu';

export const CloseButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function CloseButton(props, ref) {
    return (
      <ChakraIconButton variant="ghost" ariaLabel="Close" ref={ref} {...props}>
        {props.children ?? <LuX />}
      </ChakraIconButton>
    );
  }
);
