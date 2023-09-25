let raw_data=[];
let employee_data = [];
let srchTerm="";

function FilterData(el){
    console.log("FilterData::",el);
    if(srchTerm==="")
        return true;
    let reg=new RegExp(srchTerm,"i");
    if(reg.test(el.last_name)){
        return true;
    }
    return false;
}
function CreateTble(){
    srchTerm=document.getElementById("filterField").value;
    let data=raw_data.filter(FilterData);
    let str="";
    for(let line of data){
        str+="<tr>";
        str+=`<td><button onclick="editLine(${line.id});">edit employee</button></td>`;
        str+="<td>"+line.id+"</td>";
        str+="<td>"+line.first_name+"</td>";
        str+="<td>"+line.last_name+"</td>";
        str+=`<td><button onclick="deleteLine(${line.id});">delete employee</button></td>`;
        str+=`<td><button onclick="selectLine(${line.id});">select employee</button></td>`;
        str+="</tr>";
    }
    document.getElementById("employeeTable").innerHTML=str;
}
function CreateStampTable(){

    let data=employee_data;
    let str="";
    for(let line of data){
        str+="<tr>";
        str+="<td>"+line.date+"</td>";
        str+="<td>"+line.employee_id+"</td>";
        str+="<td>"+line.enter_time+"</td>";
        str+="<td>"+line.exit_time+"</td>";
        str+="</tr>";
    }
    document.getElementById("stamping_table").innerHTML=str;
}

async function getList() {
    let response = await fetch('/List');
// console.log("response=",response);
    let data = await response.json();
    console.log("data=",data);
    raw_data = data;
    CreateTble();
}
async function getStamps() {

    let stamp_id = document.getElementById("stamp_id").value;
    let response = await fetch('/Employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({stamp_id:stamp_id})
        }
    );
    let data = await response.json();
    console.log("data=",data);
    employee_data = data;
    CreateStampTable();
}

async function addNewLine() {
    let first_name=document.getElementById("first_name").value;
    let last_name=document.getElementById("last_name").value;

    let response = await fetch('/Add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({first_name: first_name, last_name: last_name})
        }
    );

    getList();
}
async function deleteLine(id) {
    //let Name= id;
    let objToServer={};
    objToServer.idx=id;
    let response = await fetch('/Delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToServer)
        }
    );
// let data = await response.json();
// console.log(data);
    getList();
}

async function selectLine(id){
    let objToServer={};
    objToServer.idx=id;
}
async function editLine(id) {
    let objToServer={};
    objToServer.idx=id;
    objToServer.first_name=document.getElementById("first_name").value;
    objToServer.last_name=document.getElementById("last_name").value;

    let response = await fetch('/Edit', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToServer)
        }
    );
    getList();
}
async function addEnterTime(){
    let employee_id=document.getElementById("employee_id").value;

    let response = await fetch('/AddEnterTime', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({employee_id: employee_id})
        }
    );
}

async function addExitTime(){
    let employee_id=document.getElementById("employee_id").value;

    let response = await fetch('/AddExitTime', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({employee_id: employee_id})
        }
    );
}

getList();
getStamps();

