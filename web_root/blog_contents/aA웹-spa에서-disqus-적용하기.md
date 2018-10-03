# [웹] SPA에서 Disqus 적용하기

test

```javascript
this.enableDisqus(
  'myeongjae',
  'blog/2017/09/17/rob-pike의-프로그래밍-규칙-5가지/', // uri as an identifier
  '[기술] Rob Pike의 프로그래밍 규칙 5가지',
  'https://myeongjae.kim/blog/2017/09/17/rob-pike의-프로그래밍-규칙-5가지/'
);
```

```javascript
// Below function is from https://solidfoundationwebdev.com/blog/posts/many-disqus-modules-on-a-single-page
// The function was not work well,
// so I fixed something, and it works well now.

function enableDisqus(shortname, identifier, title, url) {
  if(typeof(DISQUS) === 'undefined'){
    (function() {
      var vars_text = "var disqus_shortname  = \"" + shortname  + "\";\n" + 
        "var disqus_title      = \"" + title      + "\";\n" + 
        "var disqus_identifier = \"" + identifier + "\";\n" +
        "var disqus_url        = \"" + url        + "\";\n";

      var vars_obj   = document.createElement("script");
      vars_obj.type  = "text/javascript";
      vars_obj.async = true;
      vars_obj.text  = vars_text;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(vars_obj);

      var dsq = document.createElement('script');
      dsq.type = 'text/javascript';
      dsq.async = true;
      dsq.src = '//' + shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
  } else {
    // eslint-disable-next-line
    DISQUS.reset({
      reload: true,
      config: function() {
        this.page.identifier = identifier;
        this.page.url = url;
        this.page.title = title;
      }
    });
  }
}
```