# Router #
A router for SAP project, depend  on jQuery.

# Use #
```javascript
    router
        .state('/hello', {
            templateUrl: 'tpl/hello.html',
            cb: function(){}
        })
        .state('/name', {
            templateUrl: 'tpl/name.html',
            cb: function(){}
        })
        .state('/go', {
            templateUrl: 'tpl/go.html',
            cb: function(){}
        })
        .state('/test', {
            template: '<div>Test!</div>',
            cb: function(){}
        })

    router.on('routerChanged', function(e, parms){
        // console.log(e)
        console.log(parms)
    })

    //default: '#'
    router.setHashMode('#!');

    $('button').on('click', function(){
        router.go('/go');
    })

    //html
    <a href="#/hello">hello</a>

```
