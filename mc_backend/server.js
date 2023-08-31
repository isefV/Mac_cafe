import express from "express"
import mysql from "mysql"
import cors from "cors"

import multer from "multer"
import path from "path"

import { dataParserToObj , mac_db , checkDataType, hashPassword } from "./functions.js"

const app = express();

const db = mysql.createConnection(mac_db)

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/img");
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "-" + Date.now() + "-mc" + path.extname(file.originalname));
    }
})

const upload = multer({
    storage : storage
})

// The req response is write there

// get methods
app.get("/menu",(req,res)=>{
    const mainq_1 = "SELECT * FROM mac_cafe.menu;";
    db.query(mainq_1,(err,data)=>{
        if(err) return res.json(err);
        return res.json({_op:1,_data:dataParserToObj(data)});
    });
})

app.get("/section",(req,res)=>{
    const mainq_2 = "SELECT * FROM mac_cafe.sections;";
    db.query(mainq_2,(err,data)=>{
        if(err) return res.json(err);
        return res.json({_op:2,_data:dataParserToObj(data)});
    });
})

app.get("/orders",(req,res)=>{
    const mainq_2 = "SELECT _date FROM mac_cafe.orders;";
    db.query(mainq_2,(err,data)=>{
        if(err) return res.json(err);
        const obj = {}
        data.map((item)=>{
            if(!(item["_date"] in obj))
                obj[item["_date"]] = 0;
        })
        return res.json({_op:3,_data:Object.keys(obj)});
    });
})

app.get("/",(req,res)=>{
    const mainq_3 = "SELECT * FROM `mac_cafe`.`menu`;";

    db.query(mainq_3,(err,data)=>{
        if(err) return res.json(err);
        return res.json({_op:1});
    });
})

// Post methods
app.post("/addSection",(req,res)=>{
    const data_main = req.body._data;

    const pre_q = "SELECT _id FROM mac_cafe.sections order by _id desc limit 1;";

    db.query(pre_q,(err,data)=>{
        if(err) return res.json(err);

        var id = 0

        if(data.length!==0){
            id = data[0]["_id"];
        }
        const q_1 = "INSERT INTO `mac_cafe`.`sections` (`_id`, `_title`) VALUES (" + (id+10) +", " + checkDataType(data_main["_title"]) + ");"
        db.query(q_1,(err,data)=>{
            if(err) return res.json(err);
            return res.json({_op:1});
        });
    });
})

app.post("/addMenu",(req,res)=>{
    const data_main = req.body._data;

    const q_2 = "INSERT INTO `mac_cafe`.`menu` (`_title`,`_descriptions`,`_price`,`_section`,`_discount`,`_count`,`_img`) VALUES ("+checkDataType(data_main["_title"])+","+checkDataType(data_main["_descriptions"])+","+checkDataType(data_main["_price"])+","+checkDataType(data_main["_section"])+","+checkDataType(data_main["_discount"])+","+checkDataType(data_main["_count"])+","+checkDataType(data_main["_img"])+");"
    db.query(q_2,(err,data)=>{
        if(err) return res.json(err);
        return res.json({_op:2,_data:data["insertId"]});
    });

})

app.post("/deleteSection",(req,res)=>{
    const data_main = req.body._data;
    const q_3 = "DELETE FROM `mac_cafe`.`sections` WHERE _id = "+checkDataType(data_main)+";"
    db.query(q_3,(err,data)=>{
        if(err) return res.json(err);
        return res.json({_op:3});
    });
})

app.post("/deleteMenu",(req,res)=>{
    const data_main = req.body._data;
    const q_4 = "DELETE FROM `mac_cafe`.`menu` WHERE _id = "+checkDataType(data_main)+";"
    db.query(q_4,(err,data)=>{
        if(err) return res.json(err);
        return res.json({_op:4});
    });
})

app.post("/editMenu",(req,res)=>{
    const data_main = req.body._data;

    var q_5
    // if(checkDataType(data_main["_data"]["_img"])===null)
    q_5 = "UPDATE `mac_cafe`.`menu` SET  `_title` = "+checkDataType(data_main["_title"])+", `_descriptions` = "+checkDataType(data_main["_descriptions"])+", `_price` = "+checkDataType(data_main["_price"])+", `_section` = "+checkDataType(data_main["_section"])+", `_discount` = "+checkDataType(data_main["_discount"])+", `_count` = "+checkDataType(data_main["_count"])+" WHERE _id = "+checkDataType(data_main["_id"])+";";
    // else
    //     q_5 = "UPDATE `mac_cafe`.`menu` SET  `_title` = "+checkDataType(data_main["_data"]["_title"])+", `_descriptions` = "+checkDataType(data_main["_data"]["_descriptions"])+", `_price` = "+checkDataType(data_main["_data"]["_price"])+", `_section` = "+checkDataType(data_main["_data"]["_section"])+", `_discount` = "+checkDataType(data_main["_data"]["_discount"])+", `_count` = "+checkDataType(data_main["_data"]["_count"])+", `_img` = "+checkDataType(data_main["_data"]["_img"])+" WHERE _id = "+checkDataType(data_main["_id"])+";"

    db.query(q_5,(err,data)=>{
        if(err) return res.json(err);
        return res.json({_op:5});
    });
})

app.post("/submitOrder",(req,res)=>{
    const data_main = req.body._data;

    const q_6 = "INSERT INTO `mac_cafe`.`orders` (`_user`,`_orders`,`_status`,`_date`,`_time`) VALUES ("+checkDataType(data_main["_user"])+","+checkDataType(data_main["_data"])+","+checkDataType(data_main["_status"])+","+checkDataType(data_main["_date"])+","+checkDataType(data_main["_time"])+");";

    db.query(q_6,(err,data)=>{
        if(err) return res.json(err);
        return res.json({_op:6,_data:data["insertId"]});
    });
})

app.post("/dateOrder",(req,res)=>{
    const data_main = req.body._data;
    const q_7 = "SELECT o._id,u._phone,o._orders,o._status,o._time FROM mac_cafe.orders o join mac_cafe.users u on o._user = u._id where _date = "+checkDataType(data_main["_date"])+" order by _time desc;"

    db.query(q_7,(err,data)=>{
        if(err) return res.json(err);
        return res.json({_op:7,_data:data});
    });
})

app.post("/statusOrders",(req,res)=>{
    const data_main = req.body._data;

    const q_8 = "SELECT _status FROM mac_cafe.orders where _id = "+checkDataType(data_main["_id"])+" and _status = 'انتظار';"
    db.query(q_8,(err,data)=>{
        if(err) return res.json(err);
        if(data.length !== 0){
            const q_9 = "UPDATE `mac_cafe`.`orders` SET `_status` = "+checkDataType(data_main["_data"])+" WHERE `_id` = "+checkDataType(data_main["_id"])+";"
            db.query(q_9,(err,data)=>{
                if(err) return res.json(err);
                return res.json({_op:8});
            });
        }
    });
})

app.post("/customerDateOrders",(req,res)=>{
    const data_main = req.body._data;
    const q_10 = "SELECT _date FROM mac_cafe.orders where _user = "+checkDataType(data_main["_id"])+" ;"
    db.query(q_10,(err,data)=>{
        if(err) return res.json(err);
        const obj = {}
        data.map((item)=>{
            if(!(item["_date"] in obj))
                obj[item["_date"]] = 0;
        })
        return res.json({_op:9,_data:Object.keys(obj)});
    });
})

app.post("/customerOrders",(req,res)=>{
    const data_main = req.body._data;
    const q_11 = "SELECT _id,_orders,_status,_time FROM mac_cafe.orders where _user = "+checkDataType(data_main["_id"])+" and _date = "+checkDataType(data_main["_date"])+" ;"

    db.query(q_11,(err,data)=>{
        if(err) return res.json(err);
        return res.json({_op:10,_data:data});
    });
})

app.post("/signup",(req,res)=>{
    const data_main = req.body._data;

    const q_12 = "INSERT INTO `mac_cafe`.`users` (`_username`,`_phone`,`_email`,`_password`,`_admin`) VALUES ("+checkDataType(data_main["_username"])+" ,"+checkDataType(data_main["_phone"])+" ,"+checkDataType(data_main["_email"])+" ,"+checkDataType(hashPassword(data_main["_password"]))+" ,false);";

    db.query(q_12,(err,data)=>{
        if(err) return res.json({_op:11,_data:{_err:true}});
        return res.json({_op:12,_data:{_id:data["insertId"]}});
    });
})

app.post("/login",(req,res)=>{
    const data_main = req.body._data;
    const q_12 = "SELECT _id,_username,_admin FROM `mac_cafe`.`users` where _phone = "+checkDataType(data_main["_phone"])+" and _password = "+checkDataType(hashPassword(data_main["_password"]))+";";

    db.query(q_12,(err,data)=>{
        if(err) return res.json({_op:13,_data:{_err:true}});
        return res.json({_op:14,_data:data[0]});
    });
})

app.post("/uploadPic",upload.single("_img"),(req,res)=>{
    const file = req.file;
    const id = req.body._id;

    if(file===undefined && (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/webp" || file.mimetype == "image/svg"))
        return res.status(403).json({_op:15,_data:"Faild upload!"});

    const q_13 = "UPDATE `mac_cafe`.`menu` SET `_img` = " + checkDataType(file["filename"]) + " WHERE `_id` = " + checkDataType(id) +";"

    db.query(q_13,(err,data)=>{
        if(err) return res.json({_op:13,_err:true});
        return res.json({_op:16});
    });
})


// End of Backend
app.listen(process.env.PORT || 8800, ()=>{
    console.log("running!")
})