import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { selectAuthChecked } from '../../services/slices/authSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = useSelector(selectAuthChecked);
  const user = useSelector((store) => store.user.userData);
  const from = location.state?.from || { pathname: '/' };

  // Отображение прелоадера во время чекаута
  if (!isAuthChecked) {
    return <Preloader />;
  }

  // Редирект при отсутствии данных
  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    return <Navigate replace to={from} state={{ location }} />;
  }

  return children;
};
