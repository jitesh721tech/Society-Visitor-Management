from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = (
        ("resident", "Resident"),
        ("guard", "Guard"),
        ("admin", "Admin"),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="resident")
    phone = models.CharField(max_length=15, blank=True)
    full_name = models.CharField(max_length=150, blank=True)

    def __str__(self):
        return self.username
