const express = require('express');
const router = express.Router()
module.exports = router;

router.get("/",(req, res) => {

    res.render("mainPage");

});

router.post("/Add",(req, res) => {

    let ThemesObj = {};
    //ThemesObj.category  = req.body.category;
    //ThemesObj.task_name = req.body.task_name;
    ThemesObj.first_name = req.body.first_name;
    ThemesObj.last_name  = req.body.last_name;


    const addQuery = `INSERT INTO employee_id(first_name,last_name) VALUES('${ThemesObj.first_name}','${ThemesObj.last_name}')`;
    db_pool.query(addQuery,function (err,rows,fields,){
        if (err){
            res.status(500).json({message:err});
        }else{
            res.status(200).json({message:"employee added",Last_Id:rows.insertId});
        }
    })
    console.log(ThemesObj);
});

router.patch("/Edit",(req, res) => {

    let newAnswerObj = {};
    newAnswerObj.id = Number(req.body.idx);
    newAnswerObj.first_name = req.body.first_name;
    newAnswerObj.last_name = req.body.last_name;

    const UpdateQuery = `UPDATE employee_id SET first_name = '${newAnswerObj.first_name}',last_name = '${newAnswerObj.last_name}' WHERE id = ${newAnswerObj.id}`;

    db_pool.query(UpdateQuery,function (err,rows,fields,){
        if (err){
            res.status(500).json({message:err});
        }else{
            res.status(200).json({message:"employee updated"});
        }
    })
    console.log(newAnswerObj);
});

router.delete("/Delete",(req, res) => {

    let id= Number(req.body.idx);

    let q=`DELETE FROM \`employee_id\` WHERE id =${id}`;

    db_pool.query(q, function(err, rows, fields){

        if(err){
            res.status(500).json({message: err})

        }else{

            res.status(200).json({message: "Deleted Theme"});

        }
    });

});

router.get("/List",(req, res) => {

    let q="SELECT * FROM `employee_id`";

    db_pool.query(q, function(err, rows, fields){

        if(err)
        {
            res.status(500).json({message: err})

        }
        else
        {
            res.status(200).json(rows);

        }
    });

});
