import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get('http://localhost:5000/api/user/profile'); // Adjust API endpoint
      setProfile(response.data);
    };
    fetchProfile();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Address: {profile.address || 'Not provided'}</p>
    </div>
  );
};

export default Profile;
