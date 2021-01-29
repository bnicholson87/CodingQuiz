console.log("here");
console.log(scoresObject);

// printHighScores get the object from logic.js
// object is set to Scores from local storage
function printHighScores( scoreList ){
    var scoreEl = document.querySelector('.scores')
    scoreEl.innerHTML = ''
    for( var i=0; i<scoreList.length; i++ ){
        scoreEl.innerHTML += `<li>Initials: ${scoreList[i].initials} Score: ${scoreList[i].score}</li>`
    }
}

printHighScores(scoresObject);