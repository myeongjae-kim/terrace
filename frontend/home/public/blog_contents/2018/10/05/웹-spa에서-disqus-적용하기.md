# [웹] SPA에서 Disqus 적용하기

Single Page App(SPA)에서 Disqus를 적용해보면 글이 바뀌더라도 처음 로딩한 코멘트가 바뀌지 않고 그대로 있는 것을 볼 수 있습니다. 아래의 함수를 글이 바뀔 때마다 호출해야 합니다.

```javascript
// Below function is from https://solidfoundationwebdev.com/blog/posts/many-disqus-modules-on-a-single-page
// The function did not work well,
// so I have fixed something, and it works well now.

function initDisqus(shortname, identifier, title, url) {
  if(typeof(DISQUS) === 'undefined'){
    (async () => {
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

글을 로딩할 때마다 아래처럼 함수를 호출합니다.

```javascript
this.initDisqus(
  'myeongjae',
  'blog/2017/09/17/rob-pike의-프로그래밍-규칙-5가지/', // uri as an identifier
  '[기술] Rob Pike의 프로그래밍 규칙 5가지',
  'https://myeongjae.kim/blog/2017/09/17/rob-pike의-프로그래밍-규칙-5가지/'
);
```