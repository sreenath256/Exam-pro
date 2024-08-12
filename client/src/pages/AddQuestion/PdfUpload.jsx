import React, { useState } from "react";

function PdfUpload({ setFile, setIsFileUpload ,setAnswers}) {
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [questionCount, setQuestionCount] = useState(3);

  const handleFileUpload = (event) => {
    let selectedPdf = event.target.files[0];
    if (selectedPdf && selectedPdf.type === "application/pdf") {
      setPdfFile(selectedPdf);
    } else {
      alert("Please select a PDF file.");
      event.target.value = null;
    }
  };

  const handleOptionChange = (questionIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = option;
    setSelectedOptions(updatedOptions);
  };

  const handleSubmit = () => {
    // Check if all questions have a selected option
    if (
      selectedOptions.length !== questionCount ||
      selectedOptions.includes(undefined)
    ) {
      alert("Please select an option for all questions before submitting.");
      return;
    }
    if (!pdfFile) {
      alert("Please select file.");

      return;
    }
    setIsFileUpload(false);
    setFile(pdfFile);
    setAnswers(selectedOptions)

    // Log the selected file and selected options
    console.log("PDF File:", pdfFile);
    console.log("Selected Options:", selectedOptions);

    // Perform further actions (e.g., send data to the backend)
  };

  const handleQuestionCountChange = (event) => {
    setQuestionCount(parseInt(event.target.value));
    setSelectedOptions([]);
  };

  return (
    <div className="w-full p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-end mb-4">
        <select
          value={questionCount}
          onChange={handleQuestionCountChange}
          className="p-2 border rounded"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num} Question{num !== 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2 bg-white p-4 rounded shadow">
          <input
            type="file"
            onChange={handleFileUpload}
            accept="application/pdf"
            className="mb-4"
          />
          {pdfFile && (
            <embed
              src={URL.createObjectURL(pdfFile)}
              type="application/pdf"
              width="100%"
              height="600px"
            />
          )}
        </div>
        <div className="w-1/2 bg-white p-4 rounded shadow overflow-scroll max-h-screen">
          <form>
            {[...Array(questionCount)].map((_, index) => (
              <div key={index} className="mb-6">
                <p className="font-bold mb-2">Question {index + 1}</p>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={() => handleOptionChange(index, option)}
                        className="form-radio"
                      />
                      <span>Option {option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </form>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PdfUpload;
