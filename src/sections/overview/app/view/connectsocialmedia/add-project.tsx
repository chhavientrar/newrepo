/* eslint-disable arrow-body-style */
import React from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import './addProjectDialogStyles.css';
import AddProjectForm from './add-project-form'; // Import your CSS file

interface AddProjectDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddProjectDialog: React.FC<AddProjectDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add Project</DialogTitle>
      <DialogContent dividers className="dialogContent">
        <AddProjectForm handleClose={onClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {/* <Button onClick={onClose}>Add</Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default AddProjectDialog;
