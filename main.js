var posts = [];
var id = 0;

function addPost(id, text) { //adds the fresh post to our data base
    posts.push(
        {
            id: id,
            text: text,
            comments: []
        }
    )
    console.log(posts);
}
function renderPosts() { // prepares html <div> for DOM regresh
    $(".posts").empty();
    for (var post in posts) {
        $(".posts").append('<p class="post" data-id="' + posts[post].id + '"><button type="button" class="remove">REMOVE</button> #' + posts[post].id + ' ' + posts[post].text + '</p><ul class="comments"></ul><form><input type="text" class="user-name" placeholder="name"><input type="text" class="comment" placeholder="comment"><button type="button" class="add-comment">Comment</button></form><br>');
    }
}
function postPost() { // unites the two functions declared above
    addPost(id, $("#post-name").val());
    renderPosts();
    id++;
    //var com_id = 0;
    $("#post-name").val("");
}
function removePost() { // removes post object from the array and renders new div 
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
function addComment(user_name, com_text, currentPostID) {
    
    for (var obj in posts) {
        if (posts[obj].id === currentPostID) {
            posts[obj].comments.push(
                {
                    user_name: user_name,
                    com_text: com_text
                }
            );
            break;
        }
    }
    console.log(posts);
}
function renderComments(currentPostID) {
    $(".comments").empty();
    for (var obj in posts) {
        if (posts[obj].id === currentPostID) {
            for (var com in posts[obj].comments) {
                $(".comments").append('<li>' + posts[obj].comments[com].user_name + ': ' + posts[obj].comments[com].com_text + '</li>');
            }
            break;
        }
    }
}
function postComment() {
    addComment($(this).closest("form").find(".user-name").val(), $(this).prev(".comment").val(), $(this).closest(".posts").find("p").data().id);
    renderComments($(this).closest(".posts").find("p").data().id);
    $(this).closest("form").find(".user-name").val("");
    $(this).prev(".comment").val("");
}


$(".add-post").on("click", postPost); // on click adds post to database and screen
$(".posts").on("click", ".remove", removePost);
$(".posts").on("click", ".add-comment", postComment);
