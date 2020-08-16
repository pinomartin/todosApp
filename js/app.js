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
    console.log(loggedInLinks)
}

const setupTodos = (data) => {

    if(data.length){
        let html = '';
        data.forEach(doc => {
            const todo = doc.data();
            console.log(todo.titulo)
            const card = `
            <div class="card">
            <div class="card-header">
                <a class="card-link" data-toggle="collapse" href="#collapseOne">
                    ${todo.titulo}
                </a>
            </div>
            <div id="collapseOne" class="collapse" data-parent="#accordion">
                <div class="card-body">
                    ${todo.content}
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