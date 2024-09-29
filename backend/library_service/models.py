from django.db import models

class Library(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    established_date = models.DateField()

    def __str__(self):
        return self.name