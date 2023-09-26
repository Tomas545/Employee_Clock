const express = require('express');
const router = express.Router()
module.exports = router;

router.get("/",(req, res) => {

    res.render("mainPage");

});
router.get("/stampingPage",(req, res) => {

    res.render("stampingPage");

});
router.get("/employeeHours",(req, res) => {

    res.render("employeeHoursPage");

});

router.post("/Add",(req, res) => {

    let ThemesObj = {};
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

router.post("/AddEnterTime",(req,res)=>{
    let employee_id = req.body.employee_id;

    const addQuery = `INSERT INTO time_stamps(date , employee_id , enter_time) VALUES(CURRENT_DATE , '${employee_id}' , CURRENT_TIME)`;

    db_pool.query(addQuery,function (err,rows){
        if (err){
            res.status(500).json({message:err});
        }
        else {
            res.status(200).json({message: "enter stamp added"});
        }
    })
});
router.patch("/AddExitTime",(req,res)=>{
    let employee_id = req.body.employee_id;

    const addQuery = `UPDATE time_stamps SET exit_time = CURRENT_TIME WHERE employee_id = '${employee_id}' AND date = CURRENT_DATE`;

    db_pool.query(addQuery,function (err,rows){
        if (err){
            res.status(500).json({message:err});
        }
        else {
            res.status(200).json({message: "exit stamp added"});
        }
    })
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
router.post("/Employee",(req, res) => {

    let stamp_id = req.body.stamp_id;

    let q=`SELECT *  FROM time_stamps WHERE employee_id= '${stamp_id}'`;

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
