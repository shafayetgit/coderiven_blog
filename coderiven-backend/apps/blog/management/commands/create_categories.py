from django.core.management.base import BaseCommand
from django.utils.text import slugify

from apps.blog.models import Category


# ❤️ 👍 😃 ﻿✔️ ✅
class Command(BaseCommand):
    help = "To Create Categories"

    def handle(self, *args, **kwargs):
        categories = [
            "Python",
            "Django",
            "Flask",
            "Php",
            "Laravel",
            "Codeigniter",
            "JavaScript",
            "Jquery",
            "Htmx",
            "Linux",
            "SQL",
            "Mysql",
            "Postgesql",
            "AWS",
            "Pynamodb",
        ]

        new_cat = 0
        for cat in categories:
            is_cat_found = Category.objects.filter(name=cat).first()
            if not is_cat_found:
                obj = Category.objects.create(name=cat, slug=slugify(cat))
                print(f"{obj.name} is created! ✅")

                new_cat += 1

        self.stdout.write(f"{new_cat} categories have been created! ❤️")
