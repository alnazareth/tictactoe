var url_to = 'http://localhost:8080'
//var url_to= "http://192.168.1.148:8080";
var socket = io.connect(url_to,{'forceNew':true});
var figura;
var playername='';
var playername_global='';
var numero_turno=0;
var url_set=0;
var turnoActual;   /* */
var primero_jugar=0;
var num_movimientos=0;
function set_username(){

 playername = document.getElementById('playername').value;
if(playername.length<2){
		swal({
  title: "Define un nombre más largo",
  text: "",
  showCancelButton: false,
  closeOnConfirm: true,
  allowEscapeKey: false,
  html: true,
  animation: "slide-from-top",
   confirmButtonText: 'Entendido',
},function(){

	 document.getElementById('playername').focus();
	
})
}else{
document.getElementById('popup').style='display:none;'
	socket.emit("username",playername );
}

}

socket.on("sonido_entrada_sala",function(){
/*	
		
	 var audio1 = document.createElement('audio');
  audio1.style.display = "none";
  audio1.src = 'fondo_muic.wav';
  audio1.autoplay = true;
  audio1.volume=0.2;
  audio1.loop = true;
 */
});

socket.on("nuevo_ingreso",function(){
	var audio = document.createElement('audio');
  audio.style.display = "none";
  audio.src = 'newsession.wav';
  audio.autoplay = true;
  audio.loop = false;
		
	swal({
  title: "<img src='swords.png' style='width:25%;'><br>¡Tu oponente se acaba de conectar!",
  text: "Escoja un nombre y presione <b>Play!<b> ",
  showCancelButton: false,
  showConfirmButton: false,
  closeOnConfirm: true,
  allowEscapeKey: false,
  timer:4000,
  html: true,
  animation: "slide-from-top",

})
	
});



socket.on("cliente_desconectado",function(){
	var audio = document.createElement('audio');
  audio.style.display = "none";
  audio.src = 'newsession.wav';
  audio.autoplay = true;
  audio.loop = false;
		
		
	swal({
  title: "<img src='log_out.png' style='width:25%;'><br>¡Tu oponente ha abandonado la sala!",
  text: "<b>Esperando oponentes...<b> ",
  showCancelButton: false,
  showConfirmButton: false,
  closeOnConfirm: true,
  allowEscapeKey: false,
  timer:40000,
  html: true,
  animation: "slide-from-top",

})

  if (num_movimientos>0) {

  setTimeout("reload_page('popup_turn')",2000);
    

  };


	
});

function reload_page(ignore){

  window.location ='\\';
}


socket.on("numero_usuarios",function(data){
	document.getElementById('popup_waitfor_oponnent').style='display:none;'
	if(playername==data[0]){
		playername_global=data[1];
		turnoActual=true;
		figura="O";
		//document.getElementById('link_popup_turn3').click();
		
		document.getElementById('player_name').innerHTML= "<span style='background: #08d608; font-size: 2em;border-radius: 10px;padding: 1%;color: white;'><img src='user.png' title='TÚ' alt='TÚ'>"+ data[0]+"</span> <img src='shield.png' style='width:10%'> <span style='background:red; font-size: 2em;border-radius: 10px;padding: 1%;'><img src='user.png'title='OPONENTE' alt='OPONENTE' >"+ data[1]+"</span>";
		//setTimeout("ocultar_t('popup_turn')",4500);
		}
	
	if(playername==data[1]){
		playername_global=data[0];
		turnoActual=false;
		figura="X"
		//document.getElementById('link_popup_turn2').click();
		
		document.getElementById('player_name').innerHTML= "<span style='background: #08d608; font-size: 2em;border-radius: 10px;padding: 1%;color: white;'><img src='user.png' title='TÚ' alt='TÚ'>"+ data[1]+"</span><img src='shield.png' style='width:10%'> <span style='background:red; font-size: 2em;border-radius: 10px;padding: 1%;'><img src='user.png' title='OPONENTE' alt='OPONENTE' >"+ data[0]+"</span>";
		//setTimeout("ocultar_t('popup_turn2')",5500);
	}


});

function loaded(){
var ancho = screen.width;
	if(ancho < 500){

		alert("Voltea el movil para tener una mejor experiencia de juego :)");

	}
	
}

function ocultar_t(id){
	document.getElementById(id).style='display:none;';

if(primero_jugar==1){

_firsttoplay();
}else{
  _secondtoplay();
}


}

socket.on("sala_llena",function(){
	
		swal({
  title: "<img src='door-011-512.png' style='width:25%;'><br>¡Sala llena !",
  text: "Esta sala se encuentra  llena, intentelo luego.",
  showCancelButton: false,
  showConfirmButton: false,
  closeOnConfirm: true,
  allowEscapeKey: false,
  html: true,
  animation: "slide-from-top",

})
	
	
})


socket.on("sala_llena2",function(){
	
		swal({
  title: "<img src='twitter.png' style='width:25%;'><br>¡  !",
  text: "Esta sala se encuentra  llena, intentelo luego.",
  showCancelButton: false,
  showConfirmButton: false,
  closeOnConfirm: true,
  allowEscapeKey: false,
  html: true,
  animation: "slide-from-top",

})
	
	
})

socket.on("reload",function(){
	reiniciar()
});

socket.on("gano", function(data){
	
	if(data.figura==figura){
	var audio = document.createElement('audio');
  audio.style.display = "none";
  audio.src = 'ta_da.wav';
  audio.autoplay = true;
  audio.loop = false;
		
		swal({
  title: "<img src='knight.png' style='width:25%;'><br>¡Has ganado!",
  text: "",
  showCancelButton: false,
  closeOnConfirm: true,
  allowEscapeKey: false,
  html: true,
  animation: "slide-from-top",
   confirmButtonText: 'Reiniciar',
},function(){
	socket.emit("reiniciar",playername );
	
})
	
	}else{
		
 var audio = document.createElement('audio');
  audio.style.display = "none";
  audio.src = 'lose.wav';
  audio.autoplay = true;
  audio.loop = false;
			
		swal({
  title: "<img src='cry.png' style='width:25%;'><br>¡Has perdido!",
  text: "Esperando a que el ganador reinicie....",
  showCancelButton: false,
  showConfirmButton: false,
  closeOnConfirm: true,
  allowEscapeKey: false,
  html: true,
  animation: "slide-from-top",

})

	}
	
})

socket.on('empate',function(data){
	 var audio = document.createElement('audio');
  audio.style.display = "none";
  audio.src = 'lose.wav';
  audio.autoplay = true;
  audio.loop = false;
	
	if(data.figura==figura){
	swal({
  title: "<img src='libra.png' style='width:25%;'><br>¡EMTAPE DECLARADO!",
  text: "Esta partida no tuvo ganadores",
  showCancelButton: false,
  closeOnConfirm: true,
  allowEscapeKey: false,
  html: true,
  animation: "slide-from-top",
   confirmButtonText: 'Reiniciar partida',
},function(){
	socket.emit("reiniciar",playername );
	
})
	}else{
	swal({
  title: "<img src='libra.png' style='width:25%;'><br>¡EMTAPE DECLARADO!",
  text: "Reiniciando....",
  showCancelButton: false,
  showConfirmButton: false,
  closeOnConfirm: true,
  allowEscapeKey: false,
  html: true,
  animation: "slide-from-top",
   confirmButtonText: '',
},function(){
	socket.emit("reiniciar",playername );
	
})	
		
	}
});

socket.on("wait_for_opponent", function(data){
numero_turno=1;
			document.getElementById('link_wait_for_opponent').click();
	/*			if(numero_turno==1){
				swal({
  title: "#2",
  text: "¡ERES EL SEGUNDO EN JUGAR!",
  showCancelButton: false,
  closeOnConfirm: true,
  allowEscapeKey: false,
  html: true,
  animation: "slide-from-top",
   confirmButtonText: 'Entendido',
})
}*/
		
	});

socket.on("users_are_ready",function(data){
			
	document.getElementById('link_popup_turn3').click();
/*	if(numero_turno==0){
				swal({
  title: "#1",
  text: "¡ERES EL PRIMERO EN JUGAR!",
  showCancelButton: false,
  closeOnConfirm: true,
  allowEscapeKey: false,
  html: true,
  animation: "slide-from-top",
   confirmButtonText: 'Entendido',
})
}*/
	
		for (var i = 0; i<9; i++) {
			var item = built_item(i);

			
			document.getElementById('cat').innerHTML+=item;
		};
		definir_eventos();
		
} );

function reiniciar(){
	javascript:location=url_to;
//location.reload();	
}


function spark(data){
	//alert(data);
	
	document.getElementById("elemento-"+data).style='border:5px solid #08d608';
}

function sparkoff(data){
	//alert(data);
	document.getElementById("elemento-"+data).style='border: 1px solid  #999;';
}

function built_item (i) {
	return	"<div class='cat-element col-xs-4' onmouseover='spark("+i+");' onmouseout='sparkoff("+i+");' id='elemento-"+i+"'>  </div>";
}

function definir_eventos() {
	var elements=document.querySelectorAll(".cat-element");

	for (var i = 0; i<elements.length; i++) {
		var element = elements[i];

		element.addEventListener("click", function(){
			num_movimientos++;
			var pos = this.id.split("-")[1];
			
			socket.emit("nuevo_movimiento",{posicion: pos, juega_con:figura});
			
			var audio = document.createElement('audio');
			  audio.style.display = "none";
			  audio.src = 'unconvinced.ogg';
			  audio.autoplay = true;
			  audio.loop = false;
		})
		
	};
	setTimeout("ocultar_t('popup_turn3')",4500);
}

socket.on("no_te_toca",function(){
		var audio = document.createElement('audio');
  audio.style.display = "none";
  audio.src = 'rong_turn.wav';
  audio.autoplay = true;
  audio.loop = false;
		
	swal({
  title: "<img src='msg_loader.gif' style='width:25%;'><br>¡Es el turno de tu oponente!",
  text: "",
  showCancelButton: false,
  showConfirmButton: false,
  closeOnConfirm: true,
  allowEscapeKey: false,
  timer:3200,
  html: true,
  animation: "slide-from-top",
})	


		
	
} )


socket.on("ocupado_",function(){

			swal({
  title: "¡POSICIÓN NO DISPONIBLE!",
  text: "Debe jugar en una casilla vacia",
  showCancelButton: false,
  closeOnConfirm: true,
  allowEscapeKey: false,
  html: true,
  animation: "slide-from-top",
   confirmButtonText: 'Entendido',
})
	
} )

function hola(){
	
}

socket.on("alguien_tiro", function(data){

	if(data.figura==figura){
	document.getElementById("elemento-"+data.posicion+'').innerHTML= "<span style='color: #08d608;font-size: 5em;'>"+ data.figura+"</span>" ;

	}else{
		document.getElementById("elemento-"+data.posicion+'').innerHTML= "<span style='color: red;font-size: 5em;'> "+data.figura +"</span>";
	
	}
})




socket.on("_turno",function(){
primero_jugar=1;
  

 swal({
  title: "<img src='weapons_medieval_sword-512.png' style='width:25%;'><br>¡Esperando contrincante!",
  text: "",
  showCancelButton: false,
  showConfirmButton: false,
  closeOnConfirm: true,
  allowEscapeKey: false,
  timer:40000,
  html: true,
  animation: "slide-from-top",
})




} )



function _firsttoplay(){

    swal({
  title: "<img src='weapons_medieval_sword-512.png' style='width:25%;'><br>¡Eres el primero en jugar!",
  text: "",
  showCancelButton: false,
  showConfirmButton: false,
  closeOnConfirm: true,
  allowEscapeKey: false,
  timer:4200,
  html: true,
  animation: "slide-from-top",
})  
}


function _secondtoplay(){

    swal({
  title: "<img src='info.gif' style='width:12.5%;'><br>¡Tu oponente está pensando la jugada!",
  text: "Eres el segundo en jugar",
  showCancelButton: false,
  showConfirmButton: false,
  closeOnConfirm: true,
  allowEscapeKey: false,
  timer:4200,
  html: true,
  animation: "slide-from-top",
})  
}


function Verificar()
{
var tecla=window.event.keyCode;
if (tecla==116) {
 confirm('Si recarga la página perdera todos los datos ingresados,\n ¿Deseas recargar la página?"', function (result) {
     if (result) {
           location.reload();
      } else {
           event.keyCode=0;
event.returnValue=false;
      }
}); 

}




}