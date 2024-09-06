import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CreateUserForm({ addUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newUser = await response.json();
      console.log("User created:", newUser);

      // Pass the new user to App.js to update the state
      addUser(newUser);

      // Navigate back to home page and display a success message
      navigate("/", {
        state: { successMessage: "User created successfully!" },
      });

      setError("");
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Failed to create user. Please try again.");
      setSuccess("");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      style={{
        marginTop: "20px",
      }}
    >
      <Grid item xs={12} sm={6}>
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            Create New User
          </Typography>
          {error && (
            <Typography
              color="error"
              style={{
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              {error}
            </Typography>
          )}
          {success && (
            <Typography
              color="primary"
              style={{
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
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
              style={{
                marginBottom: "15px",
              }}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              style={{
                marginBottom: "15px",
              }}
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              style={{
                marginBottom: "20px",
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{
                marginTop: "10px",
              }}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CreateUserForm;

