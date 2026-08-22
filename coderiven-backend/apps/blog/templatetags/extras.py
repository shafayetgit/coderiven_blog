from django import template
from django.template.defaultfilters import stringfilter
from django.utils.safestring import mark_safe

import markdown
from readtime import of_text

register = template.Library()

@register.filter(name='user_has_liked_post')
def user_has_liked_post(post, user) -> bool:
    return post.user_has_like(user) 



@register.filter(name='render_markdown', is_safe=True)
@stringfilter
def render_markdown(value) -> str:
    extensions = [
        'extra',
        'abbr',
        'attr_list',
        'def_list',
        'fenced_code', 
        'footnotes',
        'md_in_html',    
        'tables', 
        'admonition',
        'codehilite',
        'legacy_attrs', 
        'legacy_em', 
        'meta',
        'nl2br',
        'sane_lists',
        'smarty',
        'toc', 
        'wikilinks',
    ]

    md = markdown.Markdown(extensions=extensions)

    return mark_safe(md.convert(value))  

@register.filter
def reading_time(text) -> str:
    result = of_text(text)
    return result.text
