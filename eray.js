const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
const generateTemplate = (todo) => {
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="fa-solid fa-trash delete"></i>
        </li>
    `;
    list.innerHTML += html;
};

addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    if (todo.length > 0) {
        generateTemplate(todo);
        addForm.reset();
    }
});
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
});
const filterTodos = (term) => {
    Array.from(list.children).forEach(todo => {
        const text = todo.textContent.toLowerCase();
        if (term === '') {
            todo.classList.remove('filtered'); 
        } else if (text.includes(term)) {
            todo.classList.remove('filtered'); 
        } else {
            todo.classList.add('filtered'); 
        }
    });
};

search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});