console.log(localStorage)

const signUp = document.getElementById('signUp');
const signIn = document.getElementById('signIn');


signUp.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

  
    const users = JSON.parse(localStorage.getItem('users')) || [];


    const isUserRegister = users.find(user => user.email === email);

    if (isUserRegister) {
        return alert("Ya existe un usuario con ese correo");
    } else {
    
        users.push({ name: name, email: email, password: password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registro exitoso');
        window.location.href = 'crud.html'
    }
});

signIn.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailI = document.getElementById('emailI').value;
    const passwordI = document.getElementById('passwordI').value;


    const users = JSON.parse(localStorage.getItem('users')) || [];


    console.log('Usuarios registrados:', users);
    console.log('Correo ingresado:', emailI);
    console.log('Contraseña ingresada:', passwordI);


    const isUser = users.find(user => user.email === emailI && user.password === passwordI);

    console.log('Usuario encontrado:', isUser);

    if (isUser) {
        window.location.href = 'crud.html'

    } else {
        alert("Usuario o contraseña incorrectos");
    }
});

const registroForm = document.getElementById('registro-form');
const inicioForm = document.getElementById('inicio-form');
const card = document.getElementById('card'); 


const toggleForm = (event) => {
    event.preventDefault(); 


    card.classList.toggle('flip');
};


document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', toggleForm);
});

