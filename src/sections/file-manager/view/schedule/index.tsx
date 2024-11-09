/* eslint-disable @typescript-eslint/no-shadow */
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import {
    Card,
    Grid,
    Table,
    Select,
    Button,
    Dialog,
    MenuItem,
    TableRow,
    TextField,
    TableHead,
    TableCell,
    TableBody,
    InputLabel,
    Typography,
    IconButton,
    FormControl,
    DialogTitle,
    DialogActions,
    DialogContent,
    TableContainer,
} from '@mui/material';

import Iconify from 'src/components/iconify';

type ScheduledClass = {
    _id: string;
    batch: string;
    semester: string;
    subject: string;
    date: string;
    startTime: string;
    endTime: string;
    college: string;
    createdBy: string;
};

export default function ScheduleClassView() {
    const batches = ['Batch A', 'Batch B', 'Batch C', 'Batch D'];
    const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];
    const subjects = ['Math', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'DBMS'];
    const colleges = ['College of Engineering', 'College of Arts', 'College of Sciences', 'College of Business'];

    const [batch, setBatch] = useState('');
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [college, setCollege] = useState('');
    const [error, setError] = useState('');
    const [showMessage, setShowMessage] = useState('');
    const [scheduledClasses, setScheduledClasses] = useState<ScheduledClass[]>([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [classToDelete, setClassToDelete] = useState<string | null>(null);
    const createdBy = '672ce733c9405792a01ecea4';

    useEffect(() => {
        fetchScheduledClasses();
    }, []);

    const fetchScheduledClasses = async () => {
        try {
            const response = await axios.get('/schedule/classes', {
                headers: {
                    'auth-token': `${window.localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
            });
            setScheduledClasses(response.data || []);
        } catch (err) {
            console.error('Error fetching classes:', err);
            setError('Failed to load classes. Please try again later.');
        }
    };

    const handleScheduleClass = async () => {
        if (!batch || !semester || !subject || !date || !startTime || !endTime || !college) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            await axios.post('/schedule/class', {
                batch,
                semester,
                subject,
                date,
                startTime,
                endTime,
                college,
                createdBy,
            }, {
                headers: {
                    'auth-token': `${window.localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
            });

            setShowMessage('Class scheduled successfully!');
            setBatch('');
            setSemester('');
            setSubject('');
            setDate('');
            setStartTime('');
            setEndTime('');
            setCollege('');
            setError('');
            fetchScheduledClasses();
        } catch (err) {
            console.error("Error scheduling class:", err);
            setError('Failed to schedule class. Please try again later.');
        }
    };

    const handleDeleteClass = async () => {
        if (classToDelete) {
            try {
                await axios.delete(`/schedule/class/${classToDelete}`, {
                    headers: {
                        'auth-token': `${window.localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json',
                    },
                });
                setShowMessage('Class deleted successfully!');
                setOpenDeleteDialog(false);
                setClassToDelete(null);
                fetchScheduledClasses();
            } catch (err) {
                console.error("Error deleting class:", err);
                setError('Failed to delete class. Please try again later.');
            }
        }
    };

    const handleOpenDeleteDialog = (id: string) => {
        setClassToDelete(id);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setClassToDelete(null);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB').format(date);
    };

    const formatTime = (timeString: string) => {
        const date = new Date(`1970-01-01T${timeString}`);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    return (
        <Card sx={{ p: 2 }}>
            <Typography variant="h6" align="center" gutterBottom>
                Schedule Class
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth required>
                        <InputLabel>Batch</InputLabel>
                        <Select value={batch} onChange={(e) => setBatch(e.target.value)}>
                            {batches.map((batchOption, index) => (
                                <MenuItem key={index} value={batchOption}>
                                    {batchOption}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth required>
                        <InputLabel>Semester</InputLabel>
                        <Select value={semester} onChange={(e) => setSemester(e.target.value)}>
                            {semesters.map((semesterOption, index) => (
                                <MenuItem key={index} value={semesterOption}>
                                    {semesterOption}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth required>
                        <InputLabel>Subject</InputLabel>
                        <Select value={subject} onChange={(e) => setSubject(e.target.value)}>
                            {subjects.map((subjectOption, index) => (
                                <MenuItem key={index} value={subjectOption}>
                                    {subjectOption}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Start Time"
                        type="time"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        label="End Time"
                        type="time"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth required>
                        <InputLabel>College</InputLabel>
                        <Select value={college} onChange={(e) => setCollege(e.target.value)}>
                            {colleges.map((collegeOption, index) => (
                                <MenuItem key={index} value={collegeOption}>
                                    {collegeOption}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    {error && <Typography color="error" align="center">{error}</Typography>}
                    {showMessage && <Typography color="primary" align="center">{showMessage}</Typography>}
                </Grid>

                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleScheduleClass}
                    >
                        Schedule Class
                    </Button>
                </Grid>
            </Grid>

            {scheduledClasses.length > 0 ? (
                <TableContainer sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Batch</TableCell>
                                <TableCell>Semester</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Start Time</TableCell>
                                <TableCell>End Time</TableCell>
                                <TableCell>College</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scheduledClasses.map((classItem) => (
                                <TableRow key={classItem._id}>
                                    <TableCell>{classItem.batch}</TableCell>
                                    <TableCell>{classItem.semester}</TableCell>
                                    <TableCell>{classItem.subject}</TableCell>
                                    <TableCell>{formatDate(classItem.date)}</TableCell>
                                    <TableCell>{formatTime(classItem.startTime)}</TableCell>
                                    <TableCell>{formatTime(classItem.endTime)}</TableCell>
                                    <TableCell>{classItem.college}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => handleOpenDeleteDialog(classItem._id)}
                                            color="error"
                                        >
                                            <Iconify icon="solar:trash-bin-trash-bold" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography>No classes scheduled yet.</Typography>
            )}


            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this class?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteClass} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
