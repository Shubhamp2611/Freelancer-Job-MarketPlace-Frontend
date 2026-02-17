/* eslint-disable no-unused-vars */
// src/components/common/Header.js
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Badge,
  InputBase,
  alpha,
  useTheme as useMuiTheme,
  Container,
  Divider,
  ListItemIcon,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemIcon as ListItemIconDrawer,
  ListItemText,
  Chip,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Add as AddIcon,
  Favorite as FavoriteIcon,
  Chat as ChatIcon,
  Home as HomeIcon,
  Description as DescriptionIcon,
  Paid as PaidIcon,
  Business as BusinessIcon,
  Code as CodeIcon,
  Login as LoginIcon,
  HowToReg as HowToRegIcon,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useTheme as useThemeContext } from '../../contexts/ThemeContext';

const Header = () => {
  const theme = useMuiTheme();
  const { toggleTheme, isDarkMode: mode } = useThemeContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;
  const isAuthenticated = !!(user && auth?.token); // Derive from user and token presence
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Fetch notifications (simulated)
    const mockNotifications = [
      { id: 1, title: 'New Proposal Received', message: 'John sent a proposal for your project', time: '5 min ago', read: false, type: 'proposal' },
      { id: 2, title: 'Contract Approved', message: 'Your contract has been approved', time: '1 hour ago', read: false, type: 'contract' },
      { id: 3, title: 'Payment Received', message: 'Payment of $500 has been received', time: '2 hours ago', read: true, type: 'payment' },
    ];
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    setMobileOpen(false);
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${searchQuery}`);
    }
  };

  const handleNotificationClick = (notification) => {
    const updatedNotifications = notifications.map(n =>
      n.id === notification.id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    setUnreadCount(prev => Math.max(0, prev - 1));
    setNotificationAnchor(null);

    switch (notification.type) {
      case 'proposal':
        navigate('/my-proposals');
        break;
      case 'contract':
        navigate('/contracts');
        break;
      case 'payment':
        navigate('/profile?tab=payments');
        break;
      default:
        break;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'ADMIN':
        return <DashboardIcon fontSize="small" />;
      case 'CLIENT':
        return <BusinessIcon fontSize="small" />;
      case 'FREELANCER':
        return <CodeIcon fontSize="small" />;
      default:
        return <PersonIcon fontSize="small" />;
    }
  };

  // Navigation items with role-based access
  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon />, roles: ['CLIENT', 'FREELANCER', 'ADMIN'] },
    { label: 'Find Work', path: '/jobs', icon: <WorkIcon />, roles: ['FREELANCER'] },
    { label: 'Post a Job', path: '/jobs/create', icon: <AddIcon />, roles: ['CLIENT'], variant: 'contained' },
    { label: 'My Proposals', path: '/my-proposals', icon: <FavoriteIcon />, roles: ['FREELANCER'] },
    { label: 'Contracts', path: '/contracts', icon: <DescriptionIcon />, roles: ['CLIENT', 'FREELANCER'] },
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />, roles: ['CLIENT', 'FREELANCER'] },
    { label: 'Admin', path: '/admin', icon: <DashboardIcon />, roles: ['ADMIN'] },
  ];

  // Filter nav items based on user role
  const filteredNavItems = isAuthenticated 
    ? navItems.filter(item => item.roles.includes(user?.role))
    : [];

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6" fontWeight="bold">
          FreelanceHub
        </Typography>
        <Typography variant="caption">
          Secure Freelancing Platform
        </Typography>
      </Box>
      
      {isAuthenticated && user && (
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Avatar sx={{ width: 48, height: 48, bgcolor: 'secondary.main' }}>
            {getInitials(user.name)}
          </Avatar>
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="subtitle1" fontWeight="bold" noWrap>
              {user.name || 'User'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {getRoleIcon(user.role)}
              <Typography variant="caption" color="text.secondary" noWrap>
                {user.role?.toLowerCase()}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      <List sx={{ flex: 1, p: 1 }}>
        {filteredNavItems.map((item) => (
          <ListItem
            button
            key={item.label}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                }
              }
            }}
          >
            <ListItemIconDrawer sx={{ 
              color: location.pathname === item.path ? 'primary.main' : 'inherit',
              minWidth: 40
            }}>
              {item.icon}
            </ListItemIconDrawer>
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? 'bold' : 'normal'
              }}
            />
          </ListItem>
        ))}
      </List>

      <Divider />
      
      <List sx={{ p: 1 }}>
        {isAuthenticated ? (
          <>
            <ListItem
              button
              component={Link}
              to="/profile"
              onClick={handleDrawerToggle}
              selected={location.pathname === '/profile'}
            >
              <ListItemIconDrawer>
                <PersonIcon />
              </ListItemIconDrawer>
              <ListItemText primary="My Profile" />
            </ListItem>
            
            {user?.role === 'FREELANCER' && (
              <ListItem
                button
                component={Link}
                to="/profile?tab=payments"
                onClick={handleDrawerToggle}
              >
                <ListItemIconDrawer>
                  <PaidIcon />
                </ListItemIconDrawer>
                <ListItemText primary="My Earnings" />
              </ListItem>
            )}
            
            <ListItem button onClick={() => { toggleTheme(); handleDrawerToggle(); }}>
              <ListItemIconDrawer>
                {mode ? <Brightness7 /> : <Brightness4 />}
              </ListItemIconDrawer>
              <ListItemText primary={mode ? 'Light Mode' : 'Dark Mode'} />
            </ListItem>
            
            <Divider sx={{ my: 1 }} />
            
            <ListItem button onClick={handleLogout}>
              <ListItemIconDrawer>
                <ExitToAppIcon color="error" />
              </ListItemIconDrawer>
              <ListItemText primary="Logout" primaryTypographyProps={{ color: 'error' }} />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/login" onClick={handleDrawerToggle}>
              <ListItemIconDrawer>
                <LoginIcon />
              </ListItemIconDrawer>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register" onClick={handleDrawerToggle}>
              <ListItemIconDrawer>
                <HowToRegIcon />
              </ListItemIconDrawer>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.background.paper, 0.9) 
            : 'background.paper',
          backdropFilter: 'blur(10px)',
          color: 'text.primary',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0 } }}>
            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
                mr: { xs: 1, md: 4 },
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <WorkIcon sx={{ fontSize: 28 }} />
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                FreelanceHub
              </Box>
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                FH
              </Box>
            </Typography>

            {/* Search Bar - Hide on mobile */}
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                flexGrow: 1,
                maxWidth: 600,
                mx: 2,
                display: { xs: 'none', md: 'block' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: alpha(theme.palette.common.black, 0.04),
                  borderRadius: 20,
                  px: 2,
                  py: 0.5,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.common.black, 0.08),
                  },
                }}
              >
                <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                <InputBase
                  placeholder="Search for jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ flex: 1 }}
                />
              </Box>
            </Box>

            {/* Desktop Navigation Links */}
            {isAuthenticated && (
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                {filteredNavItems.map((item) => (
                  item.variant === 'contained' ? (
                    <Button
                      key={item.label}
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to={item.path}
                      startIcon={item.icon}
                      size="small"
                      sx={{ 
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: 2,
                      }}
                    >
                      {item.label}
                    </Button>
                  ) : (
                    <Button
                      key={item.label}
                      component={Link}
                      to={item.path}
                      startIcon={item.icon}
                      sx={{
                        color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                        fontWeight: location.pathname === item.path ? 600 : 400,
                        borderBottom: location.pathname === item.path 
                          ? `2px solid ${theme.palette.primary.main}` 
                          : 'none',
                        borderRadius: 0,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.08),
                          color: 'primary.main',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  )
                ))}
              </Box>
            )}

            {/* Right Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Theme Toggle */}
            <Tooltip title={`Switch to ${mode ? 'light' : 'dark'} mode`}>
              <IconButton onClick={toggleTheme} color="inherit" size="small">
                {mode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Tooltip>

              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <Tooltip title="Notifications">
                    <IconButton onClick={(e) => setNotificationAnchor(e.currentTarget)}>
                      <Badge badgeContent={unreadCount} color="error">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>

                  {/* Messages */}
                  <Tooltip title="Messages">
                    <IconButton onClick={() => navigate('/messages')}>
                      <Badge badgeContent={2} color="primary">
                        <ChatIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>

                  {/* User Role Chip */}
                  {user?.role && (
                    <Chip
                      icon={getRoleIcon(user.role)}
                      label={user.role?.toLowerCase()}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ 
                        display: { xs: 'none', md: 'flex' },
                        height: 28,
                      }}
                    />
                  )}

                  {/* User Menu */}
                  <Tooltip title="Account">
                    <IconButton onClick={handleMenuOpen}>
                      <Avatar 
                        sx={{ 
                          width: 35, 
                          height: 35,
                          bgcolor: 'secondary.main',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        }}
                      >
                        {getInitials(user?.name)}
                      </Avatar>
                    </IconButton>
                  </Tooltip>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    PaperProps={{
                      sx: { 
                        width: 250,
                        mt: 1,
                        borderRadius: 2,
                      },
                    }}
                  >
                    <Box sx={{ px: 2, py: 1.5 }}>
                      <Typography variant="subtitle2">{user?.name || 'User'}</Typography>
                      <Typography variant="caption" color="text.secondary" noWrap>
                        {user?.email}
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
                      <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                      Profile
                    </MenuItem>
                    {user?.role === 'FREELANCER' && (
                      <MenuItem onClick={() => { handleMenuClose(); navigate('/profile?tab=payments'); }}>
                        <ListItemIcon><PaidIcon fontSize="small" /></ListItemIcon>
                        My Earnings
                      </MenuItem>
                    )}
                    <MenuItem onClick={() => { handleMenuClose(); navigate('/settings'); }}>
                      <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={() => { handleMenuClose(); navigate('/help'); }}>
                      <ListItemIcon><HelpIcon fontSize="small" /></ListItemIcon>
                      Help
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                      <ListItemIcon><ExitToAppIcon fontSize="small" color="error" /></ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button 
                    component={Link} 
                    to="/login" 
                    startIcon={<LoginIcon />}
                    sx={{ 
                      color: 'text.primary',
                      display: { xs: 'none', sm: 'flex' }
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    startIcon={<HowToRegIcon />}
                    sx={{
                      background: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        background: 'primary.dark',
                      },
                      display: { xs: 'none', sm: 'flex' }
                    }}
                  >
                    Sign Up
                  </Button>
                  {/* Mobile auth icons */}
                  <IconButton 
                    component={Link} 
                    to="/login" 
                    sx={{ display: { sm: 'none' } }}
                  >
                    <LoginIcon />
                  </IconButton>
                  <IconButton 
                    component={Link} 
                    to="/register" 
                    sx={{ display: { sm: 'none' } }}
                  >
                    <HowToRegIcon />
                  </IconButton>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={() => setNotificationAnchor(null)}
        PaperProps={{
          sx: { 
            width: 320,
            maxHeight: 400,
            borderRadius: 2,
            mt: 1,
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Button 
                size="small" 
                onClick={markAllAsRead}
                sx={{ textTransform: 'none' }}
              >
                Mark all as read
              </Button>
            )}
          </Box>
        </Box>
        
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <MenuItem 
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              sx={{ 
                py: 1.5,
                borderLeft: notification.read ? 'none' : `3px solid ${theme.palette.primary.main}`
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {notification.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {notification.message}
                </Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ width: '100%', py: 2 }}>
              No notifications
            </Typography>
          </MenuItem>
        )}
        
        <Divider />
        <MenuItem component={Link} to="/notifications" onClick={() => setNotificationAnchor(null)}>
          <Typography variant="body2" color="primary" align="center" sx={{ width: '100%' }}>
            View all notifications
          </Typography>
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            border: 'none'
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;