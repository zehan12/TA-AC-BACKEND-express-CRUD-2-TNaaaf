var express = require('express');
var router = express.Router();
var Book = require('../models/book');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new',(req,res,next)=>{
  res.render('formPage');
});

router.post('/new',(req,res,next)=>{
  req.body.cateygory = req.body.cateygory.trim().split(" ");
  Book.create( req.body,(err,books)=>{
    console.log(books,"post")
    if(err) return next(err);
    res.redirect('/book/allBooks');
  });
});

router.get('/allBooks',(req,res,next)=>{
  Book.find({},(err,books)=>{
    if(err) return next(err)
    res.render('allBooks',{books})
  })
});

router.get('/bookDetail/:id',(req,res,next)=>{
  var id = req.params.id;
  Book.findById(id,(err,books)=>{
    if(err) return next(err);
    res.render('bookDetails',{books})
  })
})



module.exports = router;



var express = require('express');
var router = express.Router();

var Book = require('../model/book');
var Author = require('../model/author');

var lodash = require('lodash');

// GET new form
router.get('/new', function (req, res) {
  res.render('form');
});

// POST books 
router.post('/', (req, res, next) => {
  Book.create(req.body, (err, book) => {
    if (err) return next(err);
    Author.find({},(err, author) => {
      if (err) return next(err);
      let isExists = author.some(ele => ele.name === req.body.author);
      if(!isExists){
        Author.create({"name":req.body.author, "bookIds":new Array([book._id])},(err, author)=>{
          if (err) return next(err);
          Book.findByIdAndUpdate(book._id, {"authorId":author._id}, (err, book) =>{
            if (err) return next(err);
          res.redirect('/book')
          })
        })
      }else{
        Author.findOneAndUpdate({name:req.body.author},{$push:{bookIds:book._id}}, {new: true}, (err, author)=>{
          if (err) return next(err);
          Book.findByIdAndUpdate(book._id, {"authorId":author._id}, (err, book) =>{
            if (err) return next(err);
          res.redirect('/book')
          })
        })
      }
    })
  });
});

// GET books 
router.get('/', (req, res, next) => {
  Book.find({}).populate('authorId').exec((err, books)=>{
    if (err) return next(err);
    console.log(books);
    res.render('books', {books})
  })
});
// GET books sort by author homepage
router.get('/sortbyauthor',(req, res, next) => {
  Author.find((err, authors) =>{
    res.render('booksbyauthor',{authors});
  })
})

// GET books sort by category homepage
router.get('/sortbycategory',( req, res, next) => {
  Book.find((err, books) =>{
    let categories = books.map(ele=> ele.category)
    let uniqCategories = lodash.uniq(categories);
    res.render('booksbycategory',{uniqCategories})
  })
})

router.get('/sortbycategory/:category',(req, res, next) => {
  let category = req.params.category;
  Book.find({"category":category}).populate('authorId').exec((err, books)=>{
    Book.find((err, innerbooks) =>{
      let categories = innerbooks.map(ele=> ele.category)
      let uniqCategories = lodash.uniq(categories);
      res.render('booksbyeachcategory', {books,uniqCategories});
    })
  })
})

module.exports = router;