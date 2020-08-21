
//Listener de state Changes (recibe un usuario que esta activo , si el usuario no esta logeado devuelve null)
auth.onAuthStateChanged( user => {
    if(user){
        //Getter de la Coleccion en Firestore
        db.collection('todos').where("userId","==",user.uid).onSnapshot(snapshot => {
            if(snapshot.docs === []){
                setupTodos(snapshot.docs,true)
            }
            setupTodos(snapshot.docs,false);
            setupNavUI(user);
        }, err => { console.log(err.message)})

    }else{
        setupNavUI();
        setupTodos([],true);
        console.log('Usuario salio')
    }
})




//Registro(SignUp)
const registroForm = document.getElementById('form-registro');
registroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = registroForm['signup-email'].value;
    const password = registroForm['signup-password'].value;
    const username = registroForm['signup-name'].value;
    

    //Registrar al usuario
    auth.createUserWithEmailAndPassword(email, password).then( cred => {
        const delay = async () => {
            return await db.collection('users').doc(cred.user.uid).set({
                name: username
            })
        }
        delay();
        
    }).then( () => {
        $('#modal-registro').modal('hide');
        registroForm.reset();
    })
});

//Salir(Logout)
const logout = document.querySelector('#logout');

logout.addEventListener('click', (e) => {
    e.preventDefault();

    auth.signOut();
});

//Entrar (Login)
const loginForm = document.querySelector('#form-login');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Obtener datos del usuario
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email,password).then( credencial => {
        console.log(credencial.user);
        $('#modal-login').modal('hide');
        loginForm.reset();
    })
    

})

//Agregar Todo's
const addTodoForm = document.getElementById('form-tarea');
addTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //Datos/Id del usuario activo
    const user = auth.currentUser;
    const loggedInUserId = user.uid;
    
    db.collection('todos').add({
        content : addTodoForm['contenido'].value,
        titulo : addTodoForm['titulo-tarea'].value,
        userId: loggedInUserId
    }).then(() => {
        //Cierra modal y resetea form
        console.log(addTodoForm['titulo-tarea'].value)
        $('#modal-tarea').modal('hide');
        addTodoForm.reset();
    }).catch(err => {
        console.log(err.message);
    })
})