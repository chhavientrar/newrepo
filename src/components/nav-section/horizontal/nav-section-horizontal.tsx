import { memo } from 'react';

import Stack from '@mui/material/Stack';

import NavList from './nav-list';
import { NavGroupProps, NavItemBaseProps } from '../types';

// ----------------------------------------------------------------------

function NavSectionHorizontal({ data, slotProps, sx, ...other }: any) {
  return (
    <Stack
      component="nav"
      id="nav-section-horizontal"
      direction="row"
      alignItems="center"
      spacing={`${slotProps?.gap || 6}px`}
      sx={{
        mx: 'auto',
        ...sx,
      }}
      {...other}
    >
      {data.map((group: { subheader: any; items: NavItemBaseProps[] }, index: any) => (
        <Group key={group.subheader || index} items={group.items} slotProps={slotProps} />
      ))}
    </Stack>
  );
}

export default memo(NavSectionHorizontal);

// ----------------------------------------------------------------------

function Group({ items, slotProps }: NavGroupProps) {
  return (
    <>
      {items.map((list) => (
        <NavList key={list.title} data={list} depth={1} slotProps={slotProps} />
      ))}
    </>
  );
}
