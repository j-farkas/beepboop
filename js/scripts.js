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
}


function fillBoard(){
  var arr = [];
  for(var i = 0;i<100;i++){
    arr.push[i];
  }
  return arr;
}

/*function Board.prototype.drawBoard(){

}*/


$(document).ready(function(){
  function toList(arr){
    arr.forEach(function(ar){
      $(".bbout").append("<li>" + ar +"</li>");

      function drawGameSpace(){
        //$(".ms").empty();
        $(".ms").append("<p>hello</p>");
        //for(var i = 0;i<10;i++){
        //  $("#ms").append<div class="row text-center">
      //  }
      }

$('.mines').empty();
    });

  }
  $("form#bb").submit(function(event){
    $('.bbout').empty();
    var input = $("#num").val();
    input = parse(parseInt(input));
    toList(input);
    event.preventDefault();
    drawGameSpace();
    //$(".ms").append("<p>hello</p>");
  });
});
