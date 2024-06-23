import React from 'react';
import Home from '../pages/home/Home';
import Followed from '../pages/followed/Followed';
import NotFound from '../pages/notFound/NotFound';
import NotLogged from '../pages/notlogged/NotLogged';
import UserManagement from '../pages/usermanager/UserManager';
import PageDetail from '../pages/pagedetail/PageDetail';
import Reader from '../pages/reader/Reader';
import MyBook from '../pages/mybook/MyBook';

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
    path: '/book/:namebook/:id' ,
    component: <PageDetail />,
    isPrivate: false,
  },
  {
    path: '/book/:id',
    component: <PageDetail />,
    isPrivate: false,
  },
  {
    path: '/book/:namebook/:id/:chapter' ,
    component: <Reader />,
    isPrivate: false,
  },
  {
    path: '/notlogged',
    component: <NotLogged />,
    isPrivate: false,
  },
  {
    path: '/admin/users',
    component: <UserManagement />,
    isPrivate: true,
    allowedRoles: ['Admin'],
  },
  {
    path: '/creator/mybooks',
    component: <MyBook />,
    isPrivate: true,
    allowedRoles: ['Creator'],
  },
  {
    path: '*',
    component: <NotFound />,
    isPrivate: false,
  },
];

export default RouteConfig;
