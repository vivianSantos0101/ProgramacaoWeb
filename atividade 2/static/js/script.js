document.addEventListener('DOMContentLoaded', function() {
    
    const checkboxes = document.querySelectorAll('.task-checkbox');

    checkboxes.forEach(box => {
        box.addEventListener('change', function() {
            const taskId = this.getAttribute('data-id');
            const isCompleted = this.checked;
            const textSpan = this.nextElementSibling; 

            // Atualiza o Visual no Front-end adicionando/removendo a classe CSS
            if (isCompleted) {
                textSpan.classList.add('task-completed');
            } else {
                textSpan.classList.remove('task-completed');
            }

            // Envia para o Back-end
            atualizarTarefaDB(taskId, isCompleted);
        });
    });
});

// Captura o Token de Segurança do Django
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Dispara a atualização para a API
function atualizarTarefaDB(taskId, completedStatus) {
    const url = `/api/tarefas/${taskId}/`;

    fetch(url, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken') 
        },
        body: JSON.stringify({
            completed: completedStatus 
        })
    })
    .then(response => {
        if (!response.ok) {
            console.error("Erro do servidor.");
        }
    })
    .catch(error => {
        console.error('Erro de conexão:', error);
    });
}