import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import MessagesPage from './pages/MessagesPage';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="profile/:username" element={<ProfilePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:id" element={<ProjectDetailPage />} />
            <Route 
              path="messages" 
              element={
                <ProtectedRoute>
                  <MessagesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="messages/:id" 
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;