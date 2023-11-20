var express= require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var numero_usuarios=[];
var users_on_server=0;
var posiciones_ocupadas_global=[];
var user_ready =true;
var figure=true;
var turno =true;
var espacio_vacios;
var numero_jugadas=0;
var ips_en_sala=[]
var contador_ips_en_sala=0;
var numero_usuarios_global=0;

app.use(express.static('../client'));
 
var begin=false;


server.listen(8080, function(){
	console.log("Server is running at 8080 port");
});

io.on('connection', function(socket){  
	users_on_server++;

	if (users_on_server<3) {

		if(users_on_server == 1){
			socket.emit("_turno");
		}

		posiciones_ocupadas_global[0]=undefined;
		posiciones_ocupadas_global[1]=undefined;
		posiciones_ocupadas_global[2]=undefined;
		posiciones_ocupadas_global[3]=undefined;
		posiciones_ocupadas_global[4]=undefined;
		posiciones_ocupadas_global[5]=undefined;
		posiciones_ocupadas_global[6]=undefined;
		posiciones_ocupadas_global[7]=undefined;
		posiciones_ocupadas_global[8]=undefined;
		posiciones_ocupadas_global[9]=undefined;
socket.emit("sonido_entrada_sala");
//socket.broadcast.emit("sonido_entrada_sala",{});

		socket.figure =figure;
			socket.broadcast.emit("nuevo_ingreso",{});
	console.log("Se ha conectado un cliente: "+ ips_en_sala[0]);
	console.log("n clientes: "+ users_on_server);
	var posiciones_ocupadas=[];
	
	console.log(" ->socket.figure: "+ socket.figure+"|| ->figure "+ figure+ "||->Turno "+turno);

	socket.on("username", function(data){
	numero_usuarios.push(data);
 console.log("Se ha definido un usuario a : " + data);
	if (numero_usuarios.length>1){
	io.sockets.emit('numero_usuarios',numero_usuarios);
	io.sockets.emit("users_are_ready", {figure});
}else{
	socket.emit('wait_for_opponent', numero_usuarios);
}


});


figure =!figure;


socket.on("nuevo_movimiento", function(data){
	//console.log(data.posicion);
/*	for (var i = 0; i < posiciones_ocupadas_global.length; i++) {
	 console.log("posiciones_ocupadas "+posiciones_ocupadas[i]+"||| posiciones_ocupadas_global "+posiciones_ocupadas_global[i]);
}; */

 console.log("-> figure "+ figure+"||| ->Socket.figure: "+ socket.figure+ "|||| ->Turno"+turno);

	if (turno==socket.figure){
	if(!posiciones_ocupadas[data.posicion]  && !posiciones_ocupadas_global[data.posicion]){
	
	
		posiciones_ocupadas[data.posicion]=true;
		posiciones_ocupadas_global[data.posicion]=true;
		if( (posiciones_ocupadas[0]==true && posiciones_ocupadas[1]==true && posiciones_ocupadas[2]==true) || (posiciones_ocupadas[3]==true && posiciones_ocupadas[4]==true && posiciones_ocupadas[5]==true) || (posiciones_ocupadas[6]==true && posiciones_ocupadas[7]==true && posiciones_ocupadas[8]==true)  || (posiciones_ocupadas[0]==true && posiciones_ocupadas[3]==true && posiciones_ocupadas[6]==true) || (posiciones_ocupadas[1]==true && posiciones_ocupadas[4]==true && posiciones_ocupadas[7]==true) || (posiciones_ocupadas[2]==true && posiciones_ocupadas[5]==true && posiciones_ocupadas[8]==true)  || (posiciones_ocupadas[0]==true && posiciones_ocupadas[4]==true && posiciones_ocupadas[8]==true) || (posiciones_ocupadas[2]==true && posiciones_ocupadas[4]==true && posiciones_ocupadas[6]==true) ){

		console.log("Nuevo movimiento: " + data.posicion+" Con figura: "+data.juega_con);
		io.emit("alguien_tiro",{posicion: data.posicion, figura:data.juega_con});
		io.emit("gano",{posicion: data.posicion, figura:data.juega_con});
		turno = !turno;

			
		}else{	
		numero_jugadas++;
		if(numero_jugadas>8){
			io.emit('empate',{posicion: data.posicion, figura:data.juega_con});
		}else{
				
		console.log("Nuevo movimiento: " + data.posicion+" Con figura: "+data.juega_con);
		io.emit("alguien_tiro",{posicion: data.posicion, figura:data.juega_con});
		turno = !turno;

		}
		}

}else{
	for (var i = 0; i < posiciones_ocupadas_global.length; i++) {
	 console.log("posiciones_ocupadas "+posiciones_ocupadas[i]+"||| posiciones_ocupadas_global "+posiciones_ocupadas_global[i]);
};
	//console.log("Ocupado :" + data.posicion+" Con figura: "+data.juega_con + "posiciones_ocupadas"+posiciones_ocupadas[data.posicion]+"posiciones_ocupadas_global"+posiciones_ocupadas_global[data.posicion]);
		socket.emit('ocupado_',{});
	}

}else{
	socket.emit('no_te_toca',{});
}





	
});

socket.on("reiniciar",function(){
	 users_on_server=0;
	user_ready =true;
	figure=true;
	turno =true;
	numero_jugadas=0;
	numero_usuarios=[];
	posiciones_ocupadas=[];
	io.emit("reload",{});
})




}else{
			
			socket.emit("sala_llena",{})
			
		}

		socket.on("disconnect", function(){

				if(users_on_server>1 ){

			users_on_server--;
			socket.broadcast.emit("cliente_desconectado",{});
		console.log('Cliente desconectado');
		console.log("n clientes: "+ users_on_server);

}
});

});



//x