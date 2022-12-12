const mongoose = require('mongoose');
const cities = require('./cities');  //import array of cities
const { places, descriptors } = require('./seedHelpers');   //imports the seed helpers
const Campground = require('../models/campground');
const campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const sample = (array) => array[Math.floor(Math.random() * array.length)]
const price = Math.floor(Math.random() * 20) + 10

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const camp = new Campground({
            author: '6357a63f36db5b04791b1017',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: 'A very good camp to take smigion to.A very good camp to take smigion to.A very good camp to take smigion to.A very good camp to take smigion to.',
            price,
            geometry:{
                type: 'Point',
                coordinates:[cities[random1000].longitude, cities[random1000].latitude]
            },
            image: [
                {
                    url: 'https://res.cloudinary.com/djj2nhj8d/image/upload/v1667579986/YelpCamp/lyjqgkdcfv55dgb0m57d.png',
                    filename: 'YelpCamp/lyjqgkdcfv55dgb0m57d',

                },
                {
                    url: 'https://res.cloudinary.com/djj2nhj8d/image/upload/v1667579986/YelpCamp/ekdlkamwgmam5bvohn0r.png',
                    filename: 'YelpCamp/ekdlkamwgmam5bvohn0r',

                },
                {
                    url: 'https://res.cloudinary.com/djj2nhj8d/image/upload/v1667579986/YelpCamp/i4xzfnlthhxwcmpnafmz.gif',
                    filename: 'YelpCamp/i4xzfnlthhxwcmpnafmz',

                }
            ],
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})