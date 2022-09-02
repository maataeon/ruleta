import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Canvas = props => {

  const { setup, draw, width, height, ...rest} = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      draw(frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };

    if (setup) {
      setup(context);
    }

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [setup, draw]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      {...rest}
      />
  );
};

Canvas.propTypes = {
  setup: PropTypes.func,
  draw: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Canvas;