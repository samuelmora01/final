const modal = document.getElementById('add');
const form = document.getElementById('formRegister');
const idInput = document.getElementById('idInput');
const nameInput = document.getElementById('nameInput');
const ageInput = document.getElementById('ageInput');
const cityInput = document.getElementById('cityInput');
const emailInput = document.getElementById('emailInput');
const phoneInput = document.getElementById('phoneInput');
const dateInput = document.getElementById('dateInput');
const submitButton = document.getElementById('submitButton');
const tableB = document.getElementById('table_body');
const searchInput = document.getElementById('consulta');  // Caja de búsqueda
const logoutBtn = document.getElementById('logoutBtn');  // Botón de Cerrar sesión

let data = JSON.parse(localStorage.getItem("formData")) || [];
let editIndex = null;

// Mostrar formulario
const show = () => {
    form.style.display = "block";
};

// Cerrar formulario
const close = () => {
    form.style.display = "none";
};

// Agregar nuevo usuario
modal.addEventListener('click', () => {
    show();
    editIndex = null;
    submitButton.textContent = "Agregar";
});

// Función para guardar los datos
const save = () => {
    localStorage.setItem("formData", JSON.stringify(data));
};

// Función para renderizar la tabla
const render = (filter = "") => {
    tableB.innerHTML = ''; // Limpiar tabla
    const filteredData = data.filter(item => {
        return Object.values(item).some(value => value.toString().toLowerCase().includes(filter.toLowerCase()));
    });

    filteredData.forEach((item, index) => {
        const row = document.createElement('tr');
        const idC = document.createElement('td');
        const nameC = document.createElement('td');
        const ageC = document.createElement('td');
        const cityC = document.createElement('td');
        const emailC = document.createElement('td');
        const phoneC = document.createElement('td');
        const dateC = document.createElement('td');
        const action = document.createElement('td');
        const edit = document.createElement('button');
        const deleteI = document.createElement('button');

        idC.textContent = item.doc;
        nameC.textContent = item.name;
        ageC.textContent = item.age;
        cityC.textContent = item.city;
        emailC.textContent = item.email;
        phoneC.textContent = item.phone;
        dateC.textContent = item.date;

        edit.textContent = 'Editar';
        deleteI.textContent = 'Eliminar';

        edit.classList.add('button', 'edit');
        deleteI.classList.add('button', 'delete');

        // Editar usuario
        edit.addEventListener('click', () => editD(index));

        // Eliminar usuario
        deleteI.addEventListener('click', () => deleteData(index));

        action.appendChild(edit);
        action.appendChild(deleteI);

        row.appendChild(idC);
        row.appendChild(nameC);
        row.appendChild(ageC);
        row.appendChild(cityC);
        row.appendChild(emailC);
        row.appendChild(phoneC);
        row.appendChild(dateC);
        row.appendChild(action);

        tableB.appendChild(row);
    });
};

// Editar datos
const editD = (index) => {
    const item = data[index];
    idInput.value = item.doc;
    nameInput.value = item.name;
    ageInput.value = item.age;
    cityInput.value = item.city;
    emailInput.value = item.email;
    phoneInput.value = item.phone;
    dateInput.value = item.date;

    show();
    editIndex = index;
    submitButton.textContent = "Actualizar";
};

// Eliminar datos
const deleteData = (index) => {
    data.splice(index, 1);
    save();
    render();
};

// Agregar o actualizar datos
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const doc = idInput.value;
    const name = nameInput.value;
    const age = ageInput.value;
    const city = cityInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const date = dateInput.value;

    if (doc && name && age && city && email && phone && date) {
        if (editIndex !== null) {
            data[editIndex] = { doc, name, age, city, email, phone, date };
        } else {
            data.push({ doc, name, age, city, email, phone, date });
        }

        save();
        render();
        form.reset();
        close();
    } else {
        alert("Por favor, complete todos los campos.");
    }
});

// Filtrar tabla en tiempo real
searchInput.addEventListener('input', (e) => {
    render(e.target.value);
});

// Cerrar sesión
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('formData');
    window.location.href = 'index.html';  // Redirigir al login
});

// Inicializar la tabla
render();
