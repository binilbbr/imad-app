var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
    'articleOne':{
    title: 'article one',
    heading: '<h1>Article one</h2>',
    content:
    `<p>
        this is article one.this is article one.this is article one.this is article one.this is article one.
        this is article one.this is article one.this is article one.this is article one.this is article one.
    </p>`
    },
    'articleTwo':{
    title: 'article two',
    heading: '<h1>Article two</h2>',
    content:
    `<p>
        this is article two.
    </p>`
    },
    'articleThree':{
    title: 'article three',
    heading: '<h1>Article three</h2>',
    content:
    `<p>
        this is article three.
    </p>`
    }
};

function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    var htmlTemplate=
    `
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
    <div class="container">
    <div>
        <a href="/"><h3>Home</h3></a>
    </div>        
    <hr>
    ${heading}
    ${content}
     </div>
    </body>
    </html>
    `;   
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName',function(req,res){
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/article-two',function(req,res){
    res.send(createTemplate(articleTwo));
});

app.get('/article-three',function(req,res){
    res.send(createTemplate(articleThree));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
