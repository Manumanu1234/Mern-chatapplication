const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const db = require('./connection/connection');
const producthelper = require('./connection/productfunction/productfunction');
const { Server } = require('socket.io');

const app = express();

app.use(cors({
   origin: ["http://localhost:3006"],
   methods: ["POST", "GET"],
   credentials: true
}));

app.use(express.json());
app.use(cookieParser());

db.connect();

app.use(session({
   secret: "key",
   resave: false,
   saveUninitialized: false,
   cookie: { secure: false, maxAge: 600000 }
}));

app.post('/', (req, res) => {
   producthelper.dataaddingfunction(req.body).then((response) => {
     // console.log(response);
      if (response.status == false) {
         res.status(200).json({ message: 'Data added successfully', data: response });
      } else {
         req.session.user = true;
         res.json({ data: response });
         req.session.save();
      }
   });
});

app.post('/login', (req, res) => {
  // console.log("Request body:", req.body);
   producthelper.loginfunction(req.body).then((response) => {
     // console.log("Login response:", response);
      if (response.status == true) {
         req.session.user = response.id;
         req.session.values123 = 50;
         req.session.save(); 
         console.log("Session user set to true");
      } else {
         req.session.user = false;
         console.log("Session user set to false");
      }
      res.json(response.status);
   });
});

app.get("/validitychecking", (req, res) => {
  // console.log("Session user:", req.session.user, req.session.values123);
   if (req.session.user === undefined) {
      res.json({ isLoggedIn: false });
   } else {
      res.json({ isLoggedIn: req.session.user });
   }
});
app.get("/logot/:id",(req,res)=>{
  // console.log("logout")
   producthelper.logingout(req.params.id).then(()=>{
      req.session.destroy();
      res.json({"complete":"sucess"})
   })
  
})
app.get("/authpersons")

app.post("/chat",(req,res)=>{
   producthelper.chatcreation(req.body).then((response)=>{
     
      res.json(response)
   })

})
app.get("/finduserchat/:id",(req,res)=>{
  // console.log(req.params.id);
   
   producthelper.finduserschat(req.params.id).then((response)=>{
     var datas=response
     return datas
   }).then((datas)=>{
      producthelper.findEachMembers(datas).then((response)=>{
        
         res.json(response)
      })
   })
})
app.get("/findchats/:id1/:id2",(req,res)=>{
  // console.log(req.params.id1,req.params.id2);
   producthelper.findchat(req.params.id1,req.params.id2).then((response)=>{
    //  console.log("ok");
//console.log(response);
      res.json(response)
   })
})


//message api
app.post("/newmessage",(req,res)=>{
   //console.log(req.body)
   producthelper.postchat(req.body).then((response)=>{
      res.json(response)
   })
})
app.get("/findchatids/:id1/:id2",(req,res)=>{
 //  console.log(req.params.id1,req.params.id2);
   producthelper.findpostchat(req.params.id1,req.params.id2).then((response)=>{
      res.json(response)
   })

})
app.get("/findchatids1/:id1/:id2",(req,res)=>{
   producthelper.findpostchat1(req.params.id1,req.params.id2).then((response)=>{
      res.json(response)
   })
})


// total user getting api
app.get("/findtotaluser/:id",(req,res)=>{
  // console.log(req.params.id);
   producthelper.findPerticularUser(req.params.id).then((response)=>{
      res.json(response)

   })
})

app.get('/finduserlogin/:id',(req,res)=>{
   console.log(req.params.id);
   producthelper.finduserlogindetails(req.params.id).then((response)=>{
      res.json(response)
   })
})

app.get("/totalonlineusers/:id",(req,res)=>{
   
   producthelper.totaluser(req.params.id).then((response)=>{
      res.json(response)
   })
})














const PORT = 3001;
let newserver=app.listen(PORT, function (err) {
   if (err) console.log(err);
   console.log("Server listening on PORT", PORT);
});
const io = new Server(newserver,{pingTimeout:60000,cors:{origin:'*'}});

io.on('connection', (socket) => {
  // console.log('a user connected');

   socket.on('setup',(userdata)=>{
      socket.join(userdata)
    //  console.log("sokket connection",userdata);
      socket.emit("connected")
   })
   socket.on("join chat",(room)=>{
      socket.join(room)
      console.log("joined rooms",room);
   })
   socket.on("new message",(newmessagerecived)=>{
      var chat=newmessagerecived
    // console.log("chat",chat);
      socket.in('123').emit("message received",chat)
   })

   socket.on("user:call",({to,offer})=>{
      io.to(to).emit('incomming:call',{from:socket.id,offer})
   })
   socket.on("callacepted",({to,ans})=>{
      io.to(to).emit("callacepted",{from:socket.id,ans})
   })
 });