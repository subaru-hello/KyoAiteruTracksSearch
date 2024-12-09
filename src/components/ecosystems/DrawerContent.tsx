import {
  Drawer as ChakraDrawer,
  Portal,
  DrawerContentProps,
} from '@chakra-ui/react';
import * as React from 'react';
import { CloseButton } from './CloseButton';

interface DrawerContentPropsExtended extends DrawerContentProps {
  children: React.ReactNode;
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  offset?: number;
}

export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  DrawerContentPropsExtended
>(function DrawerContent(
  { children, portalled = true, portalRef, offset, ...rest },
  ref
) {
  return (
    <Portal disabled={!portalled} container={portalRef?.current || undefined}>
      <ChakraDrawer.Positioner padding={offset}>
        <ChakraDrawer.Content ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraDrawer.Content>
      </ChakraDrawer.Positioner>
    </Portal>
  );
});

export const DrawerCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof ChakraDrawer.CloseTrigger>
>(function DrawerCloseTrigger(props, ref) {
  return (
    <ChakraDrawer.CloseTrigger
      position="absolute"
      top="2"
      insetEnd="2"
      {...props}
      asChild
    >
      <CloseButton size="sm" ref={ref} />
    </ChakraDrawer.CloseTrigger>
  );
});

export const DrawerTrigger = ChakraDrawer.Trigger;
export const DrawerRoot = ChakraDrawer.Root;
export const DrawerFooter = ChakraDrawer.Footer;
export const DrawerHeader = ChakraDrawer.Header;
export const DrawerBody = ChakraDrawer.Body;
export const DrawerBackdrop = ChakraDrawer.Backdrop;
export const DrawerDescription = ChakraDrawer.Description;
export const DrawerTitle = ChakraDrawer.Title;
export const DrawerActionTrigger = ChakraDrawer.ActionTrigger;
