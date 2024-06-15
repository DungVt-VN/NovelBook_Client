import React from 'react';
import Home from '../pages/home/Home';
import Followed from '../pages/followed/Followed';
import NotFound from '../pages/notFound/NotFound';
import BookDetail from '../pages/bookdetail/BookDetail';

interface Route {
  path: string;
  component: React.ReactNode;
  isPrivate: boolean;
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
    isPrivate: false,
  },
  {
    path: '/book/:id',
    component: <BookDetail />,
    isPrivate: false,
  },
  {
    path: '*',
    component: <NotFound />,
    isPrivate: false,
  },
];

export default RouteConfig;
