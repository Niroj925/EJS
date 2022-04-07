const express=require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const path=require('path');//for path
const { send } = require('process');
//for lower cases it turns any string into lower case in alphabet only
const _ = require('lodash');
const port=process.env.PORT ||3000;

const home="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
const about="The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.";
const contact="the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessar";
  
const app=express();

app.set('view engine', 'ejs');
//following below prosess we should not be using
//have to apply full path in ejs file in homepage
const viewpath=path.join(__dirname,"./view");
 app.set('views', viewpath);

 
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(express.static('public'));
//store for new post
 let posts=[];

 app.get('/',function(req,res){// '/' this is the link 
   
    res.render('home',{
        content:home,
        title:"Homepage",
        posts:posts
    });//this is js value
    //composed posts are there 
     //console.log(posts);
     /*
     for(var i=0; i<posts.length; i++){
         console.log(posts[i]);
     }
        */
       /*
       //this efficient way to solve
       posts.forEach(function(post){
           console.log(post);
           /*
           res.render('home',{
               title:posts.title,
               content:posts.content  
            });
            
       })
       */
  });

 app.get('/about',function(req,res){
    res.render('home',{
        content:about,
        title:"About",
        posts:posts
    });
}) 

app.get('/contact',function(req,res){
    res.render('home',{
        content:contact,
        title:"Contact",
        posts:posts
    });
})
//for new compose app
   app.get('/compose',function(req,res){
        res.render('compose');
      })

   app.post('/compose',function(req,res){
     //  const tm=req.body.blogTitle;
       // console.log(tm);
        //let us create js object
     const post={  
         title:req.body.blogTitle,
         content:req.body.blog
     };
     //push js whole objects in an array
    posts.push(post);
    res.redirect('/');
   });
   //for new  compose
   const action='/';
   app.post(action,function(req, res){
       //console.log(req.body.new);
       //console.log(req.body.del);
      const bv=req.body.new;
      const dv=req.body.del;
       if(bv==='press')
       { 
           res.redirect('/compose');
       }
       //this is for pop the posts 
       else if(dv==='delreq')
       {
           posts.pop();
           res.redirect('/');
       }
   })
//route parameter for route below link we 
//can get the result after content
app.get('/posts/:posttitle',function(req, res){
    //to test the title exist or not
    //low dash is use for absolute alpha only lower case remove all
    const postTitle=_.lowerCase(req.params.posttitle);
    console.log(postTitle);
    let tt=0;
    let i;//this is for finding index
    for(i=0; i<posts.length; i++){
        let currentTitle=_.lowerCase(posts[i].title);
       // console.log(currentTitle);
      if(currentTitle==postTitle)
      { 
          tt+=1;
         // console.log('title found');
          break; 
      }
    }
(tt>0)?console.log('title found'):console.log('title not found');
//route for seperate page od entered title
if(tt>0)
{ 
   res.render('post',{
       ptitle:posts[i].title,
       pcontent:posts[i].content
   })
    res.redirect('/post');
}

// console.log(req.params.postContent);
})
//lodash example 
//console.log(_.lowerCase('- mero @ nam --'));//result is mero nam


app.listen(port, function(){
    console.log('server running on port 3000');
})