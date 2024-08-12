import React, { useState } from 'react';

const  AddQuestionPage = ({setIsQuestionOpen,setQuestions}) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [marks, setMarks] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...options];
    newAnswers[index] = value;
    setOptions(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      question,
      options,
      correctAnswer:options[correctAnswer],
      marks,
      isFinished
    });

    setQuestions((prevQuestion)=>[
        ...prevQuestion,
        {question,options,correctAnswer:options[correctAnswer],marks}
    ])


    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setMarks(1);
    setIsFinished(false);
  };
  

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Add Question</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Question:</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="3"
            required
          />
        </div>

        {options.map((answer, index) => (
          <div key={index}>
            <label className="block mb-1 font-semibold">Option {index + 1}:</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        ))}

        <div>
          <label className="block mb-1 font-semibold">Correct Answer:</label>
          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select correct answer</option>
            {options.map((_, index) => (
              <option key={index} value={index}>
                Option {index + 1}
              </option>
            ))}
          </select>
        </div>

       

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isFinished}
            onChange={(e) => setIsFinished(e.target.checked)}
            className="mr-2"
          />
          <label>Finished adding questions</label>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
          {isFinished && (
            <button
              type="button"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setIsQuestionOpen(false)

              }}
            >
              Finish
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddQuestionPage;