$(document).ready(function(){
  
  // event listeners
  $("#remaining-time").hide();
  $("#start").on('click', quiz.start);
  $(document).on('click' , '.option', quiz.checkAnswer);
  
})

var quiz = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId : '',
  questions: {
    q1: 'Who is the best dog in the entire world?',
    q2: 'Who is the best cat in the United States?',
    q3: 'How much wood could a woodchuck chuck if a woodchuck could chuck wood?',
    q4: 'Who interferred in the 2016 election?',
    q5: 'Which of the following languages does Maryus not speak?',
    q6: 'Which of these is not a real coding language?',
    q7: 'Which of the following is not a state?',
    q8: 'Which of the following is not a server component?',
    q9: 'What is the best way to drink coffee?',
    q10: 'What is the airspeed velocity of an unladen sparrow?',

  },

  choices: {
    q1: ['Toni', "Maryus' dog", 'Balto', 'All dogs are equally great'],
    q2: ['A small kitten', 'Dogs are the best cats', 'Grumpy cat', "Cat's aren't that great"],
    q3: ['What?', '7', 'Woodchucks dont chuck wood', 'A forest worth'],
    q4: ['Hackers', 'Maryus', 'Maryus wearing a hat and a mustache', 'A dog in a hat'],
    q5: ['Russian', 'English', 'Lithuanian', 'The colors of the wind'],
    q6: ['Java', 'Python', 'Rust', 'Schwifty'],
    q7: ['Of mind', 'Gas', 'Matter', 'Liquid'],
    q8: ['RAID controller', 'NIC card', 'NVMe Card', 'Toaster' ],
    q9: ['Cream and sugar', 'Black', 'However you want it really', 'Tea'],
    q10: ['What?', 'I dont know', '37mph', '11 meters per second']

  },

  answers: {
    q1: 'Toni',
    q2: 'Dogs are the best cats',
    q3: '7',
    q4: 'A dog in a hat',
    q5: 'The colors of the wind',
    q6: 'Schwifty',
    q7: 'Of mind',
    q8: 'Toaster',
    q9: 'However you want it really',
    q10: '11 meters per second'
  },
  
  start: function(){
    
    quiz.currentSet = 0;
    quiz.correct = 0;
    quiz.incorrect = 0;
    quiz.unanswered = 0;
    clearInterval(quiz.timerId);
    $('#game').show();
    $('#results').html('');
    $('#timer').text(quiz.timer);
    $('#start').hide();
    

    $('#remaining-time').show();
    quiz.nextQuestion();
    
  },
  nextQuestion : function(){
    quiz.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(quiz.timer);
    if(!quiz.timerOn){
      quiz.timerId = setInterval(quiz.timerRunning, 1000);
    }
    var questionContent = Object.values(quiz.questions)[quiz.currentSet];
    $('#question').text(questionContent);
    var questionchoices = Object.values(quiz.choices)[quiz.currentSet]; 
    $.each(questionchoices, function(index, key){
      $('#choices').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
  
  timerRunning : function(){
    if(quiz.timer > -1 && quiz.currentSet < Object.keys(quiz.questions).length){
      $('#timer').text(quiz.timer);
      quiz.timer--;
        if(quiz.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    else if(quiz.timer === -1){
      quiz.unanswered++;
      quiz.result = false;
      clearInterval(quiz.timerId);
      resultId = setTimeout(quiz.getResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(quiz.answers)[quiz.currentSet] +'</h3>');
    }
    else if(quiz.currentSet === Object.keys(quiz.questions).length){
      
      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ quiz.correct +'</p>'+
        '<p>Incorrect: '+ quiz.incorrect +'</p>'+
        '<p>Unaswered: '+ quiz.unanswered +'</p>'+
        '<p>Please play again!</p>');
      $('#game').hide();
      $('#start').show();
    }
    
  },
  checkAnswer : function() {
    var resultId;
    var currentAnswer = Object.values(quiz.answers)[quiz.currentSet];
    
   
    if($(this).text() === currentAnswer){ 
      $(this).addClass('btn-success').removeClass('btn-info');
      
      quiz.correct++;
      clearInterval(quiz.timerId);
      resultId = setTimeout(quiz.getResult, 1000);
      $('#results').html('<h3>Correct!</h3>');
    }
    else{
      $(this).addClass('btn-danger').removeClass('btn-info');
      quiz.incorrect++;
      clearInterval(quiz.timerId);
      resultId = setTimeout(quiz.getResult, 1000);
      $('#results').html('<h3>Incorrect, the answer was: '+ currentAnswer +'</h3>');
    }
    
  },
  
  getResult : function(){
    
    
    quiz.currentSet++;
    $('.option').remove();
    $('#results h3').remove();
    quiz.nextQuestion();
     
  }

}