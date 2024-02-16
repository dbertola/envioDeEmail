document.addEventListener('DOMContentLoaded',() =>{
    //seleccionar los elementos de la interfaz
    const inputEmail= document.querySelector('#email');
    const inputAsunto= document.querySelector('#asunto');
    const inputMensaje= document.querySelector('#mensaje');
    const formulario= document.querySelector('#enviar-mail');
    const spinner= document.querySelector('#spin');
    const boton= document.querySelector('#enviar');
    const botonReset= document.querySelector('#resetBtn');
    const cc= document.querySelector('#cc');
    const email={
        email:'',
        cc:'',
        asunto:'',
        mensaje:''
    }

    //asignar evento
    inputEmail.addEventListener('input',validar)

    inputAsunto.addEventListener('input',validar)

    inputMensaje.addEventListener('input',validar)

    formulario.addEventListener('submit', enviarEmail);

    cc.addEventListener('input',validar);

    botonReset.addEventListener('click',(e)=>{
        e.preventDefault();
        resetFormulario();
    })

    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        setTimeout(()=>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetFormulario();

            //crear una alerta
            const alertaExito= document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent='El Email fue envia correctamente';
            formulario.appendChild(alertaExito);
            setTimeout(()=>{
                alertaExito.remove();
            },3000)
        },3000)
    }

    function validar(e){
        if( e.target.id==='cc' && e.target.value !== ''){
            if (!validarEmail(e.target.value)){
                mostrarAlerta(`El email no es valido`, e.target.parentElement);
                email[e.target.id]='';
                comprobarEmail();
                return;
            }
        }else{
            if (e.target.id=='cc'){
                limpiarAlerta( e.target.parentElement);
                return;
            }
        }

        if(e.target.value.trim() ==='' && e.target.id!== 'cc'){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`,e.target.parentElement);
            email[e.target.id]='';
            comprobarEmail();
            return;
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta(`El email no es valido`, e.target.parentElement);
            email[e.target.id]='';
            comprobarEmail();
            return;
        }

        limpiarAlerta( e.target.parentElement);
        //asignar valores
        email[e.target.id]= e.target.value.trim().toLowerCase();

        comprobarEmail();
        console.log(e.target);
    }

    function limpiarAlerta(referencia){
        const alerta= referencia.querySelector('.bg-red-600');
        if (alerta){
            alerta.remove();
        }
    }

    function mostrarAlerta(textoAlerta, referencia){
        //comprueva si ya existe una alerta
        limpiarAlerta(referencia);
        //generar alerta html
        const error= document.createElement('P');
        error.textContent=textoAlerta;
        error.classList.add('bg-red-600','text-white','p-2', 'text-center');

        //agregar alerta al formuario
        referencia.appendChild(error);
    }

    function validarEmail(email){
        const regex= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return regex.test(email);
    }

    function comprobarEmail(){
        //copio el objeto y saco el elemento no obligatorio
        camposObligatorios= {...email};
        delete camposObligatorios['cc']
        console.log(camposObligatorios);
        if (Object.values(camposObligatorios).includes('')){
            boton.classList.add('opacity-50','cursor-not-allowed');
            boton.disable=true;
            return;
        }
        //habilitar boton
        boton.classList.remove('opacity-50','cursor-not-allowed');
        boton.disable=false;    
    }

    function resetFormulario(){
        email.email='';
        email.asunto='';
        email.mensaje='';
        email.cc='';
        formulario.reset();
        comprobarEmail();
    }
})