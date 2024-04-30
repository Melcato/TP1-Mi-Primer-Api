import fs from "fs";
const leerDatos = () => {
    try{
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
}

const escribirDatos = (data) => {
    try{
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};


//GET

const obtenerPeliculas = (req, res) => {
    const data = leerDatos();
    res.json(data);
}

//POST/create

const registrarPelicula = (req, res) => {
    const data = leerDatos(); 
    const body = req.body; 

    const nuevaPelicula = { 
        id: data.peliculas.length + 1,
        nombre: body.nombre,
        anio: body.anio,
    };
    data.peliculas.push(nuevaPelicula); 
    escribirDatos(data); 
    res.json(nuevaPelicula); 
}

// DELETE
const borrarPelicula = (req, res) => {
    const id = req.params.id; //esto era para obtener id
    
    const data = leerDatos();
    const peliculaSeleccionada = data.peliculas.findIndex((pelicula)=> pelicula.id === id); // busca id
    data.peliculas.splice(peliculaSeleccionada,1); //Corta la película 
    escribirDatos(data);
    res.json({message: "Borraste la pelicula, fracasaste y seras exiliado"});
}

// PUT/UPDATE
const editarPelicula = (req, res)=> {
    const data = leerDatos();
    const body = req.body;
    const id = parseInt(req.params.id);
    const peliculaSeleccionada = data.peliculas.findIndex((pelicula)=> pelicula.id === id); // parece para buscar el id de la peli video youtube
    data.peliculas[peliculaSeleccionada]= Object.assign({},data.peliculas[peliculaSeleccionada],body); // Reemplaza la pelicula por los datos que mandamos por body
    escribirDatos(data);
    res.json({message: "la pelicula ha sido actualizada"});
}

export default {
    obtenerPeliculas,
    registrarPelicula,
    editarPelicula,
    borrarPelicula
}