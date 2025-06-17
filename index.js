const express = require('express');
const app = express();
require('dotenv').config(); // ⬅️ load .env


const mongoose = require('mongoose');

// Replace with your actual MongoDB URI from MongoDB Atlas
const mongoURI =  process.env.MONGO_URI

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const User = require('./models/User');

app.use(express.json());

//default route
app.get('/',(req,res)=>{
    req.send('Hello World');
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// about route

app.get('/about', (req, res) => {
    res.send('About Page');
});


app.post('/api/users', async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ error: 'Name is required' });
  
      const newUser = new User({ name });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  //get data

  app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  // get user by id

  app.get('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });


  //update user by id

  app.put('/api/users/:id', async (req, res) => {
    try {
      const { name } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User updated', user: updatedUser });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  

  //delete user

  app.delete('/api/users/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  
  
  




// //contact route

// app.get('/contact', (req, res) => {
//     res.send('Contact Page');
// } );

// // json data pass

// // Correct API response
// app.get('/api/users', (req, res) => {
//     res.json(users); // This will now work
//   });

//   app.use(express.json()); // Middleware to parse JSON bodies

//   app.post('/api/users', (req, res) => {
//     const newUser = req.body; // Assuming the user data is sent in the request body
//     if(!newUser || !newUser.name) {
//       return res.status(400).json({ error: 'Name is required' });
//     }
//     console.log(newUser);

//     res.status(201).json({
//          message: 'User created successfully', user: newUser 
//         });
//   } );

//   let users = [
//     { id: 1, name: 'Vipin' },
//     { id: 2, name: 'Aman' },
//     { id: 3, name: 'Neha' }
//   ];

//   //get user by id
//   app.get('/api/users/:id',(req,res)=>{
//     const id =parseInt(req.params.id)
//     const user =users.find(u=>u.id === id);

//     if(!user){
//         return res.status(404).json({error:'User not found'});
//     }

//     res.json(user);

//   })

//   // post add user

//   app.post('/api/users',(req,res)=>{
//     const {name} =req.body;

//     if(!name){
//         return res.status(400).json({error:'Name is required'});
//     }
//     const newUser ={
//         id:users.length +1,
//         name
//     };

//     users.push(newUser);
//     res.status(201).json(newUser);

//   })

//   // update user

//   app.put('/api/users/:id',(req,res)=>{
//     const id =parseInt(req.params.id);
//     const {name} =req.body;
//     const user =users.find(u=>u.id === id);
//     if(!user){
//         return res.status(404).json({error:'User not found'});
//     } 
//     if(!name){
//         return res.status(400).json({error:'Name is required'});
//     }  
//         user.name =name;
//         res.json({ message: 'User updated', user });
//       })


//  // delete user
 
//  app.delete('/api/users/:id',(req,res)=>{
//     const id =parseInt(req.params.id);
//     const userIndex =users.findIndex(u=>u.id === id);
//     if(userIndex === -1){
//         return res.status(404).json({error:'User not found'});
//     }
//     const deletedUser =users.splice(userIndex,1);
//     res.json({message:'User deleted',user:deletedUser});
//  });