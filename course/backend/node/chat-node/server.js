
/* Generamos una fecha con este formato: AAAA-MM-DD HH:MM (2018-02-20 15:42) */
function zeroFill(i) {
	return (i < 10 ? '0' : '') + i
}
function now () {
	let d = new Date()
	return d.getFullYear() + '-' +
		zeroFill(d.getMonth() + 1) + '-' +
		zeroFill(d.getDate()) + ' ' +
		zeroFill(d.getHours()) + ':' +
		zeroFill(d.getMinutes())
}



const net = require('net');

const server = net.createServer( (socket) => { //'connection' listener
	console.log('server connected');

	socket.on( 'data', data => {
		console.log(`${now()} => ${data.toString()}`);

		socket.write('Server receive the message');
	});

	socket.on('close', () =>console.log('closing socket'))
});


const port = process.argv[2] || 4048;


/* Llamamos al método 'listen' del objecto 'server' q es una instancia de 'net.createServer' */
server.listen(port, () => console.log(`server running on port: ${port}`));

/*  
Para probar este ejemplo:

En el terminal ejecuta: node server.js 4048
En otro terminal ejecuta: node client.js 4048 120.0.0.1 'texto que quiero enviar'
Felicidades, acabas de crear un chat!
*/

