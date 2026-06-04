from django.db import models

class Task(models.Model):
    # filtro de categoria
    CATEGORY_CHOICES = [
        ('estudos', 'Estudos'),
        ('trabalho', 'Trabalho'),
        ('casa', 'Casa'),
    ]

    title = models.CharField(max_length=200, verbose_name="Título")
    category = models.CharField(
        max_length=20, 
        choices=CATEGORY_CHOICES, 
        default='casa',
        verbose_name="Categoria"
    )
    completed = models.BooleanField(default=False, verbose_name="Concluída")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at'] # As mais recentes aparecem primeiro

    def __str__(self):
        return f"{self.title} ({self.category})"