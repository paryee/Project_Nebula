from django.db import models
from django.core.validators import MaxValueValidator
from django.utils.text import slugify
from django.urls import reverse
# Create your models here.

class basic_detail(models.Model):
    student_id = models.CharField(max_length=30,unique=True)
    name = models.CharField(max_length=30)
    email = models.EmailField(max_length=255)
    attendance_average = models.DecimalField(max_digits=5, decimal_places=2)
    assignment_completion = models.IntegerField()
    ranking = models.IntegerField()
    cohort = models.CharField(max_length=20)
    slug = models.SlugField(unique=True, allow_unicode=True, blank=True)

    class Meta:
        verbose_name = "Basic Detail"
        verbose_name_plural = "Basic Details"

    # def save(self, *args, **kwargs):
    #     if not self.slug:
    #         self.slug = slugify(self.email)
    #     super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    
    
class weekly_attendance(models.Model):
    student_id = models.ForeignKey(basic_detail,on_delete=models.CASCADE)
    week = models.IntegerField()
    present = models.IntegerField()
    absent = models.IntegerField()

    class Meta:
        verbose_name = "weekly_attendance"
        verbose_name_plural = "weekly_attendance"

    def __str__(self):
        return 'attendance'