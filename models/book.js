var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        
      },
      author: {
        type: String,
        required: true,
        
      },
      description: {
        type: String,
        required: true,
        
      },
      published_date:{
          type: Date,
          default: Date.now
      },

      publisher: {
        type: String,
        required: true,
      },
      update_date:{
        type: Date,
        default: Date.now
    }
    });

module.exports= mongoose.model('Book', bookSchema);