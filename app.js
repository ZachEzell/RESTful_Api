const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(
  'mongodb://TwitchMaster:a3bbhh5w3@ds149724.mlab.com:49724/twitchybuilder'
);

// SCHEMA

const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//   {
//     name: 'Salmon Creek',
//     image: 'http://www.photosforclass.com/download/8137270056',
//     description: 'This is a creek with some salmon in it'
//   },
//   (err, campground) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Campground created');
//     }
//   }
// );

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
var campgrounds = [
  {
    name: 'Salmon Creek',
    image: 'http://www.photosforclass.com/download/8137270056'
  },
  {
    name: 'Granite HIll',
    image: 'https://farm4.staticflickr.com/3011/2997488895_4c458dca1d.jpg'
  },
  {
    name: 'Granite HIll',
    image: 'https://farm4.staticflickr.com/3247/2997486559_876fc019c2.jpg'
  },
  {
    name: 'Salmon Creek',
    image: 'http://www.photosforclass.com/download/8137270056'
  },
  {
    name: 'Granite HIll',
    image: 'https://farm4.staticflickr.com/3011/2997488895_4c458dca1d.jpg'
  },
  {
    name: 'Granite HIll',
    image: 'https://farm4.staticflickr.com/3247/2997486559_876fc019c2.jpg'
  }
];
app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  // Get all campgrounds
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      console.log('all campgrounds found');
      res.render('index', { campgrounds: allCampgrounds });
    }
  });
  //   res.render('campgrounds', { campgrounds: campgrounds });
});
// RESTful api. A campground should have a campground post
// post will be adding something to our api
app.post('/campgrounds', (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  //   campgrounds.push(newCampground);
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log('could not create a new document');
    } else {
      console.log('new campground created');
      res.redirect('/campgrounds');
    }
  });
});

// this will send data to post
app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});

app.get('/campgrounds/:id', (req, res) => {
  res.render('show');
});
app.listen(process.env.PORT || 5000, process.env.IP, () => {
  'the server has started';
});
