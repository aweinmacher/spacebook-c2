var posts = [];
var id = 0;

function addPost(id, text) { //adds the fresh post to our data base
    posts.push(
        {
            id: id,
            text: text
        }
    )
    console.log(posts);
}
function renderPosts() { // prepares html <div> for DOM regresh
    $(".posts").empty();
    for (var post in posts) {
        $(".posts").append('<p class="post" data-id="' + posts[post].id + '"><button type="button" class="remove">REMOVE</button> #' + posts[post].id + ' ' + posts[post].text + '</p>');
    }
}
function postPost() { // unites the two functions declared above
    addPost(id, $("#post-name").val());
    renderPosts();
    id++;
    $("#post-name").val("");
}

function removePost() {
    var id = $(this).closest("p").data().id;
    for (var obj in posts) {
        if (posts[obj].id === id) {
            posts.splice(obj, 1);
            break;
        }
    }
    // OR:
    // var arrayPosition = $(this).closest("p").index();
    // posts.splice(arrayPosition, 1);
    console.log(posts);
    renderPosts();
}

$(".add-post").on("click", postPost); // on click adds post to database and screen
$(".posts").on("click", ".remove", removePost);
