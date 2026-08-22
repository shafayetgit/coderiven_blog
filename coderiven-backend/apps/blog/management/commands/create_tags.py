from django.core.management.base import BaseCommand
from django.utils.text import slugify

from apps.blog.models import Tag
# ❤️ 👍 😃 ﻿✔️ ✅
class Command(BaseCommand):
    help = 'To create tags'

    def handle(self, *args, **kwargs):
        tags = [
            'Python',
            'Django',
            'Flask', 
            'Php',
            'Laravel',
            'Codeigniter',
            'JavaScript',
            'Jquery',
            'Htmx',
            'Linux',
            'SQL',
            'Mysql',
            'Postgesql',
            'AWS',
            'Pynamodb'
        ]

        new_tag = 0
        for tag in tags:
            is_tag_found = Tag.objects.filter(name=tag).first()
            if not is_tag_found:
                obj = Tag.objects.create(name=tag.lower(), slug=slugify(tag))
                print(f'{obj.name} is created! ✅')
                new_tag += 1

        self.stdout.write(f'{new_tag} tags have been created! ❤️')