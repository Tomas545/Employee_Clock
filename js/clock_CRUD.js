let raw_data=[];
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
        //str+=`<td><button onclick="selectLine(${line.id});">select employee</button></td>`;
        str+="</tr>";
    }
    document.getElementById("employeeTable").innerHTML=str;

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

    getList();
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

getList();
