# Router #
A router for SAP project, depend  on jQuery.

# Use #
```javascript
    router.config(function(state){
        state
            .when('hello', {
                templateUrl: 'tpl/hello.html',
                cb: function(){}
            })
            .when('name', {
                templateUrl: 'tpl/name.html',
                cb: function(){}
            })
            .when('go', {
                templateUrl: 'tpl/go.html',
                cb: function(){}
            })
            .when('test', {
                template: '<h2>Test!</h2>',
                cb: function(){}
            })
            .other('test');
    })

    //default: '#'
    router.setHashMode('#!');

    $('button').on('click', function(){
        router.go('go');
    })

    //html
    <a state="hello">hello</a>

    //Show the view
    <RouterView></RouterView>

```
