import express from 'express'; //no acepta require
import axios from 'axios';
import _ from 'lodash';
import chalk from 'chalk';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid'; 

const app = express();
const PORT = 3000;
//url api
const apiUrl= 'https://randomuser.me/api/';
const usuarios=[];
const formato = "MMMM Do YYYY: hh:mm:ss a";


app.listen(PORT, () => {
    console.log(`El servidor está inicializado en el puerto http://localhost:${PORT}`);
  });

app.get('/usuarios',async(req,res)=>{
try {
    const userApi = await axios.get(apiUrl);

    const data= userApi.data.results[0];
    console.log(data)
    const nombre= userApi.data.results[0].name.first;
    console.log(nombre)
    const apellido= userApi.data.results[0].name.last;
    const genero = userApi.data.results[0].gender;
    const id = uuidv4().slice(0, 6);
    const tiempo= moment().format(formato);
    usuarios.push({nombre, apellido, genero,id , tiempo});
    res.json({usuarios});
 
} catch (error) {
    console.log('Archivo no visualizado' + error)
    
}
})  


