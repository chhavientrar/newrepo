import React, { useState } from 'react';
import {
    Card,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Switch,
    Typography,
    Button,
    Grid,
    SelectChangeEvent,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// Define types for teachers and students
type Teacher = {
    id: number;
    name: string;
    subjects: string[];
};

type Student = {
    id: number;
    name: string;
};

export default function MarkAttendanceView() {
    // Dummy data
    const teachers: Teacher[] = [
        { id: 1, name: "Mr. Sharma", subjects: ["Math", "Physics"] },
        { id: 2, name: "Ms. Gupta", subjects: ["Chemistry", "Biology"] },
    ];

    const students: Student[] = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
    ];

    // State variables
    const [selectedTeacher, setSelectedTeacher] = useState<number>(teachers[0].id);
    const [selectedSubject, setSelectedSubject] = useState<string>(teachers[0].subjects[0]);
    const [attendance, setAttendance] = useState<{ [key: number]: boolean }>(
        students.reduce((acc, student) => ({ ...acc, [student.id]: true }), {}) // default all to present
    );
    const [showStudentList, setShowStudentList] = useState(false);

    // Handlers
    const handleTeacherChange = (event: SelectChangeEvent<number>) => {
        const teacherId = Number(event.target.value);
        setSelectedTeacher(teacherId);
        const teacher = teachers.find((t) => t.id === teacherId);
        if (teacher) setSelectedSubject(teacher.subjects[0]);
    };

    const handleSubjectChange = (event: SelectChangeEvent<string>) => {
        setSelectedSubject(event.target.value as string);
    };

    const toggleAttendance = (studentId: number) => {
        setAttendance((prevAttendance) => ({
            ...prevAttendance,
            [studentId]: !prevAttendance[studentId],
        }));
    };

    const handleFetchStudents = () => {
        setShowStudentList(true);
    };

    // DataGrid columns
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Student Name', width: 150 },
        {
            field: 'attendance',
            headerName: 'Attendance',
            width: 150,
            renderCell: (params) => (
                <Switch
                    checked={attendance[params.row.id]}
                    onChange={() => toggleAttendance(params.row.id)}
                    color="primary"
                />
            ),
        },
    ];

    return (
        <Card sx={{ p: 2 }}>
            <Typography variant="h6" align="center" gutterBottom>
                Mark Attendance
            </Typography>

            {/* Grid container for Teacher and Subject Selection */}
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                {/* Teacher Selection */}
                <Grid item xs={12} sm={4}>
                    <FormControl disabled fullWidth margin="normal">
                        <InputLabel>Teacher</InputLabel>
                        <Select value={selectedTeacher} onChange={handleTeacherChange}>
                            {teachers.map((teacher) => (
                                <MenuItem key={teacher.id} value={teacher.id}>
                                    {teacher.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Subject Selection */}
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Subject</InputLabel>
                        <Select value={selectedSubject} onChange={handleSubjectChange}>
                            {teachers
                                .find((teacher) => teacher.id === selectedTeacher)
                                ?.subjects.map((subject, index) => (
                                    <MenuItem key={index} value={subject}>
                                        {subject}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Fetch Students Button */}
                <Grid item xs={12} sm={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFetchStudents}
                        sx={{ marginTop: 3 }}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>

            {/* Student List in DataGrid */}
            {showStudentList && (
                <div style={{ height: 300, width: '100%' }}>
                    <DataGrid
                        rows={students}
                        columns={columns}
                        getRowId={(row) => row.id}
                    />
                </div>
            )}
        </Card>
    );
}
