import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

// Index
app.get("/", (req, res) => {
    res.render("index.ejs", {data: data} );
    console.log(data)
});

// View post
app.get("/view/:postId", (req, res) => {
    var postId = req.params.postId;
    res.render("view.ejs", {data: data[postId], position: postId});
});

// Delete post
app.post("/delete", (req, res) => {
    var postId = req.body["postId"];
    data.splice(postId, 1);
    res.redirect("/");
});

// Update post
app.get("/edit/:postId", (req, res) => {
    var postId = req.params["postId"];
    res.render("edit.ejs", {data: data[postId], position: postId});
});

app.post("/edit", (req, res) => {
    var postId = req.body["postId"];
    var title = req.body["title"];
    var content = req.body["content"];
    data[postId].title = title;
    data[postId].content = content;
    res.redirect("/");
});

// Create new post page
app.get("/create", (req, res) => {
    res.render("create.ejs");
});

// save new post
app.post("/save", (req, res) => {
    var title = req.body["title"];
    var content = req.body["content"];
    var newData = {
        time: formatTime(),
        title: title,
        content: content,
    };
    data.push(newData);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

var data = [
    {
        time: formatTime(),
        title: "Article title",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, quam reprehenderit autem similique rem alias ut tempora, totam eveniet sint doloribus libero sapiente corrupti debitis nostrum impedit ullam neque magnam?",
    },
    {
        time: formatTime(),
        title: "Some random article title Lorem ipsum dolor sit amet.",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, quam reprehenderit autem similique rem alias ut tempora, totam eveniet sint doloribus libero sapiente corrupti debitis nostrum impedit ullam neque magnam?",
    },
];

function formatTime() {
    var date = new Date();
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ", " + date.getHours() + ":" + date.getMinutes();}