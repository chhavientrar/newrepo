/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Legend,
    Tooltip,
    ArcElement,
    LinearScale,
    CategoryScale,
    Chart as ChartJS,
} from "chart.js";

import { Card, Typography } from "@mui/material";

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

export default function AttendanceReport() {
    // Dummy data for the attendance report
    const attendanceData = {
        labels: ["Present", "Absent"],
        datasets: [
            {
                label: "Attendance",
                data: [85, 15], // 85% Present, 15% Absent
                backgroundColor: ["#4CAF50", "#FF5252"],
                borderColor: ["#4CAF50", "#FF5252"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Card sx={{ p: 2 }}>
            <Typography variant="h6" align="center" gutterBottom>
                Attendance Report
            </Typography>

            {/* Option 1: Wrap in a div with fixed width and height */}
            <div style={{ width: "300px", height: "300px", margin: "0 auto" }}>
                <Pie
                    data={attendanceData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: "bottom",
                            },
                            tooltip: {
                                callbacks: {
                                    label: (tooltipItem) =>
                                        `${tooltipItem.label}: ${tooltipItem.raw}%`,
                                },
                            },
                        },
                    }}
                />
            </div>

            {/* Option 2: Set width and height directly on the Pie component */}
            {/* <Pie
                data={attendanceData}
                width={300}
                height={300}
                options={{
                    maintainAspectRatio: false, // To use width and height settings
                    plugins: {
                        legend: {
                            position: "bottom",
                        },
                        tooltip: {
                            callbacks: {
                                label: (tooltipItem) =>
                                    `${tooltipItem.label}: ${tooltipItem.raw}%`,
                            },
                        },
                    },
                }}
            /> */}
        </Card>
    );
}
