function eventosPanel() {

	function abrirCalendario() { 
		open('calendario.html','','top=50,left=50,width=900,height=740') ; 
	}

	calendario.onclick=function(){
		abrirCalendario();
	}
	cerrar.onclick=function(){
		$.ajax
			({
			type: "POST",
		   	url: "Modelo/consultasPanel.php",
		   	data: {id:3},
			async: false,			
			success:
		    function (msg) 
			{	
				window.open('login.html' , '_self');			
		     },
		        error:
		        function (msg) {console.log(msg +"No se pudo realizar la conexion");}
			});
	}

	$("#Noticias").click(function(){
		$("#contenedor").html("");		
		$("#contenedor").append('<iframe src="editor.html" width="100%"  height="600px;" style="overflow-y:auto;" frameBorder="0"></iframe>');
		$("#publicar").click(function(){
			console.log("sdfsdfsdfdfsdf");
		});

	});
	$("#FormadePago").click(function (){
		$("#contenedor").load('formas/configFormasdePago.html', function(){
			$("#agregarCuenta").click(function(){
				if(validarAgregarCuenta()){
				$.ajax
					({
					type: "POST",
					url: "Modelo/consultasFormasdePago.php",
					data: {id:1, banco:tbanco.value, titular:titular.value, nrodecuenta:nrodecuenta.value, tipo:tipo.value, rif:rif.value},
					async: false,	
							
					success:
					function (msg) 
					{	
						//console.log(msg);
						tbanco.value="";
						titular.value="";
						nrodecuenta.value="";
						tipo.value="";
						rif.value="";	
						listarCuentas();
						EditarActualizarCuentas();
						eliminarcuenta();
						/*tcorreo.value=msg[0].email;*/
					},
					error:
					function (msg) {console.log(msg +"No se pudo realizar la conexion");}
					});		
				}

			});

			$("#Agregarcuentas").click(function(){	
					listarCuentas();
					EditarActualizarCuentas();
					eliminarcuenta();

			});
			$("#Pagosrealizados").click(function(){
				listarComprobantesdepago();
				EditarActualizarComprobantes();
				eliminarcomprobante();
				VerAdjuntos();
			});


		});

	});
	$("#contacto").click(function(){
		$("#contenedor").load('formas/configContacto.html', function(){

			$.ajax
				({
				type: "POST",
				url: "Modelo/consultasContacto.php",
				data: {id:3},
				async: false,	
				dataType: "json",		
				success:
				function (msg) 
				{	
					
					tcorreo.value=msg[0].email;
				},
				error:
				function (msg) {console.log(msg +"No se pudo realizar la conexion");}
				});		


			$("#guardarcontacto").click(function(){
				$.ajax
				({
				type: "POST",
				url: "Modelo/consultasContacto.php",
				data: {id:1, correo:tcorreo.value},
				async: false,			
				success:
				function (msg) 
				{	
					alertas.innerHTML="<div class='alert alert-success'>Se ha Actualizado el correo de contacto</div>";			
				},
				error:
				function (msg) {console.log(msg +"No se pudo realizar la conexion");}
				});				
			});
		});
		
	});
	portafolio.onclick=function(){
		VaciarFileInput();
		fileupload.action = "server/php/PortafolioCursos.php";
		mainInputFile();
		$("#contenedor").load('formas/portafoliodecurso.html', function() {
			VisualizarTabladeAreas();

			agregarArea.onclick=function(){
				if(NombreArea.value!=""){
					$.ajax
					({
						type: "POST",
						url: "Modelo/consultasPortafolio.php",
						data: {id:14, NombreArea:NombreArea.value},
						async: false,
						dataType: "json",
						success:
						function (msg) 
						{				
							if(msg=="true"){
								alertasAREAS.innerHTML="<div class='alert alert-success'>Area Agregado!</div>";
								NombreArea.value="";
								VisualizarTabladeAreas();				
							}
						},
					error:
					function (msg) {
						console.log( msg +"Problema al registrar un area");}
					});
				}
				else{
					alertasAREAS.innerHTML="<div class='alert alert-danger'>Escriba el nombre del area</div>";
				}
				
		  	}
			agregarPortafolio.onclick=function(){
				if(validarAgregarCurso()){
					$.ajax
					({
						type: "POST",
						url: "Modelo/consultasPortafolio.php",
						data: {id:1, area:Areas.value, curso:curso.value, desde:tdesde.value, hasta:thasta.value, duracion:tduracion.value, cupos:tcupos.value},
						async: false,
						dataType: "json",
						success:
						function (msg) 
						{				
							if(msg=="true"){
								alertasCurso.innerHTML="<div class='alert alert-success'>Curso Agregado!</div>";
								limpiarFormularioAgregarPortafolio();
							}
						},
					error:
					function (msg) {
						console.log( msg +"No se pudo realizar la conexion");}
					});
				}

		  	}

		  	tabAgregarCurso.onclick=function(){

		  		VaciarFileInput();
				fileupload.action = "server/php/PortafolioCursos.php";
				mainInputFile();

				$.ajax
					({
						type: "POST",
						url: "Modelo/consultasPortafolio.php",
						data: {id:15},
						async: false,
						dataType: "json",
						success:
						function (msg) 
						{			
							for(i=0; i<msg[0].m; i++)
								{			
									
									Areas.options[i]= new Option (msg[i].nombre);
									Areas.options[i].text = msg[i].nombre+"";
									Areas.options[i].value = msg[i].id;	
								}
						},
					error:
					function (msg) {
						console.log( msg +"Problema al Listar las areas");}
					});	
		  	}
		  	inscritos.onclick=function(){
		  		$('#AreasInscrito').empty();
		  		$.ajax
					({
						type: "POST",
						url: "Modelo/consultasPortafolio.php",
						data: {id:15},
						async: false,
						dataType: "json",
						success:
						function (msg) 
						{			
								AreasInscrito.options[0]= new Option ("");
								AreasInscrito.options[0].text = "";
								AreasInscrito.options[0].value =-1	

							for(i=0; i<msg[0].m; i++)
								{												
									AreasInscrito.options[i+1]= new Option (msg[i].nombre);
									AreasInscrito.options[i+1].text = msg[i].nombre+"";
									AreasInscrito.options[i+1].value = msg[i].id;	
								}
						},
					error:
					function (msg) {
						console.log( msg +"Problema al Listar las areas");}
					});	

					AreasInscrito.onchange=function(){
						if (AreasInscrito.value!=-1) {
							$('#CursoInscrito').empty();
							$.ajax
								({
									type: "POST",
									url: "Modelo/consultasPortafolio.php",
									data: {id:18, ID:AreasInscrito.value},
									async: false,
									dataType: "json",
									success:
									function (msg) 
									{			
											CursoInscrito.options[0]= new Option ("");
											CursoInscrito.options[0].text = "";
											CursoInscrito.options[0].value =-1	

										for(i=0; i<msg[0].m; i++)
											{												
												CursoInscrito.options[i+1]= new Option (msg[i].nombre);
												CursoInscrito.options[i+1].text = msg[i].nombre+"";
												CursoInscrito.options[i+1].value = msg[i].id;	
											}
									},
								error:
								function (msg) {
									console.log( msg +"Problema al Listar las areas");}
								});	
						}						
					}

					BuscarInscritos.onclick=function(){
						if(CursoInscrito.value!=-1&&FechadeInicioInscrito.value!=""){
						$.ajax
							({
								type: "POST",
								url: "Modelo/consultasPortafolio.php",
								data: {id:6, idArea:AreasInscrito.value, idCurso:CursoInscrito.value, Fechadeinicio:FechadeInicioInscrito.value },
								async: false,
								dataType: "json",
								success:
								function (msg) 
								{				
									$('#ListadodeInscritos').html("");	
									var table = $('<table></table>').addClass('table table-hover');							
									var row=$('<tr></tr>');
									row.append($('<td></td>').html("<b>Nombre</b>"));							
									row.append($('<td></td>').html("<b>Apellido</b>"));					
									row.append($('<td></td>').html("<b>Telefono</b>"));
									row.append($('<td></td>').html("<b>Correo</b>"));
									row.append($('<td></td>').html("<b>Opciones</b>"));
									table.append(row);								
									for(i=0; i<msg[0].m; i++){
										var row2 = $('<tr></tr>');
										var fila1 = $('<td></td>').text(msg[i].Nombre);
										var fila2 = $('<td></td>').text(msg[i].Apellido);
										var fila3 = $('<td></td>').text(msg[i].Telefono);
										var fila4 = $('<td></td>').text(msg[i].Correo);																	
									    var fila6 = $('<td></td>').append('<a  class="editarinscritos btn btn-default btn-sm" data-toggle="modal" data-target="#ModalInscritos"  title="Editar/Modificar" name="'+msg[i].id+'"> <span class="glyphicon glyphicon-pencil"></span></a>');
									    fila6.append('<a type="button" class="btn btn-default btn-sm eliminarinscrito" data-toggle="modal" data-target="#EliminarInscrito"  title="Eliminar" name="'+msg[i].id+'"> <span class="glyphicon glyphicon-remove"></span></a>');							row2.append(fila1);
										row2.append(fila2);
										row2.append(fila3);
										row2.append(fila4);									
										row2.append(fila6);									
									    table.append(row2);
									}
									$('#ListadodeInscritos').append(table);
								},
							error:
							function (msg) {
								console.log( msg +"No se pudo buscar los inscritos");}
							});
						EditarActualizarInscritos();
						eliminarinscrito();

						}
						else{
							alertaInscritos.innerHTML="<div class='alert alert-danger'>¡No deje ni un campo vacio!</div>";
						}
					}


				
		  	}

  			ver.onclick=function(){
  				$('#Areas_cursos').empty();
		  		$.ajax
					({
						type: "POST",
						url: "Modelo/consultasPortafolio.php",
						data: {id:15},
						async: false,
						dataType: "json",
						success:
						function (msg) 
						{			
								Areas_cursos.options[0]= new Option ("");
								Areas_cursos.options[0].text = "";
								Areas_cursos.options[0].value =-1	

							for(i=0; i<msg[0].m; i++)
								{												
									Areas_cursos.options[i+1]= new Option (msg[i].nombre);
									Areas_cursos.options[i+1].text = msg[i].nombre+"";
									Areas_cursos.options[i+1].value = msg[i].id;	
								}
						},
					error:
					function (msg) {
						console.log( msg +"Problema al Listar las areas");}
					});	
					Areas_cursos.onchange=function(){
						if(Areas_cursos.value!=-1){
							listarcursos();
							VerContenido();
							EditarActualizar();
							eliminar();
						}
					}

				/*perforacion.onclick=function(){
					$.ajax
					({
						type: "POST",
						url: "Modelo/consultasPortafolio.php",
						data: {id:2, tipo:1},
						async: false,
						dataType: "json",
						success:
						function (msg) 
						{			
							$('#Perforacion').html("");	
							var table = $('<table></table>').addClass('table table-hover');							
							var row=$('<tr></tr>');
							$('#Perforacion').append(ListarTabla(msg, table, row));
						},
					error:
					function (msg) {
						console.log( msg +"No se pudo realizar la conexion");}
					});
					VerContenido();
					EditarActualizar();
					eliminar();
				}
				yacimiento.onclick=function(){
					$.ajax
					({
						type: "POST",
						url: "Modelo/consultasPortafolio.php",
						data: {id:2, tipo:2},
						async: false,
						dataType: "json",
						success:
						function (msg) 
						{		
							$('#Yacimiento').html("");		
							var table = $('<table></table>').addClass('table table-hover');							
							var row=$('<tr></tr>');
							$('#Yacimiento').append(ListarTabla(msg, table, row));
						},
					error:
					function (msg) {
						console.log( msg +"No se pudo realizar la conexion");}
					});
					VerContenido();
					EditarActualizar();
					eliminar();
				}
				administracion.onclick=function(){
					$.ajax
					({
						type: "POST",
						url: "Modelo/consultasPortafolio.php",
						data: {id:2, tipo:3 },
						async: false,
						dataType: "json",
						success:
						function (msg) 
						{			
							$('#Administracion').html("");	
							var table = $('<table></table>').addClass('table table-hover');							
							var row=$('<tr></tr>');							
							$('#Administracion').append(ListarTabla(msg, table, row));
						},
					error:
					function (msg) {
						console.log( msg +"No se pudo realizar la conexion");}
					});
					VerContenido();
					EditarActualizar();
					eliminar();
				}
				finanzas.onclick=function(){
					$.ajax
					({
						type: "POST",
						url: "Modelo/consultasPortafolio.php",
						data: {id:2, tipo:4 },
						async: false,
						dataType: "json",
						success:
						function (msg) 
						{				
							$('#Finanzas').html("");
							var table = $('<table></table>').addClass('table table-hover');							
							var row=$('<tr></tr>');							
							$('#Finanzas').append(ListarTabla(msg, table, row));
						},
					error:
					function (msg) {
						console.log( msg +"No se pudo realizar la conexion");}
					});
					VerContenido();
					EditarActualizar();
					eliminar();
				}
				tecnicas.onclick=function(){
					console.log("click en tecnica");
					$.ajax
					({
						type: "POST",
						url: "Modelo/consultasPortafolio.php",
						data: {id:2, tipo:5 },
						async: false,
						dataType: "json",
						success:
						function (msg) 
						{				
							$('#Tecnicas').html("");
							var table = $('<table></table>').addClass('table table-hover');							
							var row=$('<tr></tr>');							
							$('#Tecnicas').append(ListarTabla(msg, table, row));
						},
					error:
					function (msg) {
						console.log( msg +"No se pudo realizar la conexion");}
					});
					VerContenido();
					EditarActualizar();
					eliminar();
				}*/
			}
		});	
	}
	participante.onclick=function(){
		$("#contenedor").load('formas/participante.html');	
	}
	facilitador.onclick=function(){
		$("#contenedor").load('formas/configFacilitador.html', function (){			
			listarfacilitadores();
		});
	}

}

function listarcursos(){
	$.ajax
		({
			type: "POST",
			url: "Modelo/consultasPortafolio.php",
			data: {id:2, idArea:Areas_cursos.value},
			async: false,
			dataType: "json",
			success:
			function (msg) 
			{			
				$('#listadodeCursos').html("");	
				var table = $('<table></table>').addClass('table table-hover');							
				var row=$('<tr></tr>');
				$('#listadodeCursos').append(ListarTabla(msg, table, row));
			},
		error:
		function (msg) {
			console.log( msg +"No se pudo realizar la conexion");}
		});
}
function listarfacilitadores(){
	$.ajax
	({
		type: "POST",
		url: "Modelo/consultasFacilitador.php",
		data: {id:2 },
		async: false,
		dataType: "json",
		success:
		function (msg) 
		{				
			$('#Facilitador').html("");
			var table = $('<table></table>').addClass('table table-hover');							
			var row=$('<tr></tr>');							
			$('#Facilitador').append(ListarTablaFacilitador(msg, table, row));
		},
		error:
		function (msg) {
			//console.log(msg);
			console.log("No se pudo realizar la conexion");}
	});
	VerContenidoFacilitador();
	EditarActualizarFacilitador();
	eliminarFacilitador();

}
function validarAgregarCuenta(){
	if(tbanco.value==""){
		alertas.innerHTML="<div class='alert alert-danger'>Elija un Banco</div>";
		return false;
	}
	else if(titular.value == "" )
	{  
        alertas.innerHTML="<div class='alert alert-danger'>Llene el campo titular</div>";
		return false;
	}	
	else if(nrodecuenta.value == "" )
	{  
        alertas.innerHTML="<div class='alert alert-danger'>Escriba el numero de Cuenta</div>";
		return false;
	}	
	else if(tipo.value == "" )
	{  
        alertas.innerHTML="<div class='alert alert-danger'>Elija el tipo de cuenta</div>";
		return false;
	}
	else if(rif.value == "" )
	{  
        alertas.innerHTML="<div class='alert alert-danger'>Debe Escribir un CI/RIF</div>";
		return false;
	}
	else {return true;}
}
function validarAgregarCurso(){
	var ArchivosSubidos = $('tr.template-download');
	if(Areas.value==""){
		alertasCurso.innerHTML="<div class='alert alert-danger'>Elija un area</div>";
		return false;
	}
	else if(curso.value == "" )
	{  
        alertasCurso.innerHTML="<div class='alert alert-danger'>Llene el campo curso</div>";
		return false;
	}	
	else if(tdesde.value == "" )
	{  
        alertasCurso.innerHTML="<div class='alert alert-danger'>Seleccione una fecha  de inicio del curso</div>";
		return false;
	}	
	else if(thasta.value == "" )
	{  
        alertasCurso.innerHTML="<div class='alert alert-danger'>Seleccione una fecha  de final del curso</div>";
		return false;
	}
	else if(tduracion.value == "" )
	{  
        alertasCurso.innerHTML="<div class='alert alert-danger'>Escriba en horas la duracion del curso</div>";
		return false;
	}
	else if(tcupos.value == "" )
	{  
        alertasCurso.innerHTML="<div class='alert alert-danger'>Escriba la cantidad de cupos</div>";
		return false;
	}
	else if(ArchivosSubidos.length == 0){
		alertasCurso.innerHTML="<div class='alert alert-danger'>Debe cargar al menos un archivo del contenido del curso</div>";
		return false;
	}
	else {return true;}
}

function limpiarFormularioAgregarPortafolio(){
	
	curso.value = "";
	tdesde.value = "";
	thasta.value = "";
	tduracion.value = "" ;
	tcupos.value="";
	VaciarFileInput();
}

function EditarActualizar(){
	$('a.editar').on('click',  function(){
	var id=$(this).attr('name');
	
	alertas2.innerHTML="";
	$.ajax
	({
		type: "POST",
		url: "Modelo/consultasPortafolio.php",
		data: {id:3, ID:id},
		async: false,
		dataType: "json",
		success:
		function (msg) 
		{
			tareas2.value=msg[0].Area;
			curso2.value=msg[0].Curso;
			tdesde2.value=msg[0].Desde;
			thasta2.value=msg[0].Hasta;
			tduracion2.value=msg[0].Duracion;
			tcupos2.value=msg[0].Cupos;
			$("#alertas2").html("");
			$("#footermodificar").html("");
			$("#footermodificar").append(' <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button> <a class="actualizar btn btn-primary" name="'+id+'">Actualizar</a>');
		},
		error:
		function (msg) {
			console.log( msg +"No se pudo realizar la conexion");}
		});

		$('a.actualizar').on('click',  function(){
			var id=$(this).attr('name');
			console.log(id+"Actualizar");
			$.ajax
			({
				type: "POST",
				url: "Modelo/consultasPortafolio.php",
				data: {id:4, ID:id, area:tareas2.value, curso:curso2.value, desde:tdesde2.value, hasta:thasta2.value, duracion:tduracion2.value},
				async: false,
				dataType: "json",
				success:
				function (msg) 
				{
					if(msg=="true")
					alertas2.innerHTML="<div class='alert alert-success'>Se ha Actualizado</div>";

				},
				error:
				function (msg) {
					console.log( msg +"No se pudo realizar la conexion");}
				});
		});

	});
}

function EditarArea(){
	//console.log("id: "+id);
	$('a.editararea').on('click',  function(){
		var id=$(this).attr('name');
		//console.log("id: "+id);
		$.ajax
		({
			type: "POST",
			url: "Modelo/consultasPortafolio.php",
			data: {id:16, ID:id},
			async: false,
			dataType: "json",
			success:
			function (msg) 
			{
				NombreArea2.value=msg[0].nombre;	
				alertasactualizadoarea.innerHTML="";						
				$("#footereditararea").html("");
				$("#footereditararea").append(' <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button> <a class="actualizarArea btn btn-primary" name="'+id+'">Actualizar</a>');
			},
			error:
			function (msg) {
				console.log( msg +"No se pudo realizar la conexion");}
			});
		actualizarArea();
	});
	
}
function actualizarArea(){
	console.log("id: ");
	$('a.actualizarArea').on('click',  function(){
			console.log("id: ");
		if(NombreArea2.value!=""){
			var id=$(this).attr('name');
		
			$.ajax
			({
				type: "POST",
				url: "Modelo/consultasPortafolio.php",
				data: {id:17, ID:id, NombreArea2:NombreArea2.value},
				async: false,
				dataType: "json",
				success:
				function (msg) 
				{
						alertasactualizadoarea.innerHTML="<div class='alert alert-success'>Area Actualizado!</div>";
						VisualizarTabladeAreas();
				},
				error:
				function (msg) {
					console.log( msg +"No se pudo realizar la conexion");}
				});
		}
		else alertasactualizadoarea.innerHTML="<div class='alert alert-danger'>Escriba el nombre del area</div>";
	});
}
function EditarActualizarInscritos(){
	$('a.editarinscritos').on('click',  function(){
	var id=$(this).attr('name');
	alertasactualizado.innerHTML="";
	console.log(id+"Editar Inscrito");
	$.ajax
	({
		type: "POST",
		url: "Modelo/consultasPortafolio.php",
		data: {id:7, ID:id},
		async: false,
		dataType: "json",
		success:
		function (msg) 
		{
			tnombre.value=msg[0].Nombre;
			tapellido.value=msg[0].Apellido;
			tTelefono.value=msg[0].Telefono;
			tcorreo.value=msg[0].Correo;
			diplomadocursotaller.value=msg[0].DiplomadoCursoTaller;
			tFecha.value=msg[0].Fechadeinicio;
			tTemas.value=msg[0].Temasdeinteres;	
			tModalidad.value=msg[0].Modalidad;				
			$("#footerModificarInscrito").html("");
			$("#footerModificarInscrito").append(' <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button> <a class="actualizarinscrito btn btn-primary" name="'+id+'">Actualizar</a>');
		},
		error:
		function (msg) {
			console.log( msg +"No se pudo realizar la conexion");}
		});

		$('a.actualizarinscrito').on('click',  function(){
			var id=$(this).attr('name');
			console.log(id+"Actualizar");
			$.ajax
			({
				type: "POST",
				url: "Modelo/consultasPortafolio.php",
				data: {id:8, ID:id, Nombre:tnombre.value, Apellido:tapellido.value, Telefono:tTelefono.value, Correo:tcorreo.value, diplomadocursotaller:diplomadocursotaller.value, Fecha:tFecha.value,  Tema:tTemas.value, Modalidad:tModalidad.value},
				async: false,
				dataType: "json",
				success:
				function (msg) 
				{
					if(msg=="true")
					alertasactualizado.innerHTML="<div class='alert alert-success'>Se ha Actualizado</div>";

				},
				error:
				function (msg) {
					console.log( msg +"No se pudo realizar la conexion");}
				});
		});

	});
}
function eliminar(){
	$('a.eliminar').on('click',  function(){
		var id=$(this).attr('name');
		$("#footereliminar").html("");
		$("#footereliminar").append('<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button> <a class="eliminardefinitivo btn btn-primary" name="'+id+'">Borrar</a>');
		$('a.eliminardefinitivo').on('click',  function(){
			var id=$(this).attr('name');
			$.ajax
			({
				type: "POST",
				url: "Modelo/consultasPortafolio.php",
				data: {id:5, ID:id},
				async: false,
				dataType: "json",
				success:
				function (msg) 
				{
					alertas3.innerHTML="<div class='alert alert-success'>Se ha eliminado</div>";
					listarcursos();
				},
				error:
				function (msg) {
					//console.log(msg);
					console.dir("No se pudo realizar la conexion");}
			});
			$(this).attr("disabled", "true");
		});
	});
}

function eliminarinscrito(){
	$('a.eliminarinscrito').on('click',  function(){
		var id=$(this).attr('name');
		$("#footereliminarinscrito").html("");
		$("#footereliminarinscrito").append('<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button> <a class="eliminardefinitivo2 btn btn-primary" name="'+id+'">Borrar</a>');
		$('a.eliminardefinitivo2').on('click',  function(){	
			var id=$(this).attr('name');
			$.ajax
			({
				type: "POST",
				url: "Modelo/consultasPortafolio.php",
				data: {id:9, ID:id},
				async: false,
				dataType: "json",
				success:
				function (msg) 
				{
					alertaseliminarinscrito.innerHTML="<div class='alert alert-success'>Se ha eliminado</div>";							
								},
				error:
				function (msg) {
					console.log( msg +"No se pudo realizar la conexion");}
			});
			$(this).attr("disabled", "true");
		});
	});
}

function ListarTabla(msg, table, row){			
	row.append($('<td></td>').html("<b>Curso</b>"));							
	row.append($('<td></td>').html("<b>Desde</b>"));
	row.append($('<td></td>').html("<b>Hasta</b>"));
	row.append($('<td></td>').html("<b>Duracion</b>"));
	row.append($('<td></td>').html("<b>opciones</b>"));
	table.append(row);					
	
	for(i=0; i<msg[0].m; i++){
		var row2 = $('<tr></tr>');
		var fila1 = $('<td></td>').text(msg[i].Curso);
		var fila2 = $('<td></td>').text(msg[i].Desde);
		var fila3 = $('<td></td>').text(msg[i].Hasta);
		var fila4 = $('<td></td>').text(msg[i].Duracion);
	    var fila6 = $('<td></td>').append('<a class="vercontenido btn btn-default btn-sm" type="button" data-toggle="modal" data-target="#ModalSubirArchivo" title="Ver contenido" name="'+msg[i].id+'"> <span class="glyphicon glyphicon-eye-open"></span></button>');
	    fila6.append('<a  class="editar btn btn-default btn-sm" data-toggle="modal" data-target="#Modificar"  title="Editar/Modificar" name="'+msg[i].id+'"> <span class="glyphicon glyphicon-pencil"></span></a>');
	    fila6.append('<a class="eliminar btn btn-default btn-sm" data-toggle="modal" type="button"  data-target="#Eliminar"  title="Eliminar" name="'+msg[i].id+'"> <span class="glyphicon glyphicon-remove"></span></a>');

		row2.append(fila1);
		row2.append(fila2);
		row2.append(fila3);
		row2.append(fila4);									
		row2.append(fila6);									
	    table.append(row2);
	}
	return table;
}

function ListarTablaFacilitador(msg, table, row){			
	row.append($('<td></td>').html("<b>Nombre</b>"));							
	row.append($('<td></td>').html("<b>Apellido</b>"));
	row.append($('<td></td>').html("<b>Telefono</b>"));
	row.append($('<td></td>').html("<b>Correo</b>"));
	row.append($('<td></td>').html("<b>opciones</b>"));
	table.append(row);					
	
	for(i=0; i<msg[0].m; i++){
		var row2 = $('<tr></tr>');
		var fila1 = $('<td></td>').text(msg[i].Nombre);
		var fila2 = $('<td></td>').text(msg[i].Apellido);
		var fila3 = $('<td></td>').text(msg[i].Telefono);
		var fila4 = $('<td></td>').text(msg[i].Correo);
	    var fila6 = $('<td></td>').append('<a class="verCV btn btn-default btn-sm" type="button" data-toggle="modal" data-target="#ModalSubirArchivo" title="Ver contenido" name="'+msg[i].id+'"> <span class="glyphicon glyphicon-eye-open"></span></button>');
	    fila6.append('<a  class="editarFacilitador btn btn-default btn-sm" data-toggle="modal" data-target="#Modificar"  title="Editar/Modificar" name="'+msg[i].id+'"> <span class="glyphicon glyphicon-pencil"></span></a>');
	    fila6.append('<a class="eliminarFacilitador btn btn-default btn-sm" data-toggle="modal" type="button"  data-target="#Eliminar"  title="Eliminar" name="'+msg[i].id+'"> <span class="glyphicon glyphicon-remove"></span></a>');

		row2.append(fila1);
		row2.append(fila2);
		row2.append(fila3);
		row2.append(fila4);									
		row2.append(fila6);									
	    table.append(row2);
	}
	return table;
}

function EditarActualizarFacilitador(){
	$('a.editarFacilitador').on('click',  function(){
	var id=$(this).attr('name');
	alertas2.innerHTML="";	
	$.ajax
	({
		type: "POST",
		url: "Modelo/consultasFacilitador.php",
		data: {id:4, ID:id},
		async: false,
		dataType: "json",
		success:
		function (msg) 
		{
			tnombre.value=msg[0].Nombre;
			tapellido.value=msg[0].Apellido;
			ttelefono.value=msg[0].Telefono;
			tcorreo.value=msg[0].Correo;
			tareas2.value=msg[0].Area;
			tcurso.value=msg[0].Curso;		
			$("#footermodificar").html("");
			$("#footermodificar").append(' <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button> <a class="actualizarfacilitador btn btn-primary" name="'+id+'">Actualizar</a>');
		},
		error:
		function (msg) {
			console.log( msg +"No se pudo realizar la conexion");}
		});

		$('a.actualizarfacilitador').on('click',  function(){
			var id=$(this).attr('name');		
			console.log("ActualizarFacilitador"+id);
			$.ajax
			({
				type: "POST",
				url: "Modelo/consultasFacilitador.php",
				data: {id:3, ID:id, Nombre:tnombre.value, Apellido:tapellido.value, Telefono:ttelefono.value, Areas:tareas2.value, Curso:tcurso.value, Correo:tcorreo.value},
				async: false,
				dataType: "json",
				success:
				function (msg) 
				{

					if(msg=="true")
					alertas2.innerHTML="<div class='alert alert-success'>Se ha Actualizado</div>";
				},
				error:
				function (msg) {
					console.log( msg +"No se pudo realizar la conexion");}
				});
		});

	});
}

function eliminarFacilitador(){
	$('a.eliminarFacilitador').on('click',  function(){
		var id=$(this).attr('name');
		console.log("Eliminar Facilitador" + id);
		$("#footereliminar").html("");
		$("#footereliminar").append('<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button> <a class="eliminardefinitivo2 btn btn-primary" name="'+id+'">Borrar</a>');
		$('a.eliminardefinitivo2').on('click',  function(){	
			var id=$(this).attr('name');
			$.ajax
			({
				type: "POST",
				url: "Modelo/consultasFacilitador.php",
				data: {id:5, ID:id},
				async: false,
				dataType: "json",
				success:
				function (msg) 
				{
					alertas3.innerHTML="<div class='alert alert-success'>Se ha eliminado</div>";	
					listarfacilitadores();
				},
				error:
				function (msg) {
					console.log( msg +"No se pudo realizar la conexion");}
			});
			$(this).attr("disabled", "true");
		});
	});
}

function ListarTabladeCuentas(msg, table, row){			
	row.append($('<td></td>').html("<b>Banco</b>"));							
	row.append($('<td></td>').html("<b>Titular</b>"));
	row.append($('<td></td>').html("<b>Numero</b>"));
	row.append($('<td></td>').html("<b>Tipo</b>"));
	row.append($('<td></td>').html("<b>opciones</b>"));
	table.append(row);					
	
	for(i=0; i<msg[0].m; i++){
		var row2 = $('<tr></tr>');
		var fila1 = $('<td></td>').text(msg[i].Banco);
		var fila2 = $('<td></td>').text(msg[i].Titular);
		var fila3 = $('<td></td>').text(msg[i].Numero);
		var fila4 = $('<td></td>').text(msg[i].Tipo);
	    var fila6 = $('<td></td>').append('<a  class="editarcuenta btn btn-default btn-sm" data-toggle="modal" data-target="#Modificar"  title="Editar/Modificar" name="'+msg[i].id+'"> <span class="glyphicon glyphicon-pencil"></span></a>');
	    fila6.append('<a type="button" class="btn btn-default btn-sm eliminarcuenta" data-toggle="modal" data-target="#Eliminar"  title="Eliminar" name="'+msg[i].id+'"> <span class="glyphicon glyphicon-remove"></span></a>');

		row2.append(fila1);
		row2.append(fila2);
		row2.append(fila3);
		row2.append(fila4);									
		row2.append(fila6);									
	    table.append(row2);
	}
	return table;
}

function EditarActualizarCuentas(){
	$('a.editarcuenta').on('click',  function(){
	var id=$(this).attr('name');
	alertas2.innerHTML="";
	console.log(id+"Editar cuenta");
	$.ajax
	({
		type: "POST",
		url: "Modelo/consultasFormasdePago.php",
		data: {id:3, ID:id},
		async: false,
		dataType: "json",
		success:
		function (msg) 
		{
			tbanco2.value=msg[0].Banco;
			titular2.value=msg[0].Titular;
			nrodecuenta2.value=msg[0].Numero;
			tipo2.value=msg[0].Tipo;
			rif2.value=msg[0].CIRIF;			
			$("#footermodificarCuenta").html("");
			$("#footermodificarCuenta").append(' <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button> <a class="actualizarcuenta btn btn-primary" name="'+id+'">Actualizar</a>');
		},
		error:
		function (msg) {
			console.log( msg +"No se pudo realizar la conexion");}
		});

		$('a.actualizarcuenta').on('click',  function(){
			var id=$(this).attr('name');
			console.log(id+"Actualizar");
			$.ajax
			({
				type: "POST",
				url: "Modelo/consultasFormasdePago.php",
				data: {id:4, ID:id, Banco:tbanco2.value, Titular:titular2.value, Numero:nrodecuenta2.value, Tipo:tipo2.value, Rif:rif2.value},
				async: false,
				dataType: "json",
				success:
				function (msg) 
				{
					if(msg=="true")
					alertas2.innerHTML="<div class='alert alert-success'>Se ha Actualizado</div>";

				},
				error:
				function (msg) {
					console.log( msg +"No se pudo realizar la conexion");}
				});
		});

	});
}

function eliminarcuenta(){
	$('a.eliminarcuenta').on('click',  function(){
		var id=$(this).attr('name');
		$("#footereliminar").html("");
		$("#footereliminar").append('<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button> <a class="eliminardefinitivo2 btn btn-primary" name="'+id+'">Borrar</a>');
		$('a.eliminardefinitivo2').on('click',  function(){	
			var id=$(this).attr('name');
			$.ajax
			({
				type: "POST",
				url: "Modelo/consultasFormasdePago.php",
				data: {id:5, ID:id},
				async: false,
				dataType: "json",
				success:
				function (msg) 
				{
					alertas3.innerHTML="<div class='alert alert-success'>Se ha eliminado</div>";	
					listarCuentas();
								},
				error:
				function (msg) {
					console.log( msg +"No se pudo realizar la conexion");}
			});
			$(this).attr("disabled", "true");
		});
	});
}


function listarCuentas(){
	$.ajax
		({
		type: "POST",
		url: "Modelo/consultasFormasdePago.php",
		data: {id:2},
		async: false,	
		dataType: "json",		
		success:
		function (msg) 
		{	
			$('#cuentasAgregadas').html("");
			$('#cuentasAgregadas').html("<h1>Cuentas Agregadas</h1>")
			var table = $('<table></table>').addClass('table table-hover');							
			var row=$('<tr></tr>');
			$('#cuentasAgregadas').append(ListarTabladeCuentas(msg, table, row));
			EditarActualizarCuentas();
			eliminarcuenta();
			/*tcorreo.value=msg[0].email;*/
		},
		error:
		function (msg) {console.log(msg +"No se pudo realizar la conexion");}
		});	
}

function listarComprobantesdepago(){
	$.ajax
		({
		type: "POST",
		url: "Modelo/consultasFormasdePago.php",
		data: {id:9},
		async: false,	
		dataType: "json",		
		success:
		function (msg) 
		{	
			$('#comprobantes').html("");
			$('#comprobantes').html("<h1>Comprobantes</h1>")
			var table = $('<table></table>').addClass('table table-hover');							
			var row=$('<tr></tr>');
			$('#comprobantes').append(ListarTabladeComprobantes(msg, table, row));
			/*EditarActualizarCuentas();
			eliminarcuenta();*/
			/*tcorreo.value=msg[0].email;*/
		},
		error:
		function (msg) {console.log(msg +"No se pudo realizar la conexion");}
		});	
}

function ListarTabladeComprobantes(msg, table, row){			
	row.append($('<td></td>').html("<b>Nombre</b>"));							
	row.append($('<td></td>').html("<b>Apellido</b>"));
	row.append($('<td></td>').html("<b>Telefono</b>"));
	row.append($('<td></td>').html("<b>Correo</b>"));
	row.append($('<td></td>').html("<b>opciones</b>"));
	table.append(row);					
	
	for(i=0; i<msg[0].m; i++){
		var row2 = $('<tr></tr>');
		var fila1 = $('<td></td>').text(msg[i].Nombre);
		var fila2 = $('<td></td>').text(msg[i].Apellido);
		var fila3 = $('<td></td>').text(msg[i].Telefono);
		var fila4 = $('<td></td>').text(msg[i].Correo);
		var fila6 = $('<td></td>').append('<a type="button" class="btn btn-default btn-sm veradjuntos" data-toggle="modal" data-target="#ModalSubirArchivo"  title="Adjuntos" name="'+msg[i].id+'"> <span class="glyphicon glyphicon-paperclip"></span></a>');
	    fila6.append('<a type="button" class="btn btn-default btn-sm editarcomprobante" data-toggle="modal" data-target="#ModificarComprobante"  title="Editar/Modificar" name="'+msg[i].id+'"> <span class="glyphicon glyphicon-pencil"></span></a>');
	    fila6.append('<a type="button" class="btn btn-default btn-sm eliminarcomprobante" data-toggle="modal" data-target="#EliminarComprobante"  title="Eliminar" name="'+msg[i].id+'"> <span class="glyphicon glyphicon-remove"></span></a>');
	    
		row2.append(fila1);
		row2.append(fila2);
		row2.append(fila3);
		row2.append(fila4);									
		row2.append(fila6);									
	    table.append(row2);
	}
	return table;
}

function ListarTabladeAreas(msg, table, row){			
	row.append($('<td></td>').html("<b>Nombre</b>"));
	row.append($('<td></td>').html("<b>opciones</b>"));
	table.append(row);			
	//console.log("Tamano: "+ msg[0].m);
	for(i=0; i<msg[0].m; i++){
	//	console.log(msg[i].id + ": " + msg[i].nombre);
		var row2 = $('<tr></tr>');
		var fila1 = $('<td></td>').text(msg[i].nombre);
		var fila6 = $('<td></td>').append('<a type="button" class="btn btn-default btn-sm editararea" data-toggle="modal" data-target="#EditarArea"  title="Editar/Modificar" name="'+msg[i].id+'"> <span class="glyphicon glyphicon-pencil"></span></a>');
	    fila6.append('<a type="button" class="btn btn-default btn-sm eliminarArea" data-toggle="modal" data-target="#EliminarArea"  title="Eliminar" name="'+msg[i].id+'"> <span class="glyphicon glyphicon-remove"></span></a>');
	    row2.append(fila1);								
		row2.append(fila6);									
	    table.append(row2);
	}
	return table;
}

function EditarActualizarComprobantes(){
	$('a.editarcomprobante').on('click',  function()
	{
		var id=$(this).attr('name');
		alertas2.innerHTML="";
		$.ajax
		({
			type: "POST",
			url: "Modelo/consultasFormasdePago.php",
			data: {id:10, ID:id},
			async: false,
			dataType: "json",
			success:
			function (msg) 
			{
				tnombre.value=msg[0].Nombre;
				tapellido.value=msg[0].Apellido;
				ttelefono.value=msg[0].Telefono;
				tCorreo.value=msg[0].Correo;
				tbanco3.value=msg[0].Banco;
				tConcepto3.value=msg[0].Concepto;
				tnumero.value=msg[0].Nrodecuenta;
				tTipo.value=msg[0].Tipodepago;
				tcomprobante.value=msg[0].NroComprobante;
				tfecha.value=msg[0].Fecha;
				tmonto.value=msg[0].Monto;			
				$("#footermodificarComprobante").html("");
				$("#footermodificarComprobante").append(' <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button> <a class="actualizarcomprobante btn btn-primary" name="'+id+'">Actualizar</a>');
			},
			error:
			function (msg) {console.log( msg +"No se pudo realizar la conexion");}
		});

		$('a.actualizarcomprobante').on('click',  function()
		{
			var id=$(this).attr('name');
			console.log(id+"Actualizar");
			$.ajax
			({
				type: "POST",
				url: "Modelo/consultasFormasdePago.php",
				data: {id:11, ID:id, Nombre:tnombre.value, Apellido:tapellido.value, Telefono:ttelefono.value, Correo:tCorreo.value, Banco:tbanco3.value, Concepto:tConcepto3.value, Numero:tnumero.value, Tipo:tTipo.value, Comprobante:tcomprobante.value, Fecha:tfecha.value, Monto:tmonto.value},
				async: false,
				dataType: "json",
				success:
				function (msg) 
				{
					if(msg=="true")
					{
						alertasComprobante.innerHTML="<div class='alert alert-success'>Se ha Actualizado</div>";
						listarComprobantesdepago();
						EditarActualizarComprobantes();
						eliminarcomprobante();
					}

				},
				error:
				function (msg) {console.log( msg +"No se pudo realizar la conexion");}
			});
		});

	});
}

function eliminarcomprobante(){
	$('a.eliminarcomprobante').on('click',  function(){
		var id=$(this).attr('name');
		$("#footereliminarComprobante").html("");
		$("#footereliminarComprobante").append('<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button> <a class="eliminardefinitivo2c btn btn-primary" name="'+id+'">Borrar</a>');
		$('a.eliminardefinitivo2c').on('click',  function(){	
			var id=$(this).attr('name');
			$.ajax
			({
				type: "POST",
				url: "Modelo/consultasFormasdePago.php",
				data: {id:12, ID:id},
				async: false,
				dataType: "json",
				success:
				function (msg) 
				{
					alertas3c.innerHTML="<div class='alert alert-success'>Se ha eliminado</div>";	
					listarComprobantesdepago();
					EditarActualizarComprobantes();
					eliminarcomprobante();
								},
				error:
				function (msg) {
					console.log( msg +"No se pudo realizar la conexion");}
			});
			$(this).attr("disabled", "true");
		});
	});
}

function VerAdjuntos(){
	$('a.veradjuntos').on('click',  function(){
		var id=$(this).attr('name');
		VaciarFileInput();
		fileupload.action = "server/php/ComprobantesVerAdjuntos.php?id="+id;
		mainInputFile();
	});
}

function VerContenido(){
	
	$('a.vercontenido').on('click',  function(){
		var id=$(this).attr('name');
		VaciarFileInput();
		fileupload.action = "server/php/PortafolioVerAdjuntos.php?id="+id;
		mainInputFile();
	});
}
function VerContenidoFacilitador(){
	$('a.verCV').on('click',  function(){
		var id=$(this).attr('name');
		VaciarFileInput();
		fileupload.action = "server/php/Facilitador.php?id="+id;
		mainInputFile();
	});
}
function VaciarFileInput(){
	// Eliminando visualmente los archivos cargados
	var trs = $('tr.template-download');
	if (typeof trs != "undefined") {
		for(var i = trs.length - 1; i > -1; i--)
		{
		    trs[i].outerHTML = "";
		}
	}
	trs = $('tr.template-upload');
	if (typeof trs != "undefined") {
		for(var i = trs.length - 1; i > -1; i--)
		{
		    trs[i].outerHTML = "";
		}
	}
}


function VisualizarTabladeAreas(){
	$.ajax
	({
		type: "POST",
		url: "Modelo/consultasPortafolio.php",
		data: {id:15},
		async: false,
		dataType: "json",
		success:
		function (msg2) 
		{			
			$('#AreasRegistradas').html("");
			var table = $('<table></table>').addClass('table table-hover');							
			var row=$('<tr></tr>');
			$('#AreasRegistradas').append(ListarTabladeAreas(msg2, table, row));
			EditarArea();
		},
	error:
	function (msg) {
		console.log( msg +"Problema al Listar las areas");}
	});	
}