import Imagen from "./Imagen";

const ListadoImagenes = ({ imagenes, numDatosConsulta }) => {
  if (numDatosConsulta === 0) {
    return (
      <div class="alert alert-dismissible alert-success">
        Se realizó su búsqueda pero <strong>No</strong> se encontró resultados.
      </div>
    );
  }
  return (
    <div className="col-12 p-5 row">
      {imagenes.map((imagen) => {
        return <Imagen key={imagen.id} imagen={imagen} />;
      })}
    </div>
  );
};

export default ListadoImagenes;
