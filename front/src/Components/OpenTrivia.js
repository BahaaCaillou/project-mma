// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const OpenTrivia = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [topScores, setTopScores] = useState([]);
//   const [userName, setUserName] = useState('');

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get('https://opentdb.com/api.php?amount=10&category=21&type=boolean');
//         setQuestions(response.data.results);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   useEffect(() => {
//     const storedScores = JSON.parse(localStorage.getItem('topScores'));
//     if (storedScores) {
//       setTopScores(storedScores);
//     }
//   }, []);

//   const handleAnswer = (answer) => {
//     if (answer === questions[currentQuestion].correct_answer) {
//       setScore(score + 1);
//     }

//     if (currentQuestion + 1 < questions.length) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       if (userName.trim() === '') {
//         alert('Veuillez entrer votre nom d\'utilisateur.');
//         return;
//       }
//       const newTopScores = [...topScores, { name: userName, score: score }];
//       newTopScores.sort((a, b) => b.score - a.score);
//       newTopScores.splice(10);
//       setTopScores(newTopScores);
//       localStorage.setItem('topScores', JSON.stringify(newTopScores));
//       alert(`Votre score final est de ${score} sur ${questions.length}`);
//       // Vous pouvez réinitialiser le questionnaire ici
//     }
//   };

//   return (
//     <div className="open-trivia-container">
//       {questions.length > 0 ? (
//         <div className="quizz-container">
//             <h1>Le Quizz 100% Sport</h1>
//           <h2>Question {currentQuestion + 1}</h2>
//           <input className="open-trivia-input"
//             type="text"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             placeholder="Votre nom d'utilisateur"
//           />
//           <p>{questions[currentQuestion].question}</p>
//           <div>
//             <button className="open-trivia-button1" onClick={() => handleAnswer('True')}>Vrai</button>
//             <button className="open-trivia-button2" onClick={() => handleAnswer('False')}>Faux</button>
//           </div>
//       <h2>Top Scores</h2>
//       <div className="scoreboard-container">
//       <ol className="scoreboard">
//         {topScores.map((s, i) => (
//           <li key={i}>{`${s.name} ‣ ${s.score} points`}</li>
//         ))}
//       </ol>
//       </div>
//         </div>
//       ) : (
//         <p>Chargement en cours...</p>
//       )}

//     </div>
//   );
// };

// export default OpenTrivia;