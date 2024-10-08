from django.db import models

class Library(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    established_date = models.DateField()

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=13, unique=True)  # International Standard Book Number
    genre = models.CharField(max_length=100)
    publication_year = models.IntegerField()
    library = models.ForeignKey(Library, on_delete=models.CASCADE, related_name='books') 
    # Connect to the library, books will be deleted if library is deleted

    def __str__(self):

        return self.title

class Member(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    phone_number = models.CharField(max_length=20)
    membership_date = models.DateField()

    def __str__(self):
        return self.name

class BookLoan(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    loan_date = models.DateField()
    due_date = models.DateField()
    returned_date = models.DateField(null=True, blank=True)  # Allow null for books not returned yet

    def __str__(self):
        return f"{self.book.title} loaned to {self.member.name}"
