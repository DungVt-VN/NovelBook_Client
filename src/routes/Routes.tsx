import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RouteConfig from './RouteConfig';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Navbar from '../components/navbar/Navbar';
import Header from '../components/layout/header/Header';
import Footer from '../components/layout/footer/Footer';
import NotFound from '../pages/notFound/NotFound';
import useAuth from '../hooks/useAuth';
import AdminNavbar from '../components/adminnavbar/AdminNavbar';

const Routing = () => {
  const { isAuthenticated, roles, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Hoặc một component loading tùy chỉnh
  }

  const isAdmin = roles.includes('Admin');
  const admin = isAuthenticated && isAdmin;

  return (
    <BrowserRouter>
      <div id='set'>
        {admin ? <AdminNavbar /> : (
          <>
            <Navbar />
            <Header />
          </>
        )}
        <div className="container mx-auto p-4 bg-slate-500/50">
          <Routes>
            {RouteConfig.map((route, index) => {
              const RouteElement = route.component;

              if (route.isPrivate) {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={<PrivateRoute allowedRoles={route.allowedRoles}>{RouteElement}</PrivateRoute>}
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
        {!admin && <Footer />}
      </div>
    </BrowserRouter>
  );
};

export default Routing;