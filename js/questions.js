// Fetch the questions JSON file
fetch('../test/questions.json')
  .then((response) => {
    // Parse the JSON data
    return response.json();
  })
  .then((questions) => {
    
    const questionsContainer = document.getElementById('questions-container');
    const searchBar = document.getElementById('search-bar');

    // Function to render the filtered questions
    function renderFilteredQuestions() {
      const searchTerm = searchBar.value.toLowerCase();

      //Clear the previous questions
      questionsContainer.innerHTML = '';

      // Filter the questions based on the search term
      const filteredQuestions = questions.filter((question) =>
        question.question.toLowerCase().includes(searchTerm)
      );

      // Render the filtered questions
      filteredQuestions.forEach((question) => {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('question-answer-container');

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.textContent = `${question.question_id}. ${question.question}`;

        containerDiv.appendChild(questionDiv);

        // Check if the question has an image_url field
        if (question.image_url) {
          const image = document.createElement('img');
          image.classList.add('question-image');
          image.src = question.image_url;
          image.alt = `${question.question_id}. jautājuma attēls`;

          containerDiv.appendChild(image);
        }

        // Add a button for showing/hiding answers
        const button = document.createElement('button');
        button.classList.add('btn-toggle');
        button.textContent = '...';
        button.addEventListener('click', () => {
          containerDiv.classList.toggle('show-answer');
        });
        containerDiv.appendChild(button);

        const correctAnswerDiv = document.createElement('div');
        correctAnswerDiv.classList.add('answer', 'correct-answer');
        correctAnswerDiv.textContent = `${question.correct_answer}`;

        containerDiv.appendChild(correctAnswerDiv);

        //Render the incorrect answers
        question.answers
          .filter((answer) => answer !== question.correct_answer)
          .forEach((incorrectAnswer) => {
            const incorrectAnswerDiv = document.createElement('div');
            incorrectAnswerDiv.classList.add('answer', 'incorrect-answer');
            incorrectAnswerDiv.textContent = incorrectAnswer;

            containerDiv.appendChild(incorrectAnswerDiv);
          });

        questionsContainer.appendChild(containerDiv);
      });
    }

    // Initial rendering of questions
    renderFilteredQuestions();

    // Add an input event listener to the search bar

    searchBar.addEventListener('input', renderFilteredQuestions);
  })
  .catch((error) => {
    console.log('Error fetching questions: ', error);

  });