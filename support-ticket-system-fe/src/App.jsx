import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import { DashboardProvider } from './contexts/DashboardContext';
import { TicketProvider } from './contexts/TicketContext';
import { CommentProvider } from './contexts/CommentContext';
import { UserProvider } from './contexts/UserContext';
import { CategoryProvider } from './contexts/CategoryContext';
import { LabelProvider } from './contexts/LabelContext';
import { publicRoutes, protectedRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <CategoryProvider>
            <LabelProvider>
              <DashboardProvider>
                <TicketProvider>
                  <CommentProvider>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <Routes>
                {/* Public Routes */}
                {publicRoutes.map((route, index) => (
                  <Route key={index} path={route.path} element={route.element} />
                ))}
                
                {/* Protected Routes */}
                {protectedRoutes.map((route, index) => (
                  <Route key={index} path={route.path} element={route.element}>
                    {route.children?.map((child, childIndex) => (
                      <Route 
                        key={childIndex} 
                        index={child.index} 
                        path={child.path} 
                        element={child.element} 
                      />
                    ))}
                  </Route>
                ))}
              </Routes>
                  </CommentProvider>
                </TicketProvider>
              </DashboardProvider>
            </LabelProvider>
          </CategoryProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
);
}

export default App;
