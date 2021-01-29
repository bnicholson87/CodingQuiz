    // global variables
    var playerScore;
    var countdownTimer
    var countdownValue 
    var questionNum
    var initials=document.querySelector('#userName').value;
    var score=0

  var questions=[
  {
      question: "Which actress/singer did Andrew Lloyd Webber write the song 'The Music of the Night' for?",
      answers: ["Patti LuPone", "Sarah Brightman", "Betty Buckley"],
      correct: "Sarah Brightman"
  },
  {
      question: "What was the last song Jonathan Larson wrote for the musical 'Rent'?",
      answers: ["Take Me or Leave Me", "Seasons of Love", "What You Own"],
      correct: "Take Me or Leave Me"
  },
  {
      question: "What character other than Jean Valjean has actor/singer Ramin Karimloo played in 'Les Miserables'?",
      answers: ["Marius", "Grantaire", "Enjolras"],
      correct: "Enjolras"
  },
  {
      question: "What year was the film adaptation of 'Chicago' released?",
      answers: ["2002", "1997", "2006"],
      correct: "2002"
  },
  {
      question: "What was the last musical that Rodgers and Hammerstein worked on together?",
      answers: ["South Pacific", "The Sound of Music", "The King and I"],
      correct: "The Sound of Music"
  }
  ]
  function showNextQuestion(){
      console.log( `showNextQuestion: ${questionNum}` )
      var question = questions[questionNum]
      var questionEl = document.querySelector('#questionBox')
      // display question
      questionEl.innerHTML = `
        <div class="alert alert-warning"><h3>${question.question}</h3>
        `
      // loop through and show each answer as a button
      for( var i=0; i < question.answers.length; i++ ){
        var answer = question.answers[i]
        questionEl.innerHTML += `
        <button onClick="selectAnswer(event,'${answer}')" class="btn btn-secondary btn-block">${answer}</button>
        `
      }
    }
    function selectAnswer( event,answer ){
      event.preventDefault()
      console.log( `question answer id: ${answer}` )
      if( answer===questions[questionNum].correct ){
        console.log( `Great Job!  You know your musicals.` )
      } else {
        console.log( `Too bad` )
        timerDecreaseAndDisplay(10)
      }
      if( answer===questions[questionNum].correct ){
        score=score + 20
      }
      questionNum++
      // decide to show next question (if more), else end quiz
      if( questionNum<questions.length )
        showNextQuestion()
      else
        endQuiz()
    }
    function timerDecreaseAndDisplay( byValue=1 ){
      // decrease by the value passed in, or if nothing, by 1
      countdownValue -= byValue
      document.querySelector('#countdown').textContent = countdownValue
      if( countdownValue<1 )
        endQuiz()
    }
    function showPage( page ){
      // hide all pages
      document.querySelector('#quizPage').classList.add('d-none')
      document.querySelector('#scorePage').classList.add('d-none')
      document.querySelector("#finalPage").classList.add('d-none')
      // show selected page
      document.querySelector(`#${page}`).classList.remove('d-none')
    }
    function endQuiz(event){
      if( event ) event.preventDefault()
      console.log( `Done!` )
      // stop the countdown
      clearInterval( countdownTimer )
      // show score page
      showPage( 'scorePage' )
      document.querySelector( "#playerScore" ).innerHTML="Congratulations!  Your score is "+score + "";
   }
      // display the name capture + leaderboard
      // ...
    // START: 
    // - start timer
    // - show questions
    function startQuiz(event){
      questionNum = 0
      countdownValue = 60
      countdownTimer = setInterval( timerDecreaseAndDisplay, 1000 )
      // switch back to the quizPage
      showPage( 'quizPage' )
      showNextQuestion()
    }

  function saveInfo(event) {
    // prevent default behaviour
    event.preventDefault();
    // get initials from the dom
    var initials = document.getElementById("userName").value;
    // grab the highscore or if not there grab an empty array
    if (initials !== ''){
          var highScore = JSON.parse(localStorage.getItem("Scores")) || [];
          console.log(highScore);
      // set a new object 
          var newObject = {
              score : score,
              initials : initials
          };
          // push the new object to highscore
          highScore.push(newObject);
          // set the item for highscore in the scores for local storage
          localStorage.setItem("Scores", JSON.stringify(highScore));
          // change the location of the website to highscores.html
          window.location.href = "highscores.html";
    }
  
  }
  
  var scoresObject = JSON.parse(localStorage.getItem("Scores"))
  