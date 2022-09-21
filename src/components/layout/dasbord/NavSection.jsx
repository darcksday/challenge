import { useState } from 'react';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton, Link, Avatar, Typography } from '@mui/material';
import Iconify from '../../Iconify';
//


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
    title: 'Challenges',
    path: '/challenges',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'create',
    path: '/create',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'oracles',
    path: '/oracles/',
    icon: getIcon('eva:shopping-bag-fill'),
  },

];

const NavSection = () => {
  const { pathname } = useLocation();

  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);
  const AccountStyle = styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(2, 2.5),
      borderRadius: Number(theme.shape.borderRadius) * 1.5,
      backgroundColor: '#919eab1f',
    }


  ));
  return (<>
      <Box className="mt-6" sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                Main Page or Breadcrams
              </Typography>

            </Box>
          </AccountStyle>
        </Link>
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
