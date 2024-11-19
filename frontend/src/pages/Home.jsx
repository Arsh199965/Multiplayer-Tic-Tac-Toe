import React, { useState, useEffect } from "react";

const Home = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [content, setContent] = useState();
  const [isXTurn, setIsXTurn] = useState(true);
  const playerX = "Player 1";
  const playerO = "Player 2";
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000");
      const data = await response.text();
      setContent(data);
      console.log("content here:", data);
    })();
  });
  const handleClick = (index) => {
    if (board[index]) return;
    const updatedBoard = [...board];
    updatedBoard[index] = isXTurn ? "X" : "O";
    setBoard(updatedBoard);
    setIsXTurn(!isXTurn);
  };

  const renderSquare = (index) => (
    <button
      onClick={() => handleClick(index)}
      className="w-20 h-20 border border-gray-400 text-xl font-bold flex items-center justify-center hover:bg-gray-100"
    >
      {board[index]}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="flex justify-between items-center w-1/2 mb-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold">{playerX}</h2>
          <p className="text-sm">{isXTurn ? "Your Turn" : ""}</p>
        </div>
        <h1 className="text-3xl font-bold">Tic Tac Toe</h1>
        <div className="text-center">
          <h2 className="text-lg font-semibold">{playerO}</h2>
          <p className="text-sm">{!isXTurn ? "Your Turn" : ""}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }, (_, index) => (
          <div key={index}>{renderSquare(index)}</div>
        ))}
      </div>
      <div>here is the api content: {content}</div>
    </div>
  );
};

export default Home;
