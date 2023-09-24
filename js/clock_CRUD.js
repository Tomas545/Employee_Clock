let raw_data=[];


function CreateTble(){
    let str="";
    for(let line of raw_data){
        str+="<tr>";
        str+=`<td><button onclick="editLine(${line.id});">edit</button></td>`;
        str+="<td>"+line.id+"</td>";
        str+="<td>"+line.first_name+"</td>";
        str+="<td>"+line.last_name+"</td>";
        //str+="<td>"+line.due_date+"</td>";
        str+=`<td><button onclick="deleteLine(${line.id});">Completed</button></td>`;
        str+="</tr>";
    }
    document.getElementById("mainTable").innerHTML=str;
}

async function getList() {
    let response = await fetch('/List');
// console.log("response=",response);
    let data = await response.json();
    console.log("data=",data);
    raw_data = data;
    CreateTble();
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
async function editLine(id) {
    let objToServer={};
    objToServer.idx=id;
    objToServer.category=document.getElementById("category").value;
    objToServer.task_name=document.getElementById("task_name").value;
    objToServer.task_details=document.getElementById("task_details").value;
    objToServer.due_date=document.getElementById("due_date").value;

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
getList();