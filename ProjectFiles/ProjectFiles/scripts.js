(function() {
  
  // Functions
  function buildQuiz(question) {
      // variable to store the HTML output
      const output = [];

      // for each question...
      question.forEach(
          (currentQuestion, questionNumber) => {

              // variable to store the list of possible answers
              const answers = [];

              // and for each available answer...
              for (letter in currentQuestion.answers) {

                  // ...add an HTML radio button
                  answers.push(
                      `<label>
                          <input type="radio" name="question${questionNumber}" value="${letter}"/>
                          ${letter} :
                          ${currentQuestion.answers[letter]}
                      </label>`
                  );
              }

              // add this question and its answers to the output
              output.push(
                  `<div class="slide">
                      <div class="question"> ${currentQuestion.question} </div>
                      <div class="answers"> ${answers.join("")} </div>
                  </div>`
              );
          }
      );

      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
  }

  function showResults(question) {
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');

      // keep track of user's answers
      let numCorrect = 0;

      // for each question...
      question.forEach((currentQuestion, questionNumber) => {

          // find selected answer
          const answerContainer = answerContainers[questionNumber];
          const selector = `input[name=question${questionNumber}]:checked`;
          const userAnswer = (answerContainer.querySelector(selector) || {}).value;

          // if answer is correct
          if (userAnswer === currentQuestion.correctAnswer) {
              // add to the number of correct answers
              numCorrect++;

              // color the answers green
              answerContainers[questionNumber].style.color = 'lightgreen';
          }
          // if answer is wrong or blank
          else {
              // color the answers red
              answerContainers[questionNumber].style.color = 'red';
          }
      });

      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${question.length}`;
  }

  function showSlide(n) {
      const slides = document.querySelectorAll('.slide');  // Redefine slides each time
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if (currentSlide === 0) {
          previousButton.style.display = 'none';
      } else {
          previousButton.style.display = 'inline-block';
      }
      if (currentSlide === slides.length - 1) {
          nextButton.style.display = 'none';
          submitButton.style.display = 'inline-block';
      } else {
          nextButton.style.display = 'inline-block';
          submitButton.style.display = 'none';
      }
  }

  function showNextSlide() {
      showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
      showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const quizButton = document.getElementById('quizzes');
  let changeQuiz = true;

  const OriginalQuestions = [
      {
          question: "Who invented JavaScript?",
          answers: {
              a: "Douglas Crockford",
              b: "Sheryl Sandberg",
              c: "Brendan Eich"
          },
          correctAnswer: "c"
      },
      {
          question: "Which one of these is a JavaScript package manager?",
          answers: {
              a: "Node.js",
              b: "TypeScript",
              c: "npm"
          },
          correctAnswer: "c"
      },
      {
          question: "Which tool can you use to ensure code quality?",
          answers: {
              a: "Angular",
              b: "jQuery",
              c: "RequireJS",
              d: "ESLint"
          },
          correctAnswer: "d"
      }
  ];

  const musicQuiz = [
      {
          question: "Who is known as the King of Pop?",
          answers: {
              a: "Elvis Presley",
              b: "Michael Jackson",
              c: "Prince",
              d: "James Brown"
          },
          correctAnswer: "b"
      },
      {
          question: "Which band released the album 'Abbey Road'?",
          answers: {
              a: "The Beatles",
              b: "The Rolling Stones",
              c: "Led Zeppelin",
              d: "Pink Floyd"
          },
          correctAnswer: "a"
      },
      {
          question: "Which genre of music is Taylor Swift primarily known for?",
          answers: {
              a: "Pop",
              b: "Country",
              c: "Rock",
              d: "Hip-hop"
          },
          correctAnswer: "b"
      },
      {
          question: "What year did the music festival Woodstock take place?",
          answers: {
              a: "1965",
              b: "1967",
              c: "1969",
              d: "1971"
          },
          correctAnswer: "c"
      },
      {
          question: "Which classical composer wrote 'The Four Seasons'?",
          answers: {
              a: "Ludwig van Beethoven",
              b: "Johann Sebastian Bach",
              c: "Antonio Vivaldi",
              d: "Wolfgang Amadeus Mozart"
          },
          correctAnswer: "c"
      },
      {
          question: "Which song was a major hit for Adele in 2011?",
          answers: {
              a: "Someone Like You",
              b: "Rolling in the Deep",
              c: "Hello",
              d: "Set Fire to the Rain"
          },
          correctAnswer: "b"
      }
  ];

  // Kick things off by displaying the original quiz
  buildQuiz(OriginalQuestions);

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', () => showResults(OriginalQuestions));
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);

  // Toggle between quizzes
  quizButton.addEventListener('click', function () {
      if (changeQuiz === true){
        buildQuiz(musicQuiz);
        changeQuiz = false;
      }else if(changeQuiz === false) {
        buildQuiz(OriginalQuestions);
        changeQuiz = true;

      }
      // Re-select all slides (after rebuilding quiz)
      const slides = document.querySelectorAll(".slide");

      // Reset slide to the first question
      currentSlide = 0;
      showSlide(currentSlide);
  });
})();
