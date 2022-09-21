import { Outlet, useLocation, Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Box, Drawer, IconButton } from '@mui/material';
// mock
import { styled } from '@mui/material/styles';


// hooks
import useResponsive from '../../../hooks/useResponsive';

// components
import Scrollbar from '../../Scrollbar';
import NavSection from './NavSection';
import Iconify from '../../Iconify';
import { Navbar } from '../navbar';

export const DashboardLayout = () => {

  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();


  useEffect(() => {
    if (open) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);


  const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: 64 + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
      paddingTop: 92 + 24,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  }));

  const DRAWER_WIDTH = 280;

  const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
      flexShrink: 0,
      width: DRAWER_WIDTH,
    },
  }));


  const isDesktop = useResponsive('up', 'lg');


  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >

      <NavSection />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );


  return (
    <div className="flex justify-left">

      <RootStyle>

        <IconButton onClick={(e) => setOpen(true)} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        {!isDesktop && (<>

            <Drawer
              open={open}
              onClose={(e) => setOpen(false)}
              PaperProps={{
                sx: { width: DRAWER_WIDTH },
              }}
            >
              {renderContent}
            </Drawer>
          </>
        )}

        {isDesktop && (
          <Drawer
            open
            variant="persistent"

            PaperProps={{
              sx: {
                width: DRAWER_WIDTH,
                bgcolor: 'background.default',
                borderRightStyle: 'dashed',
              },
            }}
          >
            {renderContent}
          </Drawer>
        )}
      </RootStyle>
      <MainStyle className="max-w-[100%]">
        <Outlet />
      </MainStyle>
    </div>
  )


}
