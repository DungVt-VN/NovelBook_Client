import React from 'react';
import Home from '../pages/home/Home';
import Followed from '../pages/followed/Followed';
import NotFound from '../pages/notFound/NotFound';
import BookDetail from '../pages/bookdetail/BookDetail';
import NotLogged from '../pages/notlogged/NotLogged';
import UserManagement from '../pages/usermanager/UserManager';

interface Route {
  path: string;
  component: React.ReactNode;
  isPrivate: boolean;
  allowedRoles?: string[];
}

const RouteConfig: Route[] = [
  {
    path: '/',
    component: <Home />,
    isPrivate: false,
  },
  {
    path: '/followed',
    component: <Followed />,
    isPrivate: true,
    allowedRoles: ['User'],
  },
  {
    path: '/book/:id',
    component: <BookDetail />,
    isPrivate: false,
  },
  {
    path: '/notlogged',
    component: <NotLogged />,
    isPrivate: false,
  },
  {
    path: '*',
    component: <NotFound />,
    isPrivate: false,
  },
  {
    path: '/admin/users',
    component: <UserManagement />,
    isPrivate: true,
    allowedRoles: ['Admin'],
  },
];

export default RouteConfig;
