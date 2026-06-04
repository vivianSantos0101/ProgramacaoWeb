document.addEventListener('DOMContentLoaded', function() {
    
    // LÓGICA DOS CHECKBOXES
    const checkboxes = document.querySelectorAll('.task-checkbox');

    checkboxes.forEach(box => {
        box.addEventListener('change', function() {
            const taskId = this.getAttribute('data-id');
            const isCompleted = this.checked;
            const textSpan = this.nextElementSibling; 
            const confirmBtn = document.getElementById(`confirm-${taskId}`);

            // Atualiza o Visual no Front-end adicionando
            if (isCompleted) {
                textSpan.classList.add('task-completed');
                // Mostra o botão de confirmar se ele existir (na aba de pendentes)
                if (confirmBtn) {
                    confirmBtn.style.display = 'inline-block';
                }
            } else {
                textSpan.classList.remove('task-completed');
                // Esconde o botão de confirmar se o usuário desmarcar
                if (confirmBtn) {
                    confirmBtn.style.display = 'none';
                }
            }
        });
    });

   // 2. LÓGICA DO BOTÃO DE CONFIRMAR
    const confirmButtons = document.querySelectorAll('.btn-confirm');
    
    confirmButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); 
            const taskId = this.id.replace('confirm-', '');
            
            // Avisa no console que o clique funcionou
            console.log(`Tentando confirmar a tarefa ID: ${taskId}`);
            
            atualizarTarefaDB(taskId, true).then(sucesso => {
                if (sucesso) {
                    window.location.reload(); // Deu certo, recarrega a página!
                } else {
                    alert("Ops! Falha ao confirmar. Aperte F12 e olhe a aba 'Console' para ver o erro.");
                }
            });
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
// Dispara a atualização para a API (Versão com Debugging)
function atualizarTarefaDB(taskId, completedStatus) {
    const url = `/api/tarefas/${taskId}/`; 
    // DICA: Se o erro no console for 404, tente mudar a linha acima para:
    // const url = `/api/api/tarefas/${taskId}/`;

    return fetch(url, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken') 
        },
        body: JSON.stringify({ completed: completedStatus })
    })
    .then(async response => {
        if (!response.ok) {
            const erroTexto = await response.text();
            console.error(`Erro ${response.status} do servidor:`, erroTexto);
            return false;
        }
        return true; 
    })
    .catch(error => {
        console.error('Erro de conexão (o servidor pode estar desligado):', error);
        return false;
    });
}