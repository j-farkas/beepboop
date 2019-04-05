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


function Board(){
  this.gameBoard = fillBoard();
  this.mines = 0;
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

//function Board.prototype.drawBoard(){

//}


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

drawGameSpace();
var game = new Board();
game.addMines();
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
