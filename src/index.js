const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override')

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');



app.use(express.static('public'));

app.use(
    express.urlencoded({
      //Express từ 4.16 đã tích hợp sẵn body-parser. Bản thân body-parser lại sử dụng qs, ví dụ từ các cú pháp a=c sẽ path ra dạng key là a và value là c, nhận đầu vào là form-data và đầu ra là body
      extended: true,
    }),
  ); //Submit qua HTML dưới các dạng form
app.use(express.json()); //Submit qua các thư viện ví dụ XMLHttpRequest, fetch, axios...

db.connect();

app.use(morgan('combined'));

app.engine(
    'hbs',
    handlebars({
      extname: '.hbs',
      helpers: {
        sum: (a,b) => a + b
    }
    }),
  );

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); //Tự path sẽ điền dấu /, ví dụ resources/views

app.use(cookieParser());
app.use(methodOverride('_method'));

route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})