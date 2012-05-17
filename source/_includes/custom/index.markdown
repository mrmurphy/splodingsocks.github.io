
<img class="homepage-image" src="/images/biopic_small.png" alt="A small picture of Murphy." no-frame="true"/>

#### I'm Murphy, a technical artist finishing an Animation BFA at Brigham Young University.

I specialize in developing technology for animation. My past experiences include Render TD on **Cars 2** at Pixar, pipeline development on four BYU Senior films, and freelance graphics / animation.

- - - 

###Hot off the presses:
<div id="blog-archives">
{% for post in site.posts reverse %}
{% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
{% unless year == this_year %}
  {% assign year = this_year %}
  <h2>{{ year }}</h2>
{% endunless %}
<article>
  {% include archive_post.html %}
</article>
{% endfor %}
</div>
