import './App.css';
import ProjectsPage from "./projects/ProjectsPage";
import ProjectPage from './projects/ProjectPage';
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './home/HomePage';
import ProjectNew from './projects/ProjectNew';
import { AuthProvider } from './auth/AuthProvider';
import { PrivateRoute } from './auth/PrivateRoute';
import { Navbar } from './components/NavBar';
import { Login } from './user/Login';
import { Register } from './user/Register';
import { Profile } from './user/Profile';

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/projects' element={
              <PrivateRoute>
                <ProjectsPage />
              </PrivateRoute>} />
            <Route path='/projects/:id' element={
              <PrivateRoute>
                <ProjectPage />
              </PrivateRoute>} />
            <Route path='/project' element={
              <PrivateRoute>
                <ProjectNew />
              </PrivateRoute>} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;