import { useState } from 'react';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton, Link, Avatar, Typography, Breadcrumbs } from '@mui/material';
import Iconify from '../../Iconify';
//
import useBreadcrumbs from "use-react-router-breadcrumbs";


const getIcon = (name) => {
  return (<Iconify icon={name} width={22} height={22} />)
};
const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------


const NavItem = ({ item, active }) => {

  const theme = useTheme();

  const isActiveRoot = active(item.path);

  const { title, path, icon, info, children } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };




  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };


  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}


const navConfig = [
  {
    title: 'Price Prediction Bets',
    path: '/price',
    icon: getIcon('eva:trending-up-outline'),
  },
  {
    title: 'Custom Bets',
    path: '/custom',
    icon: getIcon('eva:archive-outline'),
  },
  {
    title: 'My Price Predictions',
    path: '/my/price/',
    icon: getIcon('eva:person-outline'),
  },

  {
    title: 'My Custom Bets',
    path: 'my/custom',
    icon: getIcon('eva:people-fill'),
  },



];

const NavSection = () => {
  const { pathname } = useLocation();
  const breadcrumbs = useBreadcrumbs();


  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);
  const AccountStyle = styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(2, 0),
      borderRadius: Number(theme.shape.borderRadius) * 1.5,
      backgroundColor: '#919eab1f',
    }


  ));
  return (<>
      <Box className="mt-6" sx={{ mb: 5, mx: 2.5 }}>
          <AccountStyle>
            <Box sx={{ ml: 2 }}>
                <Breadcrumbs aria-label="breadcrumb">

                  {breadcrumbs.map(({ match,
                    breadcrumb }) => (

                    <Link underline="hover" color="inherit" component={RouterLink} key={match.pathname} to={match.pathname}>
                      {breadcrumb}
                    </Link>


                  ))}



                </Breadcrumbs>


            </Box>
          </AccountStyle>
      </Box>
      <Box>
        <List disablePadding sx={{ p: 1 }}>
          {navConfig.map((item) => (
            <NavItem key={item.title} item={item} active={match} />
          ))}
        </List>
      </Box>

    </>

  );
}


export default NavSection;
