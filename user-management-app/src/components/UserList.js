// UserList.js
import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserList({ users, updateUser, deleteUser }) {
  const navigate = useNavigate();

  const handleUpdateClick = (user) => {
    // Navigate to the edit user page
    navigate(`/user/${user.id}`);
  };

  const handleDeleteClick = async (userId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete user");
      deleteUser(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Paper
      style={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        style={{
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        User List
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem
            key={user.id}
            style={{
              marginBottom: "15px",
              backgroundColor: "#fff",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s, box-shadow 0.3s",
            }}
          >
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: "#3f51b5" }}>
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  {user.name}
                </Typography>
              }
              secondary={
                <Typography variant="body2" color="textSecondary">
                  {user.email}
                </Typography>
              }
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => handleUpdateClick(user)}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => handleDeleteClick(user.id)}
              >
                Delete
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default UserList;

