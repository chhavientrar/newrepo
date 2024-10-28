/* eslint-disable consistent-return */
import axios from 'axios';
/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import { ClockIcon } from '@mui/x-date-pickers';
import {
  Box,
  Grid,
  Radio,
  Button,
  Dialog,
  Typography,
  RadioGroup,
  FormControl,
  DialogContent,
  DialogActions,
  FormControlLabel,
} from '@mui/material';

import ChartRadialBar from './QuizChart';

interface QuizProps {
  open: boolean;
  onClose: () => void;
  onComplete: (score: number, answeredQuestions: number) => void;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const Timer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.2rem',
  marginBottom: theme.spacing(1),
}));

const QuestionNumber = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
  minWidth: '40px',
  height: '40px',
}));

export default function QuizComponent({ open, onClose, onComplete }: QuizProps) {
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [timers, setTimers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeUp, setTimeUp] = useState<boolean[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);

  console.log(score)

  useEffect(() => {
    if (open && quizQuestions.length > 0) {
      const interval = setInterval(() => {
        setTimers((prevTimers) => {
          const newTimers = [...prevTimers];
          if (newTimers[currentQuestion] > 0) {
            newTimers[currentQuestion] -= 1;
          } else {
            setTimeUp((prevTimeUp) => {
              const newTimeUp = [...prevTimeUp];
              newTimeUp[currentQuestion] = true;
              return newTimeUp;
            });

            if (currentQuestion < quizQuestions.length - 1) {
              setCurrentQuestion((prev) => prev + 1);
            }
          }
          return newTimers;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [open, currentQuestion, quizQuestions.length]);

  // const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const updatedAnswers = [...selectedAnswers];
  //   updatedAnswers[currentQuestion] = event.target.value;
  //   setSelectedAnswers(updatedAnswers);

  //   if (!timeUp[currentQuestion] && updatedAnswers[currentQuestion]) {
  //     setAnsweredQuestions((prev) => prev + 1);
  //   }
  // };
  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = [...selectedAnswers];
    const questionIndex = currentQuestion;

    // Set the selected answer
    updatedAnswers[questionIndex] = event.target.value;
    setSelectedAnswers(updatedAnswers);

    // Increase answeredQuestions count only if this question is answered for the first time
    if (!timeUp[questionIndex] && !selectedAnswers[questionIndex]) {
      setAnsweredQuestions((prev) => prev + 1);
    }
  };

  // };
  const handleSubmit = () => {
    const calculatedScore = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === quizQuestions[index].correctAnswer ? 10 : 0);
    }, 0);

    setScore(calculatedScore);
    // onComplete(calculatedScore);  // Pass score to parent component

    // Pass answeredQuestions as well (total answered questions)
    onComplete(calculatedScore, answeredQuestions);

    // Reset all values for the next quiz attempt
    setSelectedAnswers([]);
    setAnsweredQuestions(0);
    setCurrentQuestion(0);

    onClose(); // Close the quiz modal after completion
  };



  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const getQuestionList = async () => {
    try {
      const response = await axios.get('/skills/mcq?skill=git', {
        headers: {
          'auth-token': `${window.localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
      });

      const questions: Question[] = response?.data.map((q: any) => ({
        question: q.question,
        options: Object.values(q.options),
        correctAnswer: q.options[q.correctoption],
      }));

      setQuizQuestions(questions);
      setSelectedAnswers(Array(questions.length).fill(''));
      setTimers(Array(questions.length).fill(60)); // 1 minute for each question
      setTimeUp(Array(questions.length).fill(false));
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    if (open) {
      getQuestionList();
    }
  }, [open]);


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent>
        <Grid sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <Timer>
            <ClockIcon />
            <Typography sx={{ ml: 1 }}>
              Time remaining: {formatTime(timers[currentQuestion])}
            </Typography>
          </Timer>

          <DialogActions>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Grid>

        {quizQuestions.length > 0 && (
          <Grid container spacing={2}>
            <Grid item md={8} lg={8} xs={12}>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Question {currentQuestion + 1} of {quizQuestions.length}
              </Typography>
              <Typography variant="h5" sx={{ mt: 2 }}>
                {quizQuestions[currentQuestion].question}
              </Typography>
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <RadioGroup value={selectedAnswers[currentQuestion]} onChange={handleAnswerChange}>
                  <Grid container spacing={1}>
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <Grid item xs={6} key={index}>
                        <FormControlLabel value={option} control={<Radio />} label={option} />
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={4} lg={4} xs={12}>
              {/* <ChartRadialBar totalCount={quizQuestions.length} series={[answeredQuestions]} /> */}
              <ChartRadialBar answeredQuestions={answeredQuestions} totalCount={quizQuestions.length} series={[answeredQuestions]} />

            </Grid>
          </Grid>
        )}

        <Box sx={{ display: 'flex', p: 1, justifyContent: 'space-between', marginTop: 2 }}>
          <Button
            variant="contained"
            onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
          >
            Prev
          </Button>
          <Box>
            {quizQuestions.map((_, index) => (
              <QuestionNumber
                key={index}
                variant={index === currentQuestion ? 'contained' : 'outlined'}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </QuestionNumber>
            ))}
          </Box>
          <Button
            variant="contained"
            onClick={() =>
              setCurrentQuestion((prev) => Math.min(prev + 1, quizQuestions.length - 1))
            }
          >
            Next
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
