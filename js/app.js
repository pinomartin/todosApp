const todosListUI = document.getElementById('accordion');
const loggedInLinks = document.querySelectorAll('.login-link');
const loggedOutLinks = document.querySelectorAll('.logout-link');

const setupNavUI = (user) => {
    if(user){
        loggedInLinks.forEach(item => {
            item.classList.add('d-block')
        })
        loggedOutLinks.forEach(item => {
            item.classList.add('d-none')
        })
    }else{
        loggedInLinks.forEach(item => {
            item.classList.remove('d-block')
            item.classList.add('d-none')
        })
        loggedOutLinks.forEach(item => {
            item.classList.remove('d-none')
        })
    }
    
}

const setupTodos = (data) => {

    if(data.length){
        let html = '';
        data.forEach((doc,index) => {
            const todo = doc.data();
            console.log(todo)
            console.log(todo.titulo)
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
                        <div class="col-12 col-md-6 text-center-sm">
                            <p>${todo.content}</p>
                        </div>
                        <div class="col-12 col-md-6 text-sm-center text-md-right">
                            <button type="button" class="btn btn-sm btn-success">Terminada</button>
                            <button type="button" class="btn btn-sm btn-warning">Editar</button>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
            `;
        html += card; 
        });
    
        todosListUI.innerHTML = html;
    }else{
        todosListUI.innerHTML = `<h5 class="text-center mt-5">Ingresa para ver tu lista !!</h5>`;
    }

    
}