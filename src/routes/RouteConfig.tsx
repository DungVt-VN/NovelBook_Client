import React from 'react';
import Home from '../pages/home/Home';
import Followed from '../pages/followed/Followed';
import NotFound from '../pages/notFound/NotFound';

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
    isPrivate: true,
  },
  {
    path: '*',
    component: <NotFound />,
    isPrivate: false,
  },
];

export default RouteConfig;
