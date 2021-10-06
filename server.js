const { json, urlencoded } = require('express');
const express = require('express');
const cors = require('cors');
const knex = require('knex');

const app = express();

app.use(urlencoded({type:false}));

app.use(json());

app.use(cors());

const pgdb = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'Vin@1234$',
      database : 'test'
    }
  });



app.get('/', (req, res) => {
    res.send("It works 8, goto vnyc.ml");
});

app.get('/getall', (req, res) => {
    pgdb('vnyc').then(data => {
        res.json(data);
    });
});

app.get('/getall', (req, res) => {
    const { id } = req.params;
    pgdb('vnyc')
      .then(data => {
        if (data.length) {
          res.json(data)
        } else {
          res.status(400).json('Not found')
        }
      })
      .catch(err => res.status(400).json('error getting user'))
  });


app.put('/putdata', (req, res) => {
    var body = req.body;
        pgdb('vnyc')
        .where({head:body.head, type:body.type})
        .update({
            title:body.title,
            subtitle:body.subtitle,
            para1:body.para1,
            para2:body.para2,
            image:body.image,
            icon:body.icon,
            url:body.url
        }, ['*']).then(data => {
            res.send(data);
        });
});

app.post('/postdata', (req, res) => {
    var body = req.body;
        pgdb('vnyc')
        .insert({
            id:body.id,
            head:body.head,
            type:body.type,
            title:body.title,
            subtitle:body.subtitle,
            para1:body.para1,
            para2:body.para2,
            image:body.image,
            icon:body.icon,
            url:body.url
        }, ['*']).then(data => {
            res.send(data);
        });
});

app.get('/getdata', (req, res) => {
    var head = req.query.head;
    var type = req.query.type;
    if (type == "*") {
        var que = {head:head};
      } else {
        var que = {head:head,type:type};
      }
    pgdb('vnyc')
        .where(que)
        .then(data => {
            res.json(data)
        });
});

// app.get('/profiledata', (req, res) => {
//     var profiledata = db.data[0];
//     res.json(profiledata);
// });

// app.get('/selfdata', (req, res) => {
//     var selfdata = db.data[1];
//     res.json(selfdata);
// });

// app.get('/education', (req, res) => {
//     var education = db;
//     res.json(education);
// });

// app.get('/skills', (req, res) => {
//     var skills = db;
//     res.json(skills);
// });

// app.get('/experiences', (req, res) => {
//     var experience = db;
//     res.json(experience);
// });

// app.get('/projects', (req, res) => {
//     var projects = db;
//     res.json(projects);
// })

// app.get('/courses', (req, res) => {
//     var courses = db;
//     res.json(courses);
// });

// app.get('/activities',(req, res) => {
//     var activities = db;
//     res.json(activities);
// });



app.listen(process.env.PORT || 5000);