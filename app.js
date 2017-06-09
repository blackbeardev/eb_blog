var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/blog_app");

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test blog",
//     image: "http://timesofindia.indiatimes.com//thumb/msid-51891612,width-400,resizemode-4/51891612.jpg",
//     body: "This is the test blog for the node.js blog app."
// }, function(err, newlyCreated) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(newlyCreated);
//     }
// });

//===========================================================================
//ROUTES
//===========================================================================

//INDEX route
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, allBlogs) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {blogs: allBlogs});
        }
    });
});

//NEW route
app.get("/blogs/new", function(req, res) {
    res.render("new");
});


//CREATE route
app.post("/blogs", function(req, res) {

    Blog.create(req.body.blog, function(err, newlyCreated) {
        if(err) {
            console.log(err)
        } else {
            res.redirect("/blogs");
        }
    });
});

//SHOW route
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundPost) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {blog: foundPost});
        }
    });
});

//EDIT route
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundPost) {
        if(err) {
            console.log(err);
        } else {
            res.render("edit", {blog: foundPost});
        }
    });
});

//UPDATE route
app.post("/blogs/:id", function(req, res) {
    res.send("Update route");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server has started..");
});