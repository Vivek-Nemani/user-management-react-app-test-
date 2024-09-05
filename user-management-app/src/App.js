import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import CreateUserForm from './components/CreateUserForm';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Management App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/create">
            Create User
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/create" element={<CreateUserForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;





