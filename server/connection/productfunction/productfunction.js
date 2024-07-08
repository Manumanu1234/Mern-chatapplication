const db = require('../connection')
const collection = require("../collection")
const bycrpt = require("bcrypt")
const { Timestamp, ObjectId } = require('mongodb')
module.exports = {
    dataaddingfunction: (body) => {
        return new Promise(async (resolve, reject) => {
            let alredysign1 = await db.get().collection(collection.USERCOLLECTION).find({}).toArray()
            if (alredysign1.length != 0) {
                let alredysign = await db.get().collection(collection.USERCOLLECTION).find({ Email: body.email }).toArray();
                let alredysign2 = await db.get().collection(collection.USERCOLLECTION).find({ Name: body.name }).toArray()

                if (alredysign.length > 0 || alredysign2.length > 0) {
                    resolve({ status: false })
                } else {
                    body.password = await bycrpt.hash(body.password, 10);
                    let userobj = {
                        Name: body.name,
                        Email: body.email,
                        Password: body.password,
                        islogin: false
                    }
                    db.get().collection(collection.USERCOLLECTION).insertOne(userobj).then((data) => {
                        db.get().collection(collection.USERCOLLECTION).findOne({ Email: userobj.Email }).then((response) => {
                            resolve({ status: true, response })
                        })


                    })
                }
            } else {
                body.password = await bycrpt.hash(body.password, 10);
                let userobj = {
                    Name: body.name,
                    Email: body.email,
                    Password: body.password,
                    islogin: false
                }
                db.get().collection(collection.USERCOLLECTION).insertOne(userobj).then((data) => {
                    db.get().collection(collection.USERCOLLECTION).findOne({ Email: userobj.Email }).then((response) => {
                        resolve({ status: true, response })
                    })
                })
            }




        })

    },
    loginfunction: (logindetails) => {
        return new Promise(async (resolve, reject) => {
            let response = {}
            let user = await db.get().collection(collection.USERCOLLECTION).findOne({ Email: logindetails.email })
            if (user) {
                bycrpt.compare(logindetails.password, user.Password).then((status) => {
                    if (status) {

                        response.status = true;
                        response.id = user._id;
                        console.log(user);
                        if (user.islogin==false) {
                            db.get().collection(collection.USERCOLLECTION).updateOne({ islogin: false }, { $set: { islogin: true } }).then(() => {
                                resolve(response)
                            })
                        }else{
                            resolve(response)
                        }
                    } else {
                        response.status = false;
                        resolve(response)
                    }

                })

            } else {
                response.status = false;
                resolve(response);
            }
        })
    },
    chatcreation: (data) => {
        return new Promise(async(resolve, reject) => {
            let currentTime = new Date()
            let hours = currentTime.getHours();
            let minutes = currentTime.getMinutes();
            let time = hours + ':' + minutes;
            obj = {
                member: [data.firstid, data.secondid],
                created: time,
                edited: time
            }
            const query = { member: { $all: [data.firstid, data.secondid] } };
            const chatdetails = await db.get().collection(collection.ChatCollection).findOne(query);
            if(chatdetails){
                let response=false
                resolve(response)
            }else{
                db.get().collection(collection.ChatCollection).insertOne(obj).then(() => {
                    let response=true
                    resolve(response)
                })
            }


           
        })

    },
    finduserschat: (body) => {
        console.log("manuvee1");
        console.log(body);
        return new Promise(async (resolve, reject) => {
            let data = await db.get().collection(collection.ChatCollection).find({member:{$in:[body]}}).toArray();
            const memberIds = data.map(chat => {
                return chat.member.find(member => member !== body);
              });
            
            resolve(memberIds)
        })
    },
    findchat: (first1, second2) => {
        return new Promise(async (resolve, reject) => {

            const query = { member: { $all: [first1, second2] } };
            const chatdetails = await db.get().collection(collection.ChatCollection).findOne(query);

            if (chatdetails) {
                console.log('Document found:', chatdetails);
                resolve(chatdetails)
            } else {
                console.log('No document found with the specified criteria.');
            }
        })
    },
    postchat: (body) => {
        return new Promise(async (resolve, reject) => {
       
            let data = await db.get().collection(collection.Messagecollecion).insertOne(body)
            resolve(data)
        })
    },
    findpostchat: (id1, id2) => {
        return new Promise(async (resolve, reject) => {
            let totalchatids = await db.get().collection(collection.Messagecollecion).find({
                $or: [
                    { Chatid: id2, Senderid: id1 },
                    { Chatid: id1, Senderid: id2 }
                ]
            }).toArray()
         
            resolve(totalchatids)
        })

    },
    findpostchat1: (id1, id2) => {
        return new Promise(async (resolve, reject) => {
            let totalchatids = await db.get().collection(collection.Messagecollecion).find({
                $or: [
                    { Chatid: id2, Senderid: id1 },
                    { Chatid: id1, Senderid: id2 }
                ]
            }).toArray()
      
            let length=totalchatids.length;
            let lastdata=totalchatids[length-1];
           
            resolve(lastdata)
        })

    },

    findEachMembers: (datas) => {
        return new Promise(async (resolve, reject) => {
            console.log("details");
            console.log(datas);
            console.log(datas.length);
            let len = datas.length;
            let newarr = [];
            for (let i = 0; i < len; i++) {
                console.log(datas[i]);
                let find = await db.get().collection(collection.USERCOLLECTION).findOne({ _id: new ObjectId(datas[i]) });
                newarr.push(find)
            }
      
            resolve(newarr)
        })
    },
    finduserlogindetails: (id) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USERCOLLECTION).findOne({ _id: new ObjectId(id) })
            
            resolve(user)

        })
    },
    totaluser: (id) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USERCOLLECTION).find({ _id: { $ne: new ObjectId(id) } }).toArray()
            let newarr=[];
            for(let i=0;i<user.length;i++){
                if(user[i].islogin==true){
                    newarr.push(user[i])
                }
            }
           
            resolve(user)

        })
    },
    logingout: (id) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USERCOLLECTION).findOne({ _id: new ObjectId(id) })
            if (user.islogin == true) {
                db.get().collection(collection.USERCOLLECTION).updateOne({islogin:true}, { $set: { islogin: false } }).then(() => {
                    resolve()
                })
            }else{
                console.log("otherwise");
            }
        })
    }
}