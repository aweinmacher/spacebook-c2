// experimentimg with merge
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
function findPost(id) {
    // return posts.find(post => post.id === id);
    return posts.find(function(post) { return post.id === id});
    // for (var i = 0; i < posts.length; i++) {
    //     if (posts[i].id === id) {
    //         return posts[i];
    //     }
    // }
}
function addComment(user_name, com_text, id) {
    var post = findPost(id);
    post.comments.push(
        {
            user_name: user_name,
            com_text: com_text,
            com_id: _generateNewComId(post.comments)
        }
    );
}
function _generateNewComId(comments) {
   var commentsId = comments.map( function(comment) { return comment.com_id; } );
   return Math.max(commentsId)+1;
}

function removePost() { // removes post object from the array and renders new div 
    var id = $(this).closest(".post").data().id;
    var currentPostIndex = posts.indexOf(findPost(id));
    posts.splice(currentPostIndex, 1);
    console.log(posts);
    renderPosts();
}

function renderPosts() { // prepares html <div> for DOM refresh
    $(".posts").empty();
    for (var post in posts) {
        var commentsHTML = '';
        for (var com in posts[post].comments) {
            commentsHTML += `<li>${posts[post].comments[com].user_name}: ${posts[post].comments[com].com_text}</li>`;
        }
        $(".posts").append(`<div class="post" data-id="${posts[post].id}">
                                <button type="button" class="remove">REMOVE</button>
                                #${posts[post].id} ${posts[post].text}
                                <ul class="comments">
                                    ${commentsHTML}
                                </ul>
                                <form>
                                    <input type="text" class="user-name" placeholder="name">
                                    <input type="text" class="comment" placeholder="comment">
                                    <button type="button" class="add-comment">Comment</button>
                                </form>
                            </div><br>`);
    }
}

function postPost() { // onclick function
    addPost(id, $("#post-name").val());
    renderPosts();
    id++;
    $("#post-name").val("");
}
function postComment() {
    var userName = $(this).closest("form").find(".user-name");
    var commentText = $(this).prev(".comment");
    var postId = $(this).closest(".post").data().id;
    addComment(userName.val(), commentText.val(), postId);
    renderPosts();
    userName.val("");
    commentText.val("");
}

$(".add-post").on("click", postPost); // on click adds post to database and screen
$(".posts").on("click", ".remove", removePost);
$(".posts").on("click", ".add-comment", postComment);
