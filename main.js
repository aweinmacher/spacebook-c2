var SpacebookApp = function () {
  var posts = [
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]}
  ];

  // the current id to assign to a post
  var currentId = 0;
  var comId = 0;
  var $posts = $('.posts');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comments: []
    }

    currentId += 1;

    posts.push(post);
  }

  var renderPosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

      var commentsContainer = `<div class="comments-container">
      <input type="text" class="comment-name" placeholder=" comment">
      <button class="btn btn-primary add-comment">Post Comment</button>
      <div class="comments-list"></div>
      </div>`;

      $posts.append('<div class="post" data-id=' + post.id + '>'
        + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
        commentsContainer + '</div>');
    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  var createComment = function (postId, commentText) {
    var comment = {
      text: commentText,
      id: comId
    }
    comId++;
    var post = _findPostById(postId);
    post.comments.push(comment);
    console.log(posts);
  }

  var renderComments = function (postId, currentPost) {
    currentPost.find(".comments-list").empty();
    var post = _findPostById(postId);
    for (var i = 0; i < post.comments.length; i++) {
      var comment = post.comments[i].text;
      var id = post.comments[i].id;
      $(currentPost).find(".comments-list").append(
        `<div class="comment" data-id="${{ id }}">
        <a href="#" class="remove-comment">remove</a> ${comment}</div>`);
    }
  }

  var _findCommentById = function (post, comId) {
    for (var i = 0; i < post.comments.length; i += 1) {
      if (post.comments[i].id === id) {
        return post.comments[i];
      }
    }
  }

  var removeComment = function (postId, currentComment) {
    var $clickedComment = $(currentComment).closest('.comment');
    var comId = $(currentComment).data().id;

    var post = _findPostById(id);
    var comment = _findCommentById(post, comId);

    post.comments.splice(post.comments.indexOf(comment), 1);
    $clickedComment.remove();
  }

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,
    createComment: createComment,
    renderComments: renderComments,
    removeComment: removeComment,
    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();

  app.createPost(text);
  app.renderPosts();
  $('#post-name').val("");
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function () {
  var currentPost = $(this).closest('.post');
  var postId = $(this).closest('.post').data().id;
  var commentText = $(this).prev(".comment-name").val();
  app.createComment(postId, commentText);
  app.renderComments(postId, currentPost);
  $(this).prev(".comment-name").val("");
});

$('.posts').on('click', '.remove-comment', function () {
  var postId = $(this).closest('.post').data().id;
  var comId = $(this).closest('.comment').data().id;
  app.removeComment(postId, comId);
});
