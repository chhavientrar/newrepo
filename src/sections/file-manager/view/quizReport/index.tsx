import axios from "axios";
import React, { useState, useEffect } from "react";

import {Box, Card, Radio, Table, Button,  TableRow, TableHead, TableCell, TableBody,Typography,   RadioGroup, FormControlLabel } from '@mui/material';

interface Question {
  _id: string;
  question: string;
  options: Record<string, string>;
}

interface Answers {
  [questionId: string]: string;
}

interface LeaderboardEntry {
  _id: string;
  studentName: string;
  score: number;
  totalQuestions: number;
}

const QuizComponentView: React.FC = () => {
  const [step, setStep] = useState<
    "loading" | "instructions" | "quiz" | "completed" | "results"
  >("loading");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [score, setScore] = useState<number | null>(null);
  const [rank, setRank] = useState<number | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [totalQuestions, setTotalQuestions] = useState<number | null>(null);

  useEffect(() => {
    const checkQuizCompletion = async () => {
      try {
        const studentId = localStorage.getItem("id");
        if (!studentId) {
          alert("Student ID is missing. Please log in again.");
          return;
        }

        const response = await axios.get<{
          completed: boolean;
          leaderboard?: LeaderboardEntry[];
          studentRank?: number;
          totalQuestions?: number;
          studentScore?: number;
        }>(`/quiz/check-completion?studentId=${studentId}`);

        if (response.data.completed) {
          setLeaderboard(response.data.leaderboard || []);
          setRank(response.data.studentRank || null);
          setScore(response.data.studentScore || null);
          setTotalQuestions(response.data.totalQuestions || null);
          setStep("results");
        } else {
          setTotalQuestions(response.data.totalQuestions || null);
          setStep("instructions");
        }
      } catch (error) {
        console.error("Error checking quiz completion:", error);
        alert("Failed to load quiz data. Please try again.");
      }
    };

    checkQuizCompletion();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get<{ data: Question[] }>("/admin/questions");
      setQuestions(response.data.data);
      setStep("quiz");
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswerSelect = (questionId: string, selectedOption: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const submitQuiz = async () => {
    try {
      const studentId = localStorage.getItem("id");
      if (!studentId) {
        alert("Student ID is missing. Please log in again.");
        return;
      }

      const response = await axios.post<{ score: number; message: string }>(
        "/quiz/submit",
        { studentId, answers }
      );

      setScore(response.data.score);
      alert(response.data.message);
      setStep("completed");
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Failed to submit quiz. Please try again.");
    }
  };

  const viewLeaderboard = async () => {
    try {
      const studentId = localStorage.getItem("id");
      if (!studentId) {
        alert("Student ID is missing. Please log in again.");
        return;
      }

      const response = await axios.get<{
        leaderboard: LeaderboardEntry[];
        studentRank: number;
      }>(`/quiz/check-completion?studentId=${studentId}`);

      setLeaderboard(response.data.leaderboard);
      setRank(response.data.studentRank);
      setStep("results");
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  return (
    <Card sx={{ p: 2 }}>
      {step === "instructions" && (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Quiz Instructions
          </Typography>
          <Typography sx={{ mb: 4 }}>
            - Read each question carefully.
            <br />- Select the correct answer from the options provided.
            <br />- Submit your quiz at the end to see your score.
          </Typography>
          <Button variant="contained" onClick={fetchQuestions}>
            Start Quiz
          </Button>
        </Box>
      )}

      {step === "quiz" && questions.length > 0 && (
        <Box>
          <Typography variant="h6">
            Question {currentQuestionIndex + 1}/{totalQuestions || questions.length}
          </Typography>
          <Typography sx={{ mt: 2 }}>{questions[currentQuestionIndex].question}</Typography>
          <RadioGroup
            sx={{ mt: 2 }}
            value={answers[questions[currentQuestionIndex]._id] || ""}
            onChange={(e) =>
              handleAnswerSelect(questions[currentQuestionIndex]._id, e.target.value)
            }
          >
            {Object.entries(questions[currentQuestionIndex].options).map(([key, option]) => (
              <FormControlLabel
                key={key}
                value={key}
                control={<Radio />}
                label={`${key.toUpperCase()}: ${option}`}
              />
            ))}
          </RadioGroup>
          <Box sx={{ mt: 3 }}>
            {currentQuestionIndex > 0 && (
              <Button
                variant="outlined"
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              >
                Previous
              </Button>
            )}
            {currentQuestionIndex < questions.length - 1 && (
              <Button
                variant="contained"
                sx={{ ml: 2 }}
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              >
                Next
              </Button>
            )}
            {currentQuestionIndex === questions.length - 1 && (
              <Button variant="contained" color="success" sx={{ ml: 2 }} onClick={submitQuiz}>
                Submit Quiz
              </Button>
            )}
          </Box>
        </Box>
      )}

      {step === "completed" && (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Quiz Completed Successfully!
          </Typography>
          <Button variant="contained" onClick={viewLeaderboard}>
            See Leaderboard
          </Button>
        </Box>
      )}

      {step === "results" && (
        <Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Quiz Results
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1">
              <strong>Your Score:</strong> {score}/{totalQuestions || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Your Rank:</strong> {rank} out of {leaderboard.length} students
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Leaderboard
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Rank</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell align="center">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map((entry, index) => (
                <TableRow key={entry._id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>{entry.studentName}</TableCell>
                  <TableCell align="center">{entry.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Card>
  );
};

export default QuizComponentView;
