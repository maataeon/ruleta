import React from 'react'
import Ruleta from '../Ruleta'

const Daily = () => {
  return (
    <>
      <div id="view">

        <section class="main">

          <div class="aplicacion contain-960">
            <div class="aplicacion-container" id="app">

              <div class="ruleta">
                <div class="ruleta-canvas">
                  <div id="time" class="timer"></div>
                  <canvas id="canvas" width="550" height="550"></canvas>
                </div>
                <div class="material-button boton-verde boton-spin" id="spin">Girar</div>
              </div>

              <div class="palabras">
                <div id="lista-palabras" class="lista">
                  <input name="palabras" type="text" id="inputPalabras" placeholder="Ingresar opcion" autocomplete="off" />
                  <button type="submit" class="material-button agregar" id="botonAgregarPalabras">A</button>
                </div>

                <button class="material-button clear" id="limpiar-opciones">clear</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Daily