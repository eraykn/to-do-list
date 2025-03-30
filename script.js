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
        
        // Loading spinner ekle
        const loadingSpinner = `<svg class="loading-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>`;
        editButton.innerHTML = loadingSpinner;

        setTimeout(() => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            input.className = 'px-2 py-1 border rounded w-full';
            
            input.onkeyup = function(e) {
                if (e.key === 'Enter') {
                    editButton.innerHTML = loadingSpinner;
                    setTimeout(() => {
                        span.textContent = input.value;
                        input.replaceWith(span);
                        editButton.innerHTML = "✎";
                    }, 500);
                }
                if (e.key === 'Escape') {
                    input.replaceWith(span);
                    editButton.innerHTML = "✎";
                }
            };
            
            span.replaceWith(input);
            input.focus();
            editButton.innerHTML = "✎";
        }, 500);
    };

    const deleteButton = document.createElement("button");
    deleteButton.className = "text-red-500 hover:text-red-700 transition-colors duration-200";
    deleteButton.innerHTML = "×";
    deleteButton.onclick = function(e) {
        e.stopPropagation();
        
        // Loading spinner ekle
        const loadingSpinner = `<svg class="loading-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>`;
        deleteButton.innerHTML = loadingSpinner;

        setTimeout(() => {
            li.classList.add('opacity-0', 'translate-y-3');
            setTimeout(() => {
                li.remove();
            }, 300);
        }, 500);
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
