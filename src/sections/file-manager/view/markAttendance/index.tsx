/* eslint-disable no-nested-ternary */
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
    Card,
    Grid,
    Select,
    Button,
    Switch,
    Avatar,
    Dialog,
    MenuItem,
    TextField,
    InputLabel,
    Typography,
    FormControl,
    DialogTitle,
    DialogActions,
    DialogContent,
    CircularProgress,
} from '@mui/material';

// Define types for selections
type Class = {
    _id: string;
    batch: string;
    semester: string;
    subject: string;
    date: string;
    college: string;
    startTime: string;
    endTime: string;
};

type Student = {
    phone: any;
    _id: any;
    id: string;
    name: string;
    email: string;
    phoneNo: string;
    studentId: string;
    profileImageUrl: string;
    present: boolean;
};

export default function MarkAttendanceView() {
    // State variables for form selections and data
    const [classes, setClasses] = useState<Class[]>([]);  // To hold all classes
    const [students, setStudents] = useState<Student[]>([]);  // To hold students
    const [attendance, setAttendance] = useState<{ [key: string]: boolean }>({}); // Attendance map
    const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null); // Selected student for dialog

    const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
    const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
    const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [showStudentList, setShowStudentList] = useState(false);


    const [loading, setLoading] = useState<boolean>(false);
    console.log(attendance)

    // Fetch classes from the API
    const fetchClasses = async () => {
        try {
            const response = await axios.get('/schedule/classes', {
                headers: {
                    'auth-token': `${window.localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
            });
            setClasses(response.data || []);
        } catch (err) {
            console.error('Error fetching classes:', err);
        }
    };

    // Fetch students based on selected filters
    const fetchStudents = async () => {
        if (selectedCollege && selectedBatch && selectedSemester && selectedDate && selectedTime) {
            setLoading(true); // Start loading when fetching students
            try {
                const response = await axios.get('/attendance/search', {
                    params: {
                        college: selectedCollege,
                        batch: selectedBatch,
                        className: selectedSemester,  // Using 'className' to match API requirement
                    },
                    headers: {
                        'auth-token': `${window.localStorage.getItem('auth-token')}`,
                    },
                });
                const studentsData = response.data?.students;
                setStudents(studentsData);
                setAttendance(
                    studentsData.reduce((acc: any, student: Student) => {
                        acc[student.id] = student.present; // Use the 'present' field from API
                        return acc;
                    }, {})
                );
                setShowStudentList(true);
            } catch (err) {
                console.error('Error fetching students:', err);
            } finally {
                setLoading(false); // Stop loading after the request is complete
            }
        } else {
            alert('Please select all filters');
        }
    };
    // Extract unique dropdown options from the classes data
    const getUniqueOptions = (key: keyof Class) => {
        const options = new Set(classes.map((cls) => cls[key]));
        return Array.from(options);
    };

    // Handlers for form selections
    const handleCollegeChange = (event: any) => setSelectedCollege(event.target.value);
    const handleBatchChange = (event: any) => setSelectedBatch(event.target.value);
    const handleSemesterChange = (event: any) => setSelectedSemester(event.target.value);
    const handleDateChange = (event: any) => setSelectedDate(event.target.value);
    const handleTimeChange = (event: any) => setSelectedTime(event.target.value);

    const handleFetchStudents = () => fetchStudents(); // Fetch students based on selections

    // DataGrid columns
    const columns: GridColDef[] = [
        {
            field: 'profileImageUrl',
            headerName: 'Profile',
            width: 100,
            renderCell: (params) => (
                <Avatar src={params.row.profileImageUrl} alt={params.row.name} />
            ),
        },
        { field: 'name', headerName: 'Student Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phoneNo', headerName: 'Phone Number', width: 150 },
        {
            field: 'attendance',
            headerName: 'Attendance',
            width: 150,
            renderCell: (params) => (
                <Switch
                    checked={params.row.present}
                    onChange={() => handleAttendanceChange(params.row.id)}  // Handle attendance change with confirmation
                    color="primary"
                />
            ),
        },
    ];

    const handleAttendanceChange = (studentId: string) => {
        // Show confirmation dialog when toggling attendance
        setSelectedStudentId(studentId); // Set selected student ID for dialog
        setOpenDialog(true); // Open dialog
    };

    const handleDialogClose = () => {
        setOpenDialog(false); // Close dialog without any change
        setSelectedStudentId(null);
    };

    const handleConfirmAttendance = async () => {
        if (selectedStudentId) {

            // Prepare the payload for the API request
            const payload = {
                college: selectedCollege,
                batch: selectedBatch,
                className: selectedSemester,
                date: selectedDate,
                time: selectedTime,
                students: [
                    {
                        studentId: selectedStudentId,
                        present: false,  // Toggle the attendance status
                    },
                ],
                markedBy: "672ce733c9405792a01ecea4", // Example of the user marking attendance (you can replace it as needed)
            };

            try {
                // Send the POST request to mark attendance
                const response = await axios.post('/attendance/mark', payload, {
                    headers: {
                        'auth-token': `${window.localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                // On success, update the attendance state
                if (response.status === 201) {
                    // setAttendance((prevAttendance) => ({
                    //     ...prevAttendance,
                    //     [selectedStudentId]: !isPresent, // Update the attendance state with the toggled value
                    // }));
                    setOpenDialog(false); // Close the dialog
                    fetchStudents();
                    // setSelectedStudentId(null); // Reset selected student ID
                } else {
                    console.error('Failed to mark attendance:', response);
                }
            } catch (err) {
                console.error('Error marking attendance:', err);
            }
        }
    };
    // Fetch classes when the component mounts
    useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <Card sx={{ p: 2 }}>
            <Typography variant="h6" align="center" gutterBottom>
                Mark Attendance
            </Typography>

            {/* Form fields for selection */}
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                {/* College Selection */}
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>College</InputLabel>
                        <Select value={selectedCollege || ''} onChange={handleCollegeChange}>
                            {getUniqueOptions('college').map((college) => (
                                <MenuItem key={college} value={college}>
                                    {college}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Batch Selection */}
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Batch</InputLabel>
                        <Select value={selectedBatch || ''} onChange={handleBatchChange}>
                            {getUniqueOptions('batch').map((batch) => (
                                <MenuItem key={batch} value={batch}>
                                    {batch}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Semester Selection */}
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Semester</InputLabel>
                        <Select value={selectedSemester || ''} onChange={handleSemesterChange}>
                            {getUniqueOptions('semester').map((semester) => (
                                <MenuItem key={semester} value={semester}>
                                    {semester}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Date Selection */}
                <Grid item xs={12} sm={3} mt={2}>
                    <TextField
                        label="Date"
                        type="date"
                        fullWidth
                        // InputLabelProps={{ shrink: true }}
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </Grid>

                {/* Time Slot Selection */}
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Time Slot</InputLabel>
                        <Select value={selectedTime || ''} onChange={handleTimeChange}>
                            {getUniqueOptions('startTime').map((startTime) => {
                                const correspondingEndTime = classes.find(
                                    (cls) => cls.startTime === startTime
                                )?.endTime;
                                return (
                                    <MenuItem key={startTime} value={`${startTime} - ${correspondingEndTime}`}>
                                        {startTime} - {correspondingEndTime}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Button variant="contained" color="primary" onClick={handleFetchStudents} disabled={!selectedDate || !selectedTime}>
                Fetch Students
            </Button>

            {/* Display Students */}


            {loading ? (
                <CircularProgress sx={{ display: 'block', margin: 'auto' }} /> // Show loader while fetching students
            ) : showStudentList ? (
                <div style={{ height: 400, width: '100%', marginTop: '10px' }}>
                    <DataGrid
                        rows={students.map((student) => ({
                            id: student._id,
                            name: student.name,
                            email: student.email,
                            phoneNo: student.phone,
                            present: student.present,
                            profileImageUrl: student.profileImageUrl,
                        }))}
                        columns={columns}
                    />
                </div>
            ) : null}



            {/* Dialog for Attendance Confirmation */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Confirm Attendance Change</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to mark this student as Absent?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmAttendance} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
