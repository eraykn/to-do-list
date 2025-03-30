// Örnek veriler
const sampleTodos = [
    "Morning exercise 🏃‍♂️",
    "Read a book 📚",
    "Team meeting at 2 PM 👥",
    "Complete project tasks 💻",
    "Evening walk 🌅"
];

// Sayfa yüklendiğinde örnek verileri ekle
window.onload = function() {
    sampleTodos.forEach(todo => {
        createTodoElement(todo);
    });
}

function createTodoElement(taskText) {
    const li = document.createElement("li");
    li.className = "flex items-center justify-between p-3 bg-gray-50 rounded-lg opacity-0 transform translate-y-3";
    
    // Animasyon için setTimeout kullanıyoruz
    setTimeout(() => {
        li.classList.remove('opacity-0', 'translate-y-3');
        li.classList.add('transition-all', 'duration-300', 'ease-in-out');
    }, 50);
    
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "flex gap-2";

    const editButton = document.createElement("button");
    editButton.className = "text-blue-500 hover:text-blue-700 transition-colors duration-200";
    editButton.innerHTML = "✎";
    editButton.onclick = function(e) {
        e.stopPropagation();
        const span = li.querySelector('span');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        input.className = 'px-2 py-1 border rounded w-full';
        
        input.onkeyup = function(e) {
            if (e.key === 'Enter') {
                span.textContent = input.value;
                input.replaceWith(span);
            }
            if (e.key === 'Escape') {
                input.replaceWith(span);
            }
        };
        
        input.onblur = function() {
            span.textContent = input.value;
            input.replaceWith(span);
        };
        
        span.replaceWith(input);
        input.focus();
    };

    const deleteButton = document.createElement("button");
    deleteButton.className = "text-red-500 hover:text-red-700 transition-colors duration-200";
    deleteButton.innerHTML = "×";
    deleteButton.onclick = function(e) {
        e.stopPropagation();
        li.classList.add('opacity-0', 'translate-y-3');
        setTimeout(() => {
            li.remove();
        }, 300);
    };

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    li.onclick = function() {
        taskSpan.classList.toggle("completed");
    };

    li.appendChild(taskSpan);
    li.appendChild(buttonContainer);
    document.getElementById("list").appendChild(li);
}

function newElement() {
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTodoElement(taskText);
    taskInput.value = "";
}

// Enter tuşu ile ekleme
document.getElementById("task").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        newElement();
    }
});
