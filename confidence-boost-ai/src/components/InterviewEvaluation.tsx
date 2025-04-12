import React from "react";
import { AnswerEvaluation } from "@/types";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

type InterviewEvaluationProps = {
  evaluation: AnswerEvaluation;
  onContinue: () => void;
};

const ScoreBar = ({ score, label }: { score: number; label: string }) => {
  const getScoreColor = (score: number) => {
    if (score < 40) return "bg-red-500";
    if (score < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{score}%</span>
      </div>
      <Progress value={score} className={`h-2 ${getScoreColor(score)}`} />
    </div>
  );
};

const InterviewEvaluation: React.FC<InterviewEvaluationProps> = ({
  evaluation,
  onContinue,
}) => {
  const { scores, answer, correctAnswer, questionInfo } = evaluation;
  
  // Determine if we should show full corrections or just gaps
  const showFullCorrections = scores.overallScore < 50;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Your Answer Evaluation</h3>
      
      {/* Score Overview */}
      <div className="mb-6">
        <ScoreBar score={scores.overallScore} label="Overall Score" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <ScoreBar score={scores.confidenceScore} label="Confidence" />
          <ScoreBar score={scores.technicalScore} label="Technical Knowledge" />
          <ScoreBar score={scores.communicationScore} label="Communication" />
          <ScoreBar
            score={scores.problemSolvingScore}
            label="Problem Solving"
          />
          {questionInfo.domain === "software-development" && (
            <ScoreBar score={scores.codeQualityScore} label="Code Quality" />
          )}
        </div>
      </div>

      {/* Your Answer */}
      <div className="mb-4">
        <h4 className="font-medium mb-2">Your Answer:</h4>
        <div className="bg-white dark:bg-gray-700 p-3 rounded border border-gray-300 dark:border-gray-600">
          {answer}
        </div>
      </div>

      {/* Feedback Section */}
      {showFullCorrections ? (
        <>
          <div className="mb-4">
            <h4 className="font-medium mb-2">Correct Answer:</h4>
            <div className="bg-white dark:bg-gray-700 p-3 rounded border border-gray-300 dark:border-gray-600">
              {correctAnswer}
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-medium mb-2">Areas for Improvement:</h4>
            <ul className="list-disc list-inside space-y-1 bg-white dark:bg-gray-700 p-3 rounded border border-gray-300 dark:border-gray-600">
              {scores.confidenceScore < 70 && (
                <li>
                  <span className="font-medium">Confidence:</span> Try to speak
                  more assertively and avoid uncertain language.
                </li>
              )}
              {scores.technicalScore < 70 && (
                <li>
                  <span className="font-medium">Technical Knowledge:</span> Work
                  on deepening your understanding of key concepts in this domain.
                </li>
              )}
              {scores.communicationScore < 70 && (
                <li>
                  <span className="font-medium">Communication:</span> Focus on
                  clearer explanations with well-structured sentences.
                </li>
              )}
              {scores.problemSolvingScore < 70 && (
                <li>
                  <span className="font-medium">Problem Solving:</span> Practice
                  breaking down problems and explaining your thought process
                  step-by-step.
                </li>
              )}
              {questionInfo.domain === "software-development" &&
                scores.codeQualityScore < 70 && (
                  <li>
                    <span className="font-medium">Code Quality:</span> Focus on
                    principles of clean, maintainable, and well-tested code.
                  </li>
                )}
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <h4 className="font-medium mb-2">What you did well:</h4>
            <div className="bg-white dark:bg-gray-700 p-3 rounded border border-gray-300 dark:border-gray-600">
              Your answer covered many key points! You scored {scores.overallScore}%, which shows a good understanding of the topic.
            </div>
          </div>
          {(scores.technicalScore < 70 || scores.communicationScore < 70 || scores.problemSolvingScore < 70) && (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Areas that could be enhanced:</h4>
              <ul className="list-disc list-inside space-y-1 bg-white dark:bg-gray-700 p-3 rounded border border-gray-300 dark:border-gray-600">
                {scores.technicalScore < 70 && (
                  <li>
                    Consider including more specific technical details or terminology related to this topic.
                  </li>
                )}
                {scores.communicationScore < 70 && (
                  <li>
                    Your explanation could be structured more clearly to help the interviewer follow your thinking.
                  </li>
                )}
                {scores.problemSolvingScore < 70 && (
                  <li>
                    Try to demonstrate your problem-solving approach more explicitly in your answers.
                  </li>
                )}
              </ul>
            </div>
          )}
        </>
      )}

      <div className="mt-6">
        <Button onClick={onContinue} className="w-full">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default InterviewEvaluation; 