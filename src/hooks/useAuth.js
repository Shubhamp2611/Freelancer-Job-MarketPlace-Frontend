import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, loading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    isFreelancer: user?.role === 'FREELANCER',
    isClient: user?.role === 'CLIENT',
    isAdmin: user?.role === 'ADMIN',
    logout: handleLogout,
  };
};