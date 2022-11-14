import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const pageGroups = [
  {
    id: 'admin',
    title: 'Admin',
    items: [
      { href: '/admin/new-users', title: 'New users' },
      { href: '/admin/settings', title: 'Settings' },
      { href: '/admin/edit', title: 'Edit users' },
    ],
  },
  {
    id: 'report',
    title: 'Reports',
    items: [{ href: '/report', title: 'Reports' }],
  },
  {
    id: 'ward',
    title: 'Ward',
    items: [
      { href: '/ward', title: 'Wards' },
      { href: '/ward/user-preferences', title: 'User preferences' },
    ],
  },
  {
    id: 'roster',
    title: 'Roster',
    items: [
      { href: '/roster/generate', title: 'Generate roster' },
      { href: '/roster/edit', title: 'Edit roster' },
      { href: '/roster/view', title: 'View roster' },
      { href: '/roster/exchange', title: 'Exchange shifts' },
    ],
  },
];
const disallowedForDoctor = ['/roster/generate', '/roster/edit'];
const accountLinks = [
  { href: '/api/logout', title: 'Logout' },
  { href: '/auth/change-password', title: 'Change password' },
];

const Layout = ({ children, user, setUser }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerItemGroups, setDrawerItemGroups] = useState([]);
  const router = useRouter();

  // List of menu anchors
  const [menuAnchors, setMenuAnchors] = useState(
    Object.fromEntries(pageGroups.map((pageGroup) => [pageGroup.id, null]))
  );

  /** @param {React.MouseEvent} event */
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getAccountLinkRedirector = (href) => (event) => {
    if (href === '/api/auth/logout') {
      setUser(null);
    }
    handleCloseUserMenu();
    getRedirector(href)(event);
  };

  /** @param {boolean} open */
  const getDrawerToggler = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  /** @param {string} href */
  const getRedirector = (href) => (event) => {
    event.preventDefault();
    router.push(href);
  };

  const isRouteDisallowed = (user, route) => {
    if (user.type === 'DOCTOR' && disallowedForDoctor.includes(route)) {
      return true;
    }
    return false;
  };

  /** @param {import('@/lib/models/User').UserEntity} user */
  const getAllowedPages = (user) => {
    return pageGroups
      .filter((pageGroup) => pageGroup.id !== 'admin' || user.type === 'ADMIN')
      .map((pageGroup) => {
        return {
          ...pageGroup,
          items: pageGroup.items.filter(
            (page) => !isRouteDisallowed(user, page.href)
          ),
        };
      });
  };

  useEffect(() => {
    if (user) {
      setDrawerItemGroups(
        getAllowedPages(user).map((pageGroup) => (
          <List key={pageGroup.id}>
            {pageGroup.items.map((page) => {
              let href = page.href;
              if (href === '/roster/view' || href === '/roster/edit') {
                href = getRouteWithMonth(href);
              }
              return (
                <ListItem
                  key={href}
                  component="a"
                  href={href}
                  onClick={getRedirector(href)}
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemText>{page.title}</ListItemText>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        ))
      );
    }
  }, [user]);

  /** @param {string} href */
  function getRouteWithMonth(href) {
    const today = new Date();
    return `${href}/${today.getFullYear()}/${today.getMonth() + 1}`;
  }

  const getMenuOpener = (menuId) => (event) => {
    setMenuAnchors({ ...menuAnchors, [menuId]: event.currentTarget });
  };
  const getMenuCloser = (menuId) => () => {
    setMenuAnchors({ ...menuAnchors, [menuId]: null });
  };

  const getMenuRedirector =
    (menuHref, menuId = null) =>
    (event) => {
      if (menuId) {
        getMenuCloser(menuId)();
      }
      getRedirector(menuHref)(event);
    };

  /**
   * @param {string} name
   * @returns {string}
   */
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Link href="/">Foo</Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={getDrawerToggler(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Link href="/">Foo</Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pageGroups.map((pageGroup) =>
                pageGroup.items.length > 1 ? (
                  /* For dropdowns in AppBar */
                  <div key={pageGroup.id}>
                    <Button
                      id={pageGroup.id + '-button'}
                      aria-controls={
                        menuAnchors[pageGroup.id]
                          ? pageGroup.id + '-menu'
                          : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={
                        menuAnchors[pageGroup.id] ? 'true' : undefined
                      }
                      onClick={getMenuOpener(pageGroup.id)}
                      sx={{ color: 'white' }}
                    >
                      {pageGroup.title}
                    </Button>
                    <Menu
                      id={pageGroup.id + '-menu'}
                      key={pageGroup.id}
                      anchorEl={menuAnchors[pageGroup.id]}
                      open={Boolean(menuAnchors[pageGroup.id])}
                      onClose={getMenuCloser(pageGroup.id)}
                      MenuListProps={{
                        'aria-labelledby': pageGroup.id + '-button',
                      }}
                    >
                      {pageGroup.items.map((page) => (
                        <MenuItem
                          key={page.id}
                          onClick={getMenuRedirector(page.href, pageGroup.id)}
                        >
                          {page.title}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                ) : (
                  /* For single links in AppBar */
                  <Button
                    key={pageGroup.id}
                    sx={{ color: 'white' }}
                    onClick={getMenuRedirector(pageGroup.items[0].href)}
                  >
                    {pageGroup.items[0].title}
                  </Button>
                )
              )}
            </Box>

            {/* Account actions */}
            <Box sx={{ flexGrow: 0 }}>
              {user ? (
                <>
                  <Tooltip title="Account">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={user.name} sx={{ bgcolor: deepOrange[500] }}>
                        {getInitials(user.name)}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {accountLinks.map((link) => (
                      <MenuItem
                        key={link.href}
                        onClick={getAccountLinkRedirector(link.href)}
                      >
                        <Typography textAlign="center">{link.title}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Button
                  sx={{ color: 'white' }}
                  onClick={getRedirector('/auth/login')}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor={'left'}
        open={isDrawerOpen}
        onClose={getDrawerToggler(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={getDrawerToggler(false)}
          onKeyDown={getDrawerToggler(false)}
        >
          {/* Joining groups of drawer items with dividers */}
          {drawerItemGroups.length !== 0 &&
            drawerItemGroups.reduce((prev, curr) => (
              <>
                {prev}
                <Divider />
                {curr}
              </>
            ))}
        </Box>
      </Drawer>
      {children}
    </>
  );
};

export default Layout;
