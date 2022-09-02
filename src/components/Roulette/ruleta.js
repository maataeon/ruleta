const inputPalabras = document.getElementById("inputPalabras");
const botonAgregarPalabras = document.getElementById("botonAgregarPalabras");
const listaPalabras = document.getElementById("lista-palabras");
const nombreSeleccionado = document.getElementById("nombre-seleccionado");
const wink = document.getElementById("wink");
const spinSound = document.getElementById("spin-sound");
const whoosh = document.getElementById("whoosh");
const lastName = document.getElementById("last-name");
const tic = document.getElementById("tic");
const time = document.getElementById("time");
var options = [];
const botonLimpiarOpciones = document.getElementById("limpiar-opciones");
const alerta = document.getElementById("alerta");
const canvas = document.getElementById("canvas");
const randomColorOffset = parseInt(Math.random() * 147);

inputPalabras.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    botonAgregarPalabras.click();
  }
});

const renderTime = () => {
  var date = new Date();

  var seconds = ('0' + date.getSeconds()).slice(-2);;
  var minutes = ('0' + date.getMinutes()).slice(-2);;
  var hour = ('0' + date.getHours()).slice(-2);;
  time.innerText = `${hour}:${minutes}:${seconds}`;
  requestAnimationFrame(renderTime)
}
renderTime();


const randomPastelColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};
const pastelColors = [
  "#cc99c9",
  "#9ec1cf",
  "#9ee09e",
  "#fdfd97",
  "#feb144",
  "#ff6663"
];

const nombres = [
  "Juli",
  "Mati-S",
  "Dami",
  "Eze",
  "Cacho",
  "Maat",
  "Jose",
  "Gabi",
  "Mauricio",
  "Martin-F",
  "Carlos",
  "Augusto",
  "Martin-R",
  "Alan",
  "Eva",
  "Agustin-J",
  "Emi",
  "Gabriela",
  "Lucas",
  "Cele",
  "Mati-M",
  "Agus-B",
  "Julieta-M"
];

var centerX, centerY, outsideRadius, textRadius, insideRadius;
window.onload = function () {
  ctx = canvas.getContext("2d");
  outsideRadius = 230;
  textRadius = 180;
  insideRadius = 70;
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
  console.log(centerX, centerY);

  nombres.forEach((nombre) => {
    agregarPalabra(nombre);
  });

  dibujarRuleta();
  wink.volume = 0.2;
  spinSound.volume = 0.09;
  whoosh.volume = 0.001;
  lastName.volume = 0.03;
  tic.volume = 0.25;
};

function prevenirForm(e) {
  e.preventDefault();
}

// LIMPIAR OPCIONES
botonLimpiarOpciones.addEventListener("click", function () {
  lastName.play();
  if (window.confirm("¿Borrar todas las opciones?")) {
    listaPalabras.innerHTML = "";
    options = [];
    dibujarRuleta();
    botonLimpiarOpciones.style.display = "none";
  }
});

function agregarPalabra(valor) {
  options.push(valor.toUpperCase().replace(/\s/g, ""));
  var li = document.createElement("div");
  li.className = "nombre"
  li.innerHTML = valor;
  var close = document.createElement("div");
  close.className = "close"
  close.innerHTML = "X";
  close.onclick = function () {
    borrarPalabra(li);
  };
  li.appendChild(close);
  listaPalabras.appendChild(li);
  botonLimpiarOpciones.style.display = "block";
}

function borrarPalabra(li) {
  var indexText = li.innerText.toUpperCase().replace(/\s/g, "");
  var index = options.indexOf(indexText.slice(0, -1));
  if (index > -1) {
    options.splice(index, 1);
  }
  listaPalabras.removeChild(li);
  whoosh.pause();
  whoosh.currentTime = 0;
  whoosh.play();
  //dibujarRuleta();
}

//Click AGREGAR PALABRAS
botonAgregarPalabras.addEventListener("click", function () {
  if (inputPalabras.value != "" && options.length < 60) {
    agregarPalabra(inputPalabras.value);
    inputPalabras.value = "";
    alerta.style.display = "none";
  }
  if (options.length >= 35) {
    alerta.innerHTML = "Ya agregaste demasiadas palabras.";
    alerta.style.display = "block";
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }
});

var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

document.getElementById("spin").addEventListener("click", spin);

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return (
    String(nybHexString.substr((n >> 4) & 0x0f, 1)) +
    nybHexString.substr(n & 0x0f, 1)
  );
}

function RGB2Color(r, g, b) {
  return "#" + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

const getColor = (index, maxItem) => {
  return pastelColors[(randomColorOffset + index) % pastelColors.length];
};
/* default get color
function getColor(item, maxitem) {
  var phase = 0;
  var center = 128;
  var width = 107;
  var frequency = (Math.PI * 2) / maxitem;
  console.log(item);
  red = Math.sin(frequency * item + 2 + phase) * width + center;
  green = Math.sin(frequency * item + 0 + phase) * width + center;
  blue = Math.sin(frequency * item + 4 + phase) * width + center;

  return RGB2Color(red, green, blue);
}*/

function dibujarRuleta() {
  printIterationData();

  arc = Math.PI / (options.length / 2);
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.clearRect(0, 40, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(centerX, centerY);

  /*ctx.beginPath();
      ctx.arc(0, 0, 5, 0, 2 * Math.PI, false);
      ctx.fillStyle = '#555';
      ctx.fill();
  */
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;

  ctx.font = "13px Helvetica, Arial";

  for (var i = 0; i < options.length; i++) {
    var angle = startAngle + i * arc;
    ctx.fillStyle = getColor(i, options.length);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    ctx.globalCompositeOperation = "multiply";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.arc(0, 0, outsideRadius, angle, angle + arc, false);
    ctx.arc(0, 0, insideRadius, angle + arc, angle, true);
    ctx.stroke();
    ctx.fill();

    ctx.save();
    ctx.shadowOffsetX = -1;
    ctx.shadowOffsetY = -1;
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#222";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.translate(
      0 + Math.cos(angle + arc / 2) * textRadius,
      0 + Math.sin(angle + arc / 2) * textRadius
    );
    ctx.rotate(angle + arc / 2 + Math.PI);

    ctx.globalCompositeOperation = "source-over";
    ctx.font = "bold 1rem Arial";
    var text = options[i];

    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  }

  ctx.fillStyle = "#363636";
  ctx.beginPath();
  ctx.moveTo(0 - 4, 0 - (outsideRadius + 10));
  ctx.lineTo(0 + 4, 0 - (outsideRadius + 10));
  ctx.lineTo(0 + 4, 0 - (outsideRadius - 10));
  ctx.lineTo(0 + 9, 0 - (outsideRadius - 10));
  ctx.lineTo(0 + 0, 0 - (outsideRadius - 18));
  ctx.lineTo(0 - 9, 0 - (outsideRadius - 10));
  ctx.lineTo(0 - 4, 0 - (outsideRadius - 10));
  ctx.lineTo(0 - 4, 0 - (outsideRadius + 10));
  ctx.fill();
  ctx.restore();
}

function spin() {
  if (spinTime >= spinTimeTotal) {
    spinSound.currentTime = 0;
    spinSound.play();
    if (options.length < 1) {
      alerta.style.display = "block";
      alerta.innerText = "Debe haber al menos 2 opciones";
    } else {
      spinAngleStart = Math.random() * (Math.PI * 2) + Math.PI * 4;
      spinTime = 0;
      spinTimeTotal = Math.abs(Math.random() * 2000) + 5000;
      // console.log(spinAngleStart, spinTimeTotal);
      rotateWheel();
    }
  }
}

function rotateWheel() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle =
    spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI) / 180;
  dibujarRuleta();
  requestAnimationFrame(rotateWheel);
}

function stopRotateWheel() {
  spinSound.pause();
  spinSound.currentTime = 0;
  var degrees = (startAngle * 180) / Math.PI + 90;
  var arcd = (arc * 180) / Math.PI;
  var index = Math.floor((360 - (degrees % 360)) / arcd);
  this.setNombreSeleccionado(options[index]);
  ctx.save();
  var text = options[index];
  ctx.translate(centerX, centerY);
  /*ctx.beginPath();
      ctx.arc(0, 0, 10, 0, 2 * Math.PI, false);
      ctx.fillStyle = '#fff';
      ctx.fill();*/
  ctx.fillStyle = "#222";
  ctx.font = "bold 24px Arial";
  ctx.fillText(text, 0 - ctx.measureText(text).width / 2, 0 + 10);
  ctx.fillStyle = "#eee";
  ctx.restore();
  if (options.length == 1) {
    lastName.play();
  }
  if (options.length > 1) {
    wink.play();
    setTimeout(function () {
      nameElement = [].slice
        .call(listaPalabras.children)
        .filter((li) => li.innerText.toUpperCase().includes(options[index]))[0];
      console.log(nameElement, options[index]);
      borrarPalabra(nameElement);
    }, 750);
  }
}

function easeOut(t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

// EVENTO AL PRESIONAR BARRAR ESPACIADORA
window.addEventListener("keydown", function (e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
    spin();
  }
});

function setNombreSeleccionado(name) {
  nombreSeleccionado.innerText = name;
}

const position = {
  degrees: 0,
  arcd: 0,
  index: 0,
  name: 0
};
const printIterationData = function () {
  position.degrees = (startAngle * 180) / Math.PI + 90;
  position.arcd = (arc * 180) / Math.PI;
  let newIndex = Math.floor((360 - (position.degrees % 360)) / position.arcd);
  if (newIndex !== position.index) {
    position.index = newIndex;
    position.name = options[position.index];
    //console.log(position);
    /* performance issues, how can i reduce latency?
       -> find exact init time*/
    tic.currentTime = 0.230;
    if(tic.paused){
      tic.play()
    }
  }
};

/* STARS*/
var stars = document.querySelector("#stars");
for (let i = 0; i < Math.abs( Math.random() * 14 + 35); i++) {
  stars.appendChild(
    (() => {
      let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      let radius = Math.random() * 11 + 11;
      svg.setAttribute("class", "star");
      svg.setAttribute("viewBox", "0 0 240 240");
      svg.style.width = radius + "px";
      svg.style.height = radius + "px";
      svg.style.transform = "rotate(" + ((Math.random() * 100) | 0) + "deg)";
      svg.style.left = ((Math.random() * 100) | 0) - 3 + "vw";
      svg.style.top = ((Math.random() * 100) | 0) - 3 + "vh";
      svg.style.opacity = Math.random() * 0.514 + 0.157;
      let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      //svg.setAttribute("transform", "rotate(120, 120 "+((Math.random() * 360) | 0)+")");
      path.setAttribute("d", "m48,234 73-226 73,226-192-140h238z");
      path.setAttribute("fill", "#F8D64E");
      svg.appendChild(path);
      return svg;
    })()
  );
}
window.onmouseup = function () {
  document.querySelectorAll(".seccion").forEach(function (seccion) {
    seccion.classList.remove("buttonDown");
  });
};

document.querySelectorAll(".seccion").forEach(function (seccion) {
  seccion.onmousedown = function () {
    this.classList.add("buttonDown");
  };
});
