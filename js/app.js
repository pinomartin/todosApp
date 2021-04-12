const todosListUI = document.getElementById('accordion');
const loggedInLinks = document.querySelectorAll('.login-link');
const loggedOutLinks = document.querySelectorAll('.logout-link');
const accountDetails = document.getElementById('detalles-cuenta');
const spinnerLoading = document.getElementById('spinner')

const setupNavUI = (user) => {
    if(user){
        //account data
        db.collection('users').doc(user.uid).get().then(doc=> {
            console.log(doc.data());
            const html = `
            <div class="row">
                 <div class="col-6">
                        <img src="" alt="">
                 </div>
            </div>
            <div class="row">
                    <div class="col-12">
                        <p><small>E-mail: </small>${user.email}</p>
                        <p><small>Nombre: </small>${doc.data().name}</p>
                    </div>
            </div>
            `;
            accountDetails.innerHTML = html;
        });


        loggedInLinks.forEach(item => {item.classList.add('d-block')})
        // loggedOutLinks.forEach(item => { item.classList.add('d-none')})
        
    }else{
        loggedInLinks.forEach(item => {
            item.classList.remove('d-block')
            item.classList.add('d-none')
        })
        // loggedOutLinks.forEach(item => {
        //     item.classList.remove('d-none')
        // })
        accountDetails.innerHTML = '';

    }

    $('#collapsibleNavbar').collapse('hide');
    
}
//display (on, off)
const setupTodos = (data, display) => {

    if(data.length){
        let html = '';
        data.forEach((doc,index) => {
            const todoId = doc.id;
            const todo = doc.data();
            const {titulo,content} = todo;
            const card = `
            <div class="card">
            <div class="card-header justify-content-between">
                <a class="card-link" data-toggle="collapse" href="#collapse${index}">
                
                ${titulo}
                
                <svg width="1em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-down-circle float-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path fill-rule="evenodd" d="M4.646 7.646a.5.5 0 0 1 .708 0L8 10.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
                <path fill-rule="evenodd" d="M8 4.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5z"/>
                </svg>
                </a>
            </div>
            <div id="collapse${index}" class="collapse" data-parent="#accordion">
                <div class="card-body">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-8 text-center-sm text-left-md">
                            <p>${content}</p>
                        </div>
                        <div class="col-12 col-md-4 align-self-center text-right botonera">
                            <button type="button" class="btn btn-sm btn-success" onclick="{deleteTodo('${todoId}')}">OK !</button>
                            <button type="button" class="btn btn-sm btn-warning" onclick="{updateTodo('${todoId}','${titulo}','${content}')}">Edit</button>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
            `;
        html += card; 
        });
    
        todosListUI.innerHTML = html;
       
        // .setAttribute('aria-expanded', 'true');
    }else{
        
    if (display){
        
        let htmldefault = '';
        htmldefault =` 
        <div class="row justify-content-center">
                    <div class="jumbotron bg-transparent">
                        <p class="text-center"><strong>Aqui podras guardar tus notas de manera segura</strong></p>
                        <hr class="my-2">
                        <p class="lead text-center mt-4 mb-3">
                            <a class="btn btn-warning btn-md" href="Jumbo action link" data-toggle="modal" data-target="#modal-login">Ingresá</a>
                        </p>
                        <p class="pt-3 text-right">No tenes cuenta??</p>
                        <p class="text-right">
                            <a class="btn btn-registro btn-sm" href="Jumbo action link" data-toggle="modal" data-target="#modal-registro">Registrate</a>
                        </p>
                    </div>
                </div>
        `;
 
        todosListUI.innerHTML = htmldefault;
        
       
    }
    else{
      

       todosListUI.innerHTML = `
                    <div class="row justify-content-center">
                    <div class="jumbotron text-center">
                        <h5 class"text-center small">Bienvenid@! </h5>
                        <a class="btn btn-registro btn-sm" href="#" data-toggle="modal" data-target="#modal-tarea">Crear mi primera nota</a>
                        <hr class="my-2">
                    </div>
        `;
    }
    
        
        

    }

    
}

const setupLoading = () => {
        todosListUI.innerHTML = `<img src="img/spinner.svg" id="spinner" class="img-fluid" alt="">`;
}