/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Legend,
    Tooltip,
    BarElement,
    LinearScale,
    CategoryScale,
    Chart as ChartJS,
} from "chart.js";

import { Card, Typography } from "@mui/material";

// Register chart.js components
ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

export default function AttendanceReport() {
    // Dummy data for the attendance report (Bar Chart)
    const attendanceData = {
        labels: ["Student 1", "Student 2", "Student 3", "Student 4", "Student 5"], // Student names
        datasets: [
            {
                label: "Attendance",
                data: [80, 90, 75, 65, 95], // Attendance percentages for each student
                backgroundColor: "#4CAF50", // Color for the bars
                borderColor: "#4CAF50",
                borderWidth: 1,
            },
        ],
    };

    return (
        <Card sx={{ p: 2 }}>
            <Typography variant="h6" align="center" gutterBottom>
                Attendance Report
            </Typography>

            {/* Bar Chart */}
            <div style={{ width: "100%", height: "400px" }}>
                <Bar
                    data={attendanceData}
                    options={{
                        responsive: true,
                        scales: {
                            x: {
                                beginAtZero: true, // Start X axis from zero
                            },
                            y: {
                                beginAtZero: true, // Start Y axis from zero
                            },
                        },
                        plugins: {
                            legend: {
                                position: "top", // Position legend at the top
                            },
                            tooltip: {
                                callbacks: {
                                    label: (tooltipItem) =>
                                        `${tooltipItem.label}: ${tooltipItem.raw}%`, // Display percentage in tooltips
                                },
                            },
                        },
                    }}
                />
            </div>
        </Card>
    );
}
