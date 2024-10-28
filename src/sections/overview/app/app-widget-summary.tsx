import { Key, useState } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Card, { CardProps } from '@mui/material/Card';
import {
  Chip,
  Grid,
  Dialog,
  Button,
  TextField,
  CardHeader,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import QuizComponent from './view/quiz/quiz';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  skillsArray: any;
}

export default function AppWidgetSummary({ title, skillsArray, sx, ...other }: Props) {
  const [open, setOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);

  const theme = useTheme();
  console.log(quizCompleted)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuizOpen(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setQuizOpen(true);
    }
  };

  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true);
    setQuizOpen(false);

    // Now you can call the API with the skill name and quiz score
    const skillData = {
      skill: newSkill,
      score,
    };

    fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skillData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success
        console.log('Skill added:', data);
        skillsArray.push(newSkill);
        setNewSkill('');
      })
      .catch((error) => {
        // Handle error
        console.error('Error:', error);
      });
  };

  return (
    <Card sx={{ display: 'flex', height: 413, ...sx }} {...other}>
      <Box sx={{ flexGrow: 2 }}>
        <CardHeader title={title} />

        <Box
          sx={{
            mt: 1.2,
            display: 'flex',
            borderTop: `dashed 1px ${theme.palette.divider}`,
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Grid sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {skillsArray?.map((skill: any, index: Key | null | undefined) => (
              <Chip key={index} variant="outlined" label={skill} color="primary" />
            ))}
            <Chip variant="outlined" label="Add Other" color="warning" onClick={handleClickOpen} />
          </Grid>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Skill</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the new skill you want to add.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Skill"
            type="text"
            fullWidth
            variant="standard"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddSkill}>Add</Button>
        </DialogActions>
      </Dialog>

      <QuizComponent open={quizOpen} onClose={handleClose} onComplete={handleQuizComplete} />
    </Card>
  );
}
