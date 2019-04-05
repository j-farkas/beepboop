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
  this.over = false;
}

//D = down U = up L = left r = Right
function cD(num){return num+10;}
function cU(num){return num-10;}
function cR(num){return num+1;}
function cL(num){return num-1;}
function cDR(num){return num+11;}
function cDL(num){return num +9;}
function cUR(num){return num-9;}
function cUL(num){return num-11;}

Board.prototype.checkSpace = function(num){
  var count = 0;
  var adjacents = ['l','r','u','d','ur','ul','dr','dl'];
  if(num%10===0){
    adjacents.filter(function(le){
      if(le === 'l' || le === 'ul' || le === 'dl' ){
        return false
      }else{
        return true;
      }
    })
  }
  if(num%10===9){
    adjacents.filter(function(le){
      if(le === 'r' || le === 'dr' || le === 'ur' ){
        return false
      }else{
        return true;
      }
    })
  }
  if(num<10){
    adjacents.filter(function(le){
      if(le === 'u' || le === 'ur' || le === 'ul'){
        return false
      }else{
        return true;
      }
    })
  }
  if(num>=90){
    adjacents.filter(function(le){
      if(le === 'd' || le === 'dr' || le === 'dl'){
        return false
      }else{
        return true;
      }
    })
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
      if(this.gameBoard[i] === 'Mine'){
        $('#'+i).append("<p>Mine</p>");
      }
    }
  }
function attachListeners() {
  $(".container").on( "click", ".col-sm-1", function() {
    if(!game.over){
      if(game.gameBoard[$(this).attr('id')] === 'Mine'){
        game.over = true;
        console.log(game);
      }else{
        game.checkSpace($(this).attr('id'));
      }
    }
  });
};

drawGameSpace();
attachListeners();
var game = new Board();
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
