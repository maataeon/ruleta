import { Box, Button, Container } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Canvas from '../Canvas/Canvas';

const defaultConfig = {
  width: 550,
  height: 550,
  outsideRadius: 230,
  textRadius: 180,
  insideRadius: 70,
  hw: 0,
  hh: 0
};
const options = [
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
const pastelColors = [
  "#cc99c9",
  "#9ec1cf",
  "#9ee09e",
  "#fdfd97",
  "#feb144",
  "#ff6663"
];
const randomColorOffset = parseInt(Math.random() * 147);

const arc = Math.PI / (options.length / 2);
const Roulette = () => {

  const [config, setConfig] = useState({ ...defaultConfig });
  const [ctx, setCtx] = useState(document.createElement('canvas').getContext('2d'));

  const [spinAngleStart, setSpinAngleStart] = useState(0);
  const [spinTime, setSpinTime] = useState(0);
  const [spinTimeTotal, setSpinTimeTotal] = useState(0);
  const [startAngle, setStartAngle] = useState(0);

  const setup = (_ctx) => {
    setCtx(_ctx);
  };

  const draw = (frameCount) => {
    rulette(frameCount);

    //rotateWheel();
  };

  const getColor = (index) => {
    return pastelColors[(randomColorOffset + index) % pastelColors.length];
  };

  const rulette = (frameCount) => {

    const spinAngle =
    spinAngleStart - easeOut(frameCount, 0, spinAngleStart, spinTimeTotal);
    let arc = Math.PI / (options.length / 2);
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.clearRect(0, 40, config.width, config.height);
    ctx.save();
    ctx.translate(config.hw, config.hh);


    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;

    ctx.font = "13px Helvetica, Arial";

    for (let i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;
      ctx.fillStyle = getColor(i);
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 1;
      ctx.globalCompositeOperation = "multiply";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.arc(0, 0, config.outsideRadius, angle, angle + arc, false);
      ctx.arc(0, 0, config.insideRadius, angle + arc, angle, true);
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
        0 + Math.cos(angle + arc / 2) * config.textRadius,
        0 + Math.sin(angle + arc / 2) * config.textRadius
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
    ctx.moveTo(0 - 4, 0 - (config.outsideRadius + 10));
    ctx.lineTo(0 + 4, 0 - (config.outsideRadius + 10));
    ctx.lineTo(0 + 4, 0 - (config.outsideRadius - 10));
    ctx.lineTo(0 + 9, 0 - (config.outsideRadius - 10));
    ctx.lineTo(0 + 0, 0 - (config.outsideRadius - 18));
    ctx.lineTo(0 - 9, 0 - (config.outsideRadius - 10));
    ctx.lineTo(0 - 4, 0 - (config.outsideRadius - 10));
    ctx.lineTo(0 - 4, 0 - (config.outsideRadius + 10));
    ctx.fill();
    ctx.restore();
  };

  const stopRotateWheel = () => {
    //spinSound.pause();
    //spinSound.currentTime = 0;
    let degrees = (startAngle * 180) / Math.PI + 90;
    let arcd = (arc * 180) / Math.PI;
    let index = Math.floor((360 - (degrees % 360)) / arcd);
    //this.setNombreSeleccionado(options[index]);
    ctx.save();
    let text = options[index];
    ctx.translate(config.hw, config.hh);
    /*ctx.beginPath();
        ctx.arc(0, 0, 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#fff';
        ctx.fill();*/
    ctx.fillStyle = "#222";
    ctx.font = "bold 24px Arial";
    ctx.fillText(text, 0 - ctx.measureText(text).width / 2, 0 + 10);
    ctx.fillStyle = "#eee";
    ctx.restore();
    /*if (options.length == 1) {
      //lastName.play();
    }
    if (options.length > 1) {
      //wink.play();
      setTimeout(function () {
        nameElement = [].slice
          .call(listaPalabras.children)
          .filter((li) => li.innerText.toUpperCase().includes(options[index]))[0];
        console.log(nameElement, options[index]);
        borrarPalabra(nameElement);
      }, 750);
    }*/
  };

  const easeOut = (t, b, c, d) => {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  };


  const spin = () => {
    setSpinAngleStart(Math.random() * (Math.PI * 2) + Math.PI * 4);
    setSpinTime(spinTime + 30);
    setSpinTimeTotal(Math.abs(Math.random() * 2000) + 5000);
    setStartAngle(startAngle + (Math.random() *100 * Math.PI) / 180);
  };

  useEffect(() => {
    setConfig({
      ...config,
      hw: config.width / 2,
      hh: config.height / 2
    });
  }, []);

  return (
    <Container>
      <Box>
        <Canvas
          draw={draw}
          setup={setup}
          width={550}
          height={550} />
      </Box>
      <Box>
        <Button onClick={spin}>Spin</Button>
      </Box>
    </Container>
  );
};

export default Roulette;