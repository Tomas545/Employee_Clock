let srchTerm="";
let employeeSelected = false;
//document.getElementById("employee_id").value = " ";
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

function CreateTble2(){
    srchTerm=document.getElementById("filterField2").value;
    let data=raw_data.filter(FilterData);
    let str="";
    for(let line of data){
        str+="<tr>";
        str+="<td>"+line.id+"</td>";
        str+="<td>"+line.first_name+"</td>";
        str+="<td>"+line.last_name+"</td>";
        str+=`<td><button onclick="selectLine(${line.id});">select employee</button></td>`;
        str+="</tr>";
    }
    document.getElementById("employeeTable2").innerHTML=str;

}

async function getList2() {
    let response = await fetch('/List');
// console.log("response=",response);
    let data = await response.json();
    console.log("data=",data);
    raw_data = data;
    CreateTble2();
}

async function selectLine(id){
    employeeSelected = true;
    document.getElementById("employee_id").value = id;
}

async function addEnterTime(){
    if (employeeSelected === true){
        let employee_id=document.getElementById("employee_id").value;
        let response = await fetch('/AddEnterTime', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({employee_id: employee_id})
            }
        );
        employeeSelected = false;
    }
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

getList2()
document.getElementById("employee_id").value = " ";