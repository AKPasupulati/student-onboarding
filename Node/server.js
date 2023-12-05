const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const upload = multer({ dest: 'uploads/' });

// CORS configuration
var corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect('mongodb+srv://achyuthkumar0010:1tX5VWXZEQH82lSr@cluster0.9a4tmqp.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// User schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: { type: String, default: '' },
  detailsSubmitted: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

// Details schema
const detailsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  country: String,
  courses: String,
  whyTAMUCC: String,
  tenthCertificate: String,
  twelfthCertificate: String,
  bTechCertificate: String,
  covidCertificate: String,
  passport: String,
  ds160Form: String
});

const Details = mongoose.model('Details', detailsSchema);

// User registration route
app.post('/register', async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User login route
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      return res.status(401).json({ message: 'Login failed, user not found.' });
    }

    if (user.password === req.body.password) {
      const details = await Details.findOne({ email: user.username }).exec();

      let isAdmin = false;

            if (user.username === "admin123@gmail.com") {
                isAdmin = true;
            }
      res.status(200).json({ 
        message: "You're logged in",
        detailsSubmitted: !!details,  
        emailUsedForSubmission: details ? details.email : '',
        isAdmin: isAdmin
      });
    } else {
      res.status(401).json({ message: 'Login failed, incorrect password.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error during login.' });
  }
});

// Submission route
app.post('/submit-details', upload.fields([
  { name: 'tenthCertificate', maxCount: 1 },
  { name: 'twelfthCertificate', maxCount: 1 },
  { name: 'bTechCertificate', maxCount: 1 },
  { name: 'covidCertificate', maxCount: 1 },
  { name: 'passport', maxCount: 1 },
  { name: 'ds160Form', maxCount: 1 }
]), async (req, res) => {
  try {
    const details = new Details({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      country: req.body.country,
      courses: req.body.courses,
      whyTAMUCC: req.body.whyTAMUCC,
      tenthCertificate: req.files['tenthCertificate'] ? req.files['tenthCertificate'][0].filename : '',
      twelfthCertificate: req.files['twelfthCertificate'] ? req.files['twelfthCertificate'][0].filename : '',
      bTechCertificate: req.files['bTechCertificate'] ? req.files['bTechCertificate'][0].filename : '',
      covidCertificate: req.files['covidCertificate'] ? req.files['covidCertificate'][0].filename : '',
      passport: req.files['passport'] ? req.files['passport'][0].filename : '',
      ds160Form: req.files['ds160Form'] ? req.files['ds160Form'][0].filename : ''
    });

    await details.save();

    // Update user's submission status
    await User.updateOne({ username: req.body.username }, { $set: { detailsSubmitted: true}});

    res.status(201).send('Details saved successfully');
  } catch (error) {
    console.error('Error saving details:', error);
    res.status(500).send('Error saving details: ' + error.message);
  }
});


app.get('/all-users', async (req, res) => {
  if (!req.isAdmin) {
      return res.status(403).send('Access Denied');
  }

  try {
      const users = await Details.find({}, 'firstName lastName');
      res.json(users);
  } catch (error) {
      res.status(500).send('Server Error');
  }
});

// Endpoint to check if user's details have been submitted
app.get('/check-submission/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const details = await Details.findOne({ email: email });
    if (details) {
      res.json({ detailsSubmitted: true });
    } else {
      res.json({ detailsSubmitted: false });
    }
  } catch (error) {
    res.status(500).send('Error checking submission status.');
  }
});


// Endpoint to get details for a specific user
app.get('/user-details/:firstname', async (req, res) => {
  try {
    const email = req.params.email;
    const userDetails = await Details.findOne({ email: email });
    if (userDetails) {
      res.json(userDetails);
    } else {
      res.status(404).json({ message: 'Details not found for the given email.' });
    }
  } catch (error) {
    res.status(500).send('Error fetching user details.');
  }
});

// Endpoint to get details for all users
app.get('/all-details', async (req, res) => {
  try {
    const allDetails = await Details.find({});
    res.json(allDetails);
  } catch (error) {
    res.status(500).send('Error fetching details for all users.');
  }
});


// Endpoint to get usernames of all users who have submitted details
app.get('/all-usernames', async (req, res) => {
  try {
    const allUsernames = await Details.find({}).select('email -_id'); // select only the email field
    res.json(allUsernames);
  } catch (error) {
    res.status(500).send('Error fetching usernames.');
  }
});


// Endpoint to get details for a specific user by username
app.get('/user-details/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const userDetails = await Details.findOne({ username: username }).exec();
    if (userDetails) {
      res.json(userDetails);
    } else {
      res.status(404).json({ message: 'Details not found for the given username.' });
    }
  } catch (error) {
    res.status(500).send('Error fetching user details:', error);
  }
});


// Endpoint to get details for a specific user by _id
// app.get('/user-details/:id', async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const userDetails = await Details.findById(_id);
//     if (userDetails) {
//       res.json(userDetails);
//     } else {
//       res.status(404).json({ message: 'Details not found for the given ID.' });
//     }
//   } catch (error) {
//     res.status(500).send('Error fetching user details:', error);
//   }
// });


// Replace 'user-details/:id' with 'user-details-by-id/:id' if needed
app.get('/user-details-by-id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const userDetails = await Details.findById(id); // Use findById for MongoDB _id
    if (userDetails) {
      res.json(userDetails);
    } else {
      res.status(404).json({ message: 'Details not found.' });
    }
  } catch (error) {
    res.status(500).send('Error fetching user details:', error);
  }
});








app.listen(port, () => console.log(`Server is running on port ${port}`));
