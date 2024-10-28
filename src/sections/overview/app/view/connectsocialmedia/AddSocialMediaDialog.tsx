import axios from 'axios';
import React, { useState } from 'react';

import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface AddSocialMediaDialogProps {
  open: boolean;
  onClose: () => void;
  socialMediaName: string;
  onAdd: (link: string) => void;
}

const AddSocialMediaDialog: React.FC<AddSocialMediaDialogProps> = ({
  open,
  onClose,
  socialMediaName,
  onAdd,
}) => {
  const [link, setlink] = useState('');

  const handleAdd = async () => {
    const payload = {
      socialMediaLinks: [{ platform: socialMediaName, link }],
    };
    try {
      const response = await axios.put('/users/me/socialMediaLinks', payload, {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to update social media link');
      }
      // Uncomment if you have a function to get user details
      // getUserDetails();
      onClose();
      setlink('');
      // Uncomment if you have a function to show success message
      // enqueueSnackbar('Social media link added successfully!');
    } catch (error) {
      console.error('Error updating social media link:', error);
      // Uncomment if you have a function to show error message
      // enqueueSnackbar('Failed to add social media link');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add {socialMediaName} link</DialogTitle>
      <DialogContent sx={{ width: '350px' }}>
        <TextField
          autoFocus
          margin="dense"
          label="link"
          type="link"
          fullWidth
          variant="standard"
          value={link}
          onChange={(e) => setlink(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSocialMediaDialog;
