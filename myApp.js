const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI; // Access the MongoDB URI

//Connect to MongoDB
  mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


const Schema = mongoose.Schema;
const personSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  age:{
    type: Number
  },
  favoriteFoods:{
    type: [String]
  }
});

//create a model
const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const Donald = new Person({
    name: "Donald Udofia", age: 39, 
    favoriteFoods: ["Soup", "Bread", "Fish"]
  });
  Donald.save(function(err, data){
    if (err) return console.log(err);
    done(null,  data)
  });
};

const arrayOfPeople = [
  {name: "Yakebo", age: 32, "favoriteFood": ["Garry and Afang soup","Rice","Meat"]},
  {name: "Uduak", age: 20, "favoriteFood": ["Vergitable soup", "Rice","beams"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people){
    if (err) return console.log(err);
    done(null , people);
  });
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, function(err, data){
    if (err) return console.log(err);
    done(null, data);
  });
 
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, function(err, data){
    if (err) return console.log(err);
    done(null, data);
  });

};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data){
    if (err) return console.log(err);
    done(null, data);
  });
  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};
    

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:20},{new:true},  (err, updatedDoc)=>{
    if(err) return console.log(err);
    done(null, updatedDoc);

  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc)=>{
    if (err) return console.log(err);
    done(null, removedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, removedDocs)=>{
    if (err) return console.log(err);
    done(null, removedDocs);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })

    .sort({name: 1 })  // Sort by name in ascending order
    .limit(2)  // Limit to two documents
    .select('-age')  // Hide the age field
    .exec((err, data) => {
      if (err) {
        return done(err);
      }
      done(null, data);
    });
};
  

/** **Well Done !!**
/* You completed these challenges, let's go celebrate ! */
//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
