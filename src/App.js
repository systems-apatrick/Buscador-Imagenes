import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import dotenv from "dotenv";
import axios from "axios";
import ListadoImagenes from "./components/ListadoImagenes";
dotenv.config();

function App() {
  // state de la app
  const [busqueda, guardarBusqueda] = useState("");
  const [imagenes, guardarImagenes] = useState([]);
  const [numDatosConsulta, guardarNumDatosConsulta] = useState(1);

  // state para paginador
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPagina, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    if (busqueda === "") return;

    const consultarAPI = async () => {
      const imagenPagina = 30;
      const key = process.env.REACT_APP_API_KEY_PIXABAY;
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&image_type=photo&per_page=${imagenPagina}&page=${paginaActual}`;
      const respuesta = await axios(url);
      guardarImagenes(respuesta.data.hits);
      guardarNumDatosConsulta(respuesta.data.totalHits);
      // calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(
        respuesta.data.totalHits / imagenPagina
      );
      guardarTotalPaginas(
        calcularTotalPaginas === 0 ? 1 : calcularTotalPaginas
      );

      // mover la scroll al inicio despues de dar click en boton
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });
    };
    consultarAPI();
  }, [busqueda, paginaActual]);

  // definir la pagina anterior

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if (nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  };

  // definir la pagina siguiente

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    if (nuevaPaginaActual > totalPagina) return;
    guardarPaginaActual(nuevaPaginaActual);
  };
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center"> Buscador de Imágenes</p>

        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
          numDatosConsulta={numDatosConsulta}
        />
        {paginaActual === 1 ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
          >
            &laquo; Anterior
          </button>
        )}

        {paginaActual === totalPagina ? null : (
          <button
            type="button"
            className="btn btn-info"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
