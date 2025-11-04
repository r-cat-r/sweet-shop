from django.db import models

class Sweet(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    price = models.FloatField()
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return self.name
