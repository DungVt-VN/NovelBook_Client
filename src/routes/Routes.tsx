import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RouteConfig from './RouteConfig';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Navbar from '../components/navbar/Navbar';
import Header from '../components/layout/header/Header';
import Footer from '../components/layout/footer/Footer';
import NotFound from '../pages/notFound/NotFound';

const Routing = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Header />
        <div className="container mx-auto p-4">
          <Routes>
            {RouteConfig.map((route, index) => {
              const RouteElement = route.component;

              if (route.isPrivate) {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={<PrivateRoute>{RouteElement}</PrivateRoute>}
                  />
                );
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<PublicRoute>{RouteElement}</PublicRoute>}
                />
              );
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Routing;
