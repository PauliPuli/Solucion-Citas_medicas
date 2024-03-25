import express from 'express'; //no acepta require
import axios from 'axios';
import _ from 'lodash';
import chalk from 'chalk';
import moment from 'moment';
import uuid from 'uuid'; 

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
    const data= userApi.data.results[0]{gender,name}
    console.log(data)
    res.json(data)
} catch (error) {
    
}
})  


