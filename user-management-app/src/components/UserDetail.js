import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

function UserDetail({ users, updateUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchedUser = users.find((user) => user.id === parseInt(id));
    if (fetchedUser) {
      setUser(fetchedUser);
      setFormData({
        name: fetchedUser.name,
        email: fetchedUser.email,
        phone: fetchedUser.phone,
      });
      setLoading(false);
    } else {
      setError("User not found");
      setLoading(false);
    }
  }, [id, users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to update user");
      const updatedUser = await response.json();
      updateUser(updatedUser);
      setSuccess("User updated successfully!");
      setError("");
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user. Please try again.");
      setSuccess("");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete user");
      setSuccess("User deleted successfully!");
      setError("");
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again.");
      setSuccess("");
    }
  };

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Edit User
          </Typography>
          {success && (
            <Typography color="primary" style={{ marginBottom: "10px" }}>
              {success}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px" }}
            >
              Update
            </Button>
          </form>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDelete}
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Delete User
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default UserDetail;

