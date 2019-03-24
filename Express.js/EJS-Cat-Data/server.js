var express = require("express");
var app = express();
app.use(express.static(__dirname + '/statics'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/cat', function(request, respond) {
    respond.render('cat')
});

app.get('/cat1', function(request, respond) {
    var info = [{

        name: 'cat1',
        food: 'fish',
        age: 1,
        spot: ['under bed', 'on the bed', 'under the table']
    }]
    console.log(info)
    respond.render('detail', { 'info': info })
});

app.get('/cat2', function(request, respond) {
    var info = [{

        name: 'cat2',
        food: 'fish*2',
        age: 2,
        spot: ['under bed*2', 'on the bed', 'under the table']
    }]
    respond.render('detail', { 'info': info })
});
app.get('/cat3', function(request, respond) {
    var info = [{

        name: 'cat3',
        food: 'fish*3',
        age: 3,
        spot: ['under bed*3', 'on the bed', 'under the table']
    }]
    respond.render('detail', { 'info': info })
});
app.get('/cat4', function(request, respond) {
    var info = [{

        name: 'cat4',
        food: 'fish*4',
        age: 4,
        spot: ['under bed*4', 'on the bed', 'under the table']
    }]
    respond.render('detail', { 'info': info })

});


app.listen(8000)