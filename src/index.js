const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json())

app.post('/users', async(req, res) => {
    try{
    const user = new User(req.body)

   const saved = await user.save();
   res.status(201).json({data: saved});
    }catch (e) {
        res.send(e)
    }
})

app.get('/users', async(req, res) => {
    try{
   const user =  await User.find({});
   res.status(200).json({data: user});
    }catch(e){
        res.status(400).send(e);
    }
})

app.patch('/users/:id', async(req,res) => {
    try {
        const id = req.params.id;

        const users = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(200).json({data: users});
    } catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
})
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.json({data:user})
    } catch (e) {
        res.status(500).send()
    }
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})