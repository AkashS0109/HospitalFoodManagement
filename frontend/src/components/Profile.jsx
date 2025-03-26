import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Avatar, 
  Typography, 
  Box, 
  TextField, 
  Button 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector(store => store.auth?.user); // Access user from Redux store
  console.log("User Data:", user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
  });

  const [isEditing, setIsEditing] = useState(false); // State for edit mode

  // Pre-fill the form with user data
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        avatar: user?.avatar || 'https://via.placeholder.com/150',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Updated Profile Data:', formData);
    // TODO: Dispatch Redux action or make an API call to save updated data
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card sx={{ maxWidth: 400, textAlign: 'center', boxShadow: 3, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: -5 }}>
          <Avatar
            alt="Profile Picture"
            src={formData.avatar}
            sx={{ width: 100, height: 100 }}
          />
          {isEditing && (
            <Button
              component="label"
              variant="contained"
              sx={{ ml: 2, mt: 4 }}
            >
              Upload Avatar
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </Button>
          )}
        </Box>
        <CardContent>
          <TextField
            fullWidth
            name="name"
            label="Name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
            disabled={!isEditing}
          />
          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
            disabled={!isEditing}
          />
          <TextField
            fullWidth
            name="phone"
            label="Phone Number"
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
            sx={{ mb: 2 }}
            disabled={!isEditing}
          />
          <Box sx={{ mt: 2 }}>
            {isEditing ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
