from django.core.management.base import BaseCommand, CommandParser
from django.utils.text import slugify
from faker import Faker

import random

from apps.blog import models

# ❤️ 👍 😃 ﻿✔️ ✅
class Command(BaseCommand):
    help = 'To create posts'

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument('total', type=int, help='Enter the number of posts.')
    
    def handle(self, *args, **kwargs):
        faker = Faker()
        total = kwargs['total']

        categories = list(models.Category.objects.values_list('id', flat=True))
        tags = list(models.Tag.objects.values_list('id', flat=True))

        count = 0
          
        for _ in range(total):
            random.shuffle(categories)
            random.shuffle(tags)

            title = faker.unique.text(max_nb_chars=random.randint(150, 200))
            slug = slugify(title)
            summary = faker.texts(nb_texts=3)
            content = faker.texts(nb_texts=random.randint(30, 40))
            category = models.Category.objects.get(pk=categories[0])
            tags = tags[:3]

            post = models.Post.objects.create(
                title=title,
                slug=slug,
                summary=summary,
                content=content,
                category=category,
            )
            post.tags.set(tags)

            count += 1
            self.stdout.write(f'{count} post has been created! ✅')
        
        self.stdout.write(f'{count} posts have been created! ❤️')
        

        
