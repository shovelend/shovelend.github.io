var firebaseCanvas = document.getElementById("firebase");
var firebaseCtx = firebaseCanvas.getContext("2d");
var firebaseParticles = [];

function drawFirebaseScene() {
  firebaseCanvas.width = firebasePng.width*2;
  firebaseCanvas.height = firebasePng.height*2;

  firebaseCtx.drawImage(firebasePng, 0, 0);

  var data = firebaseCtx.getImageData(0, 0, firebasePng.width, firebasePng.height);
  firebaseCtx.clearRect(0, 0, firebaseCanvas.width, firebaseCanvas.height);
  
  for (var y = 0, y2 = data.height; y < y2; y+=2) {
    for (var x = 0, x2 = data.width; x < x2; x+=2) {
        var particle = {
          x0: x,
          y0: y,
          x1: firebasePng.width / 2,
          y1: firebasePng.height / 2,
          color: "rgb("+data.data[(y * 4 * data.width)+ (x * 4)]+","+data.data[(y * 4 * data.width)+ (x * 4) +1]+","+data.data[(y * 4 * data.width)+ (x * 4) +2]+")",
          speed: Math.random() * 4 + 2
        };
        TweenMax.to(particle, particle.speed, {
          x1: particle.x0,
          y1: particle.y0,
          delay: y / 42,
          ease: Elastic.easeOut
        });
        firebaseParticles.push(particle);
      }
  }

  requestAnimationFrame(renderFirebase);
}
var renderFirebase = function() {
  requestAnimationFrame(renderFirebase);

  firebaseCtx.clearRect(0, 0, firebaseCanvas.width, firebaseCanvas.height);
  for (var i = 0, j = firebaseParticles.length; i < j; i++) {
    var particle = firebaseParticles[i];
    firebaseCtx.fillStyle = particle.color;
    firebaseCtx.fillRect(particle.x1*2, particle.y1*2 , 2,2);
  }

};

var firebasePng = new Image();
firebasePng.onload = drawFirebaseScene;
firebasePng.src =  `../images/${firebaseCanvas.id}.png`