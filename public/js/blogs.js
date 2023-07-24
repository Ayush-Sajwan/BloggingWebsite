const likeButtonStatusUpdate = async function () {
    const url = window.location.href + "/status";
    const resp = await fetch(url);
    const data = await resp.json();

    const likedBlogsArray = data.blogs_liked;

    let likeButton = document.getElementsByClassName("likeButtons");

    for (i = 0; i < likeButton.length; i++) {
      if (likedBlogsArray.includes(likeButton[i].getAttribute("value"))) {
        likeButton[i].classList.toggle("liked");
      }
    }
  };

  likeButtonStatusUpdate();

  //this function is responsilbe for updating the like counter
  //with a given id
  var updateLikeCounter = function (id, likes) {
    document.getElementById(id).innerHTML = likes;
  };

  //this function sends a request to server to increment the likes of blog
  var likeFunction = async function () {
    this.classList.toggle("liked");
    //getting value attribute of button
    const id = this.getAttribute("value");
    //generating the url
    const url = window.location.href + `/like/${id}`;

    //making a fetch request
    const resp = await fetch(url);
    const data = await resp.json();
    const sid = String(id);
    updateLikeCounter(sid, data.likes);
  };

  var likeButton = document.getElementsByClassName("likeButtons");
  for (var i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener("click", likeFunction);
  }