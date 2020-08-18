const todosListUI = document.getElementById('accordion');
const loggedInLinks = document.querySelectorAll('.login-link');
const loggedOutLinks = document.querySelectorAll('.logout-link');
const accountDetails = document.getElementById('detalles-cuenta');

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
        loggedOutLinks.forEach(item => { item.classList.add('d-none')})
        
    }else{
        loggedInLinks.forEach(item => {
            item.classList.remove('d-block')
            item.classList.add('d-none')
        })
        loggedOutLinks.forEach(item => {
            item.classList.remove('d-none')
        })
        accountDetails.innerHTML = '';

    }

    $('#collapsibleNavbar').collapse('hide');
    
}

const setupTodos = (data) => {

    if(data.length){
        let html = '';
        data.forEach((doc,index) => {
            const todo = doc.data();
            const card = `
            <div class="card">
            <div class="card-header">
                <a class="card-link" data-toggle="collapse" href="#collapse${index}">
                    ${todo.titulo}
                </a>
            </div>
            <div id="collapse${index}" class="collapse" data-parent="#accordion">
                <div class="card-body">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-8 text-center-sm text-left-md">
                            <p>${todo.content}</p>
                        </div>
                        <div class="col-12 col-md-4 align-self-center text-right botonera">
                            <button type="button" class="btn btn-sm btn-success">OK !</button>
                            <button type="button" class="btn btn-sm btn-warning">Edit</button>
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
        todosListUI.innerHTML = `<h5 class="text-center mt-5">Ingresa para ver tu lista !!</h5>`;
    }

    
}