import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <Grid container spacing={3}>
      {users.map((user) => (
        <Grid item xs={12} sm={6} md={4} key={user.id}>
          <Card style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Email: {user.email}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Phone: {user.phone}
              </Typography>
              <Button
                component={Link}
                to={`/user/${user.id}`}
                variant="contained"
                color="primary"
                style={{ marginTop: '10px' }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default UserList;


