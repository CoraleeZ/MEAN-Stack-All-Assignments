 var Born = require('./models')

 module.exports = {


     getAll: (req, res) => {
         console.log('getall')
         Born.find().then(data => res.json(data)).catch(err => res.json(err))
     },

     addNewOne: (req, res) => {
         const NAME = req.params.name;
         console.log(NAME)
         Born.create({ name: NAME }).then(data => res.json(data)).catch(err => res.json(err))
     },


     getOneTask: (req, res) => {
         const NAME = req.params.name;
         Born.findOne({ name: NAME }).then(data => res.json(data)).catch(err => res.json(err))
     },

     delete: (req, res) => {
         const NAME = req.params.name;
         Born.findOneAndDelete({ name: NAME }).then(data => res.json(data)).catch(err => res.json(err))
     }
 }