function validarFomulario(){
    var nombre = document.getElementById("nombre").value;

    if (nombre === ""){
        alert("Por favor, ingresa tu nombre.")
        return false
    }
    alert("Formulario eviado con exito")
    return true
}

document.getElementById("cambiarColor").onclick = function() {
    var titulo = document.getElementById("titulo"); 
    titulo.style.color = titulo.style.color == 'red' ? '#4CAF50': 'red';
}