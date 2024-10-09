from django.contrib import admin
from .models import Library, Book, Member, BookLoan

admin.site.register(Library)
admin.site.register(Book)
admin.site.register(Member)
admin.site.register(BookLoan)

