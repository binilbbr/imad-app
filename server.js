var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config={
    user:"binilbijumthss",
    database:"binilbijumthss",
    host:"db.imad.hasura-app.io",
    port:"5432",
    password:process.env.DB_PASSWORD
}
var app = express();
app.use(morgan('combined'));

var articles={
    'article-one':{
    title: 'article one',
    heading: '<h1>Article one</h2>',
    content:
    `<p>
        this is article one.this is article one.this is article one.this is article one.this is article one.
        this is article one.this is article one.this is article one.this is article one.this is article one.
    </p>`
    },
    'article-two':{
    title: 'article two',
    heading: '<h1>Article two</h2>',
    content:
    `<p>
        this is article two.
    </p>`
    },
    'article-three':{
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

var counter =0;
app.get('/counter',function(req,res){
    counter =counter +1;
    res.send(counter.toString());
});

var names=[];
app.get('/submit',function(req,res){//submit?name=
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

var pool=new Pool(config);
app.get('/test-db',function(req,res){
    
    pool.query('select * from text',function(err,result){
        if(err){
            res.status('404').send(err.toString());
            
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
        
    });
});

app.get('/articles/:articlename',function(req,res){
    console.log('${req.params.articlename}');
    pool.query("select * from article where title= " + 'req.params.articlename',function(err,result){
         if(err){
            res.status('404').send(err.toString());
            
        }
        else{
            //res.send(JSON.stringify(result.rows));
            if(result.rows.length === 0){
                res.status('500').send("Article not found");
            }
            else{
                //res.send(JSON.stringify(result.rows));
                var data=result.rows[0];
                res.send(createTemplate(data));
            }
        }
        
    });
});
app.get('/:articleName',function(req,res){
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
