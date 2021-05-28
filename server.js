const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
var cors = require('cors')

const app = express();

//CONNECT DATABASE
connectDB();

//INIT MIDDLEWARE
app.use(express.json({ extended:false }));
app.use(cors());

var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });


app.get('/', (req, res) => res.send('API Running'));

//DEFINE ROUTES
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/activity', require('./routes/api/activity'));

// //SERVE STATIC ASSETS IN PRODUCTION
// if(process.env.NODE_ENV === 'production'){
//     //set static folder
//     app.use(express.static('client/build'));

//     app.get('*', (req,res)=> {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));