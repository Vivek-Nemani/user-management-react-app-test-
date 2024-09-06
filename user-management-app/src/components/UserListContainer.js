import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserList from "./UserList";
import fetchUsers from "../services/Fetching";

function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const newUser = location.state?.newUser; // Get new user from navigation state

  // Fetch users from API
  const loadUsers = async () => {
    try {
      const userData = await fetchUsers();
      setUsers(userData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only load users on initial render (not if we have a new user)
    if (!newUser) {
      loadUsers();
    }
  }, [newUser]);

  useEffect(() => {
    // If there's a new user from location state, add them to the list
    if (newUser) {
      setUsers((prevUsers) => [newUser, ...prevUsers]);
    }
  }, [newUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <UserList users={users} />;
}

export default UserListContainer;
