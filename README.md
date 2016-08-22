# Router #
A router for SAP project, depend  on jquery.

# Use #
```javascript
    router.config(function(state){
        state
            .when('hello', {
                templateUrl: 'tpl/hello.html',
                cb: function(state){
                    //state: current router name
                    console.log(state) 
                    //'hello'
                }
            })
            .when('name', {
                templateUrl: 'tpl/name.html',
                cb: function(state){}
            })
            .when('go', {
                templateUrl: 'tpl/go.html',
                cb: function(state){}
            })
            .when('test', {
                template: '<h2>Test!</h2>',
                cb: function(state){}
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
