var db = require('./db.js')
var first_name =["Rupali"]
var last_name = ["Rathod"]
var username = ["rr"]
var password = ["2015"]



var title=["Healthy Eating Habits for Your Child", "Guide your family's choices rather than dictate foods.", " Plan for snacks."]
var post=["By teaching your children healthy eating habits, and modeling these behaviors in yourself, you can help your children maintain a healthy weight and normal growth. Also, the eating habits your children pick up when they are young will help them maintain a healthy lifestyle when they are adults.", "Make a wide variety of healthful foods available in the house. This practice will help your children learn how to make healthy food choices. Leave the unhealthy choices like chips, soda, and juice at the grocery store. Serve water with meals.", "Continuous snacking may lead to overeating, but snacks that are planned at specific times during the day can be part of a nutritious diet, without spoiling a child's appetite at meal times. You should make snacks as nutritious as possible, without depriving your children of occasional chips or cookies, especially at parties or other social events."]
var view = [1, 3, 5];
var firstuser = {
  first_name: first_name[0],
  last_name: last_name[0],
  username: username[0],
  password: password[0]
};
var votes=[1, 3, 4]
var users = [firstuser]
var url=['https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRBhtvUTQF03LskxZItrpYxJKzYlWEoJ5RbpfugF5BIik161IGe', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQcl0P-W_tawidKGnLz0ZcG43C7OMZCSWm0Pw3zX1o-Lc1A5qLjpA', 'http://selfcarers.com/wp-content/uploads/2015/01/ways-to-develop-healthy-eating-habits.jpg']

var firsttopic = {
  title: title[0],
  user_id: 1,
  views: view[0],
  img: url[0]

};
var secondtopic = {
  title: title[1],
  user_id: 1,
  views: view[1],
  img: url[1]
};
var thirdtopic = {
  title: title[2],
  user_id: 1,
  views: view[2],
  img: url[2]
};
var firstPost ={
  user_id: null,
  topic_id: null,
  post: post[0],
  location: null,
  votes: votes[0]
};
var secondPost ={
  user_id: null,
  topic_id: null,
  post: post[1],
  location: null,
  votes: votes[1]
};
var thirdPost ={
  topic_id: null,
  post: post[2],
  location: null,
  votes: votes[2]
};

for (var i=0; i < users.length; i++){
  db.create('users', users[i], function (user){
    console.log("i am user", user);

  firstPost.user_id = user.id;
  db.create('topics', firsttopic, function (topic){
  firstPost.topic_id = topic.id;
  console.log("first post", firstPost);
  db.create('posts', firstPost, function (post){
    console.log("thanks for the post");
  });

});
    secondPost.user_id = user.id;

db.create('topics', secondtopic, function (topic){
  secondPost.topic_id = topic.id
  db.create('posts', secondPost, function (post){
    console.log("thanks for the post");
  });

});
  thirdPost.user_id = user.id;

db.create('topics', thirdtopic, function (topic){
  thirdPost.topic_id = topic.id
  db.create('posts', thirdPost, function (post){
    console.log("thanks for the post");
  });

});
  });

}






