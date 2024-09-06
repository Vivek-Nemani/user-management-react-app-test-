// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import CreateUserForm from "./components/CreateUserForm";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import fetchUsers from "./services/Fetching";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const userData = await fetchUsers();
        setUsers(userData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const addUser = (newUser) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
  };

  const deleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#3f51b5", // Primary color
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ color: "#fff" }} // Text color
          >
            User Management App
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/"
            style={{ marginRight: "10px" }}
          >
            Home
          </Button>
          <Button color="inherit" component={Link} to="/create">
            Create User
          </Button>
        </Toolbar>
      </AppBar>

      <Container
        style={{
          marginTop: "20px",
          padding: "20px",
          maxWidth: "1200px",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={<UserList users={users} updateUser={updateUser} deleteUser={deleteUser} />}
          />
          <Route
            path="/user/:id"
            element={<UserDetail users={users} updateUser={updateUser} />}
          />
          <Route
            path="/create"
            element={<CreateUserForm addUser={addUser} />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
