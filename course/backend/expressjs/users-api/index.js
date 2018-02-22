/**
 * En este ejemplo creamos y listamos usuarios (que guardamos en memoria ya que aún no tenemos base de datos).
 * Generemos un servidor que permite registrarse, pero también listar los usuarios.
 */

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

let usersData = [];

class User{
	constructor(username, password){
		this.username = username;
		this.password = password;
	}
}

const jsonBodyParser = bodyParser.json();
app.use(jsonBodyParser); /* Gracias a esta instrucción, todas las llamadas a 'app' usarán a partir de ahora 'jsonBodyParser'. */

app.post('/api/users', (req, res) => {

	const usernameProvided = req.body.username;
	const passwordProvided = req.body.password;

	if(usernameProvided && passwordProvided){
		// creo un nuevo usuario y lo guardo:
		let userRegistration = new User(usernameProvided, passwordProvided);
		usersData.push(userRegistration);

		res.json( success('User registration succeeded.') );
	}else{
		res.json( failed('User registration failed.', 'Invalid username and/or password.') );
	}
});

app.get('/api/users', (req, res) => {
	let result = usersData.map( ({username}) => {
		return {username};
	});
	//console.log(result)
	res.json( success('Users listing succeeded.', result) );
});

/*app.get('/api/users', (req, res) => {
	res.json( success('Users listing succeeded.', usersData.map( ({username}) => {
			return { username }
		}) ) 
	)
})*/


function failed(message, error) {
	// Construimos un mensaje de error
	const res = { status: 'KO', message }; // destructuring!
	if (error){ 
		res.error = error;
	}
	return res;
}

function success(message, data) {
	const res = { status: 'OK', message };

	if (data){
		res.data = data;
	}

	return res;
}


require('dotenv').config();
const port = process.env.PORT;
app.listen(port, () => console.log(`landing server running on port: ${port}`));

/*

Para reproducir el ejemplo:
En un terminal ejecuta: node index.js 

Usa Postman para crear usuarios: Envía peticiones de tipo POST enviando como 'body' tipo 'raw' y con formato 'json' lo siguiente:
{
	"username": "paco",
	"password": "1234"
}

También puedes usar Postman para listar los usuarios que hay almacenados (en memoria, ya que aún no tenemos base de datos). Para listarlos, haz una petición de tipo GET a localhost:4501/api/users
*/

