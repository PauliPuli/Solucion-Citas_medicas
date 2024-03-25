//Llamamos las dependencias que ocuparemos
import express from "express"; //no acepta require
import axios from "axios";
import _ from "lodash";
import chalk from "chalk";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;
//url api
const apiUrl = "https://randomuser.me/api/";
const usuarios = []; //Guarda los usuarios
const formato = "MMMM Do YYYY: hh:mm:ss a";

app.listen(PORT, () => {
  console.log(
    `El servidor está inicializado en el puerto http://localhost:${PORT}`
  );
});
//En la misma ruta de usuarios llamamos la API
app.get("/usuarios", async (req, res) => {
  try {
    const userApi = await axios.get(apiUrl);

    const data = userApi.data.results[0];
    // console.log(data)----->usamos para verificar
    const nombre = userApi.data.results[0].name.first;
    // console.log(nombre)
    const apellido = userApi.data.results[0].name.last;
    const genero = userApi.data.results[0].gender;
    const id = uuidv4().slice(0, 6); //usamos appi uuid
    const tiempo = moment().format(formato);
    usuarios.push({ nombre, apellido, genero, id, tiempo });
    // Separar el array por genero de usuario gracias a lodash
    const usuariosXGenero = _.partition(usuarios, (user) => {
      return user.genero === "female";
    });
    //     console.log('--------**********************************-----------------');
    //     console.log('Mujeres')
    //     console.log(usuariosXGenero[0]);
    // console.log('Hombres')
    //     console.log(usuariosXGenero[1])

    //Esto se visualizará en el navegador. Iteramos con map porque son más de uno por género || Se nombra por las constantes definidas anteriormente, ya que están dentro de la ruta
    const template = `
<h5>Mujeres</h5>
<ol>
${usuariosXGenero[0].map((user) => {
  return `<li>Nombre: ${user.nombre} - Apellido: ${user.apellido} - Id: ${user.id} - Hora: ${user.tiempo}</li>`;
})}
</ol>
<h5>Hombres</h5>
<ol>
${usuariosXGenero[1].map((user) => {
  return `<li>Nombre: ${user.nombre} - Apellido: ${user.apellido} - Id: ${user.id} - Hora: ${user.tiempo}</li>`;
})}
</ol>
`;
    console.log(
      chalk.blue.bgWhite(
        `Nombre: ${nombre} - Apellido: ${apellido} - Id: ${id} - Hora: ${tiempo}\n Nombre: ${nombre} - Apellido: ${apellido} - Id: ${id} - Hora: ${tiempo}`
      )
    );
    res.send(template);
  } catch (error) {
    console.log("Archivo no visualizado" + error);
  }
});
