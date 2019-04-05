function parse(num){
  var arr = [];
  for(var i = 0;i<num;i++)
  {
    var j = i.toString().split('');
    if(j.includes("3"))
    {
      arr.push("I'm sorry, Dave. I'm Afraid I can't do that");
    }else if(j.includes("2")){
      arr.push("Boop");
    }else if(j.includes("1")){
      arr.push("Beep!");
    }else{
      arr.push(j.join(''));
    }
  }
  return arr;
}

var game = new Board();
function Board(){
  this.gameBoard = fillBoard();
  this.mines = 0;
  this.over = false;
  this.left = 100;
}


checkSpace = function(num){
  if(num >=0){
  num = parseInt(num);
    var count = 0;
    //Left, Right, Up, Down
    var aL = num-1;
    var aR = num+1;
    var aU = num-10;
    var aD = num+10;
    var aUL=num-11;
    var aUR=num-9;
    var aDL=num+9;
    var aDR=num+11
    var adjacents = [aL,aR,aU,aD,aUL,aUR,aDL,aDR];
    if(num%10===0){
      //no left
      adjacents = adjacents.filter(function(le){
        if(le === aL || le === aUL || le === aDL ){
          return false;
        }else{
          return true;
        }
      })
    }
    //no right
    if(num%10===9){
      adjacents = adjacents.filter(function(le){
        if(le === aR || le === aDR || le === aUR ){
          return false;
        }else{
          return true;
        }
      })
    }
    //no up
    if(num<10){
      adjacents = adjacents.filter(function(le){
        if(le === aU || le === aUR || le === aUL){
          return false;
        }else{
          return true;
        }
      })
    }
    //no down
    if(num>=90){
      adjacents = adjacents.filter(function(le){
        if(le === aD || le === aDR || le === aDL){
          return false;
        }else{
          return true;
        }
      })
    }
  adjacents.forEach(function(a){
    if(game.gameBoard[a]==='Mine'){
      count++;
    }
  })
  displayNum(num, count);
  game.gameBoard[num] = -1;
console.log(adjacents);
  if(count===0){
    console.log(count);
    adjacents = adjacents.filter(function(a){
      if(game.gameBoard[a] < 0){
        return false;
      }else{
        return true;
      }

    })
    adjacents.forEach(checkSpace);
  }




  }
}

Board.prototype.addMines = function(){
  while(this.mines < 10){
    var r = Math.floor(Math.random() * Math.floor(99));
    if(this.gameBoard[r] != 'Mine'){
      this.gameBoard[r] = 'Mine';
      this.mines += 1;
    }
  }
 }
function fillBoard(){
  var arr = [];
  for(var i = 0;i<100;i++){
    arr.push(i);
  }
  return arr;
}



function displayNum(num, count){
  $('#'+num).removeClass('gray');
  if(count > 0){
    $('#'+num).empty();
    $('#'+num).append("<img src=img/"+count+".png>");
  }
}
$(document).ready(function(){
  function toList(arr){
    arr.forEach(function(ar){
      $(".bbout").append("<li>" + ar +"</li>");

    });

  }
  function drawGameSpace(){
    $(".mines").empty();
    $(".mines").append("<h2 class='text-center'>Minesweeper</h2>");
    for(var i = 0;i<10;i++){
      $(".mines").append("<div class='row text-center "+i+"'>")
      for(var j = 0; j<10;j++){
        $('.row.' +i).append("<div class='col-sm-1'id="+parseInt((10*i)+j)+">")
      }
    }
  }


  Board.prototype.drawBoard = function(){
    drawGameSpace();
     for(var i=0;i<100;i++){
         $('#'+i).addClass("gray");
     }
  }
function attachListeners() {
  $(".container").on( "click", ".col-sm-1", function() {
    if(!$(this).hasClass("flag")){
      if(!game.over){
        if(game.gameBoard[$(this).attr('id')] === 'Mine'){
          game.over = true;
          for(var i=0;i<100;i++){
              if(game.gameBoard[i]==='Mine'){
                $('#'+i).empty();
                $('#'+i).append("<img src=img/bomb.png>");
              }
              $(this).removeClass('gray');
              $(this).addClass('red');
              $('.msman').empty();
              $('.msman').append("<img class='center' src='img/dead.png'>")
          }
          console.log(game);
        }else{
          if(game.gameBoard[$(this).attr('id')] >= 0){
          checkSpace($(this).attr('id'));
          //console.log(space);
          }
        }
    }
  }
});
};

drawGameSpace();
attachListeners();
game.addMines();
game.drawBoard();
console.log(game);


  $("form#bb").submit(function(event){
    $('.bbout').empty();
    var input = $("#num").val();
    input = parse(parseInt(input));
    toList(input);
    event.preventDefault();
    drawGameSpace();
  });
});
