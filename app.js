var channels = ["hsuku", "megam0gwai", "octaneblue", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var BASE_URL = 'https://api.twitch.tv/kraken/streams/'
var $ul = $('ul');

channels.forEach(function(channel){
  getChannel(channel);
});

function getChannel(user) {
  $.getJSON(BASE_URL + user, function(response){
    if(response.stream === null){
      $.getJSON(response._links.channel, function(res){
        var obj = {
          logo: res.logo,
          name: res.name,
          status: '',
          url: res.url
        }
        displayList(obj, 'offline');
      })
    } else {
      displayList(response.stream.channel,'live');
    }
  })
}

function displayList(obj,status){
  var $li =           $('<li/>');
  var $listWrapper =  $('<div/>').addClass('list-wrapper').appendTo($li);
  var $details =      $('<div/>').addClass('details').appendTo($listWrapper);
  var $image =        $('<div/>').addClass('image').appendTo($details);
  var $img =          $('<img/>').attr("src", obj.logo).appendTo($image);
  var $detail =       $('<div/>').addClass('detail').html('<a href="' + obj.url + '" target="_blank"><h4>' + obj.name + '</h4></a>' + '<div class ="status ' + status + '"></div>' + '<p>' + status + '</p>').appendTo($details);
  var $p =            $('<p/>').html(obj.status).appendTo($listWrapper);
  $li.appendTo($ul);
}
