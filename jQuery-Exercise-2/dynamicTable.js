let totalRecords = [];
let rowCount = 1;
let modifierDiv=0;
let ccount=0;
var hexDigits = new Array
    ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

//Function to convert rgb color to hex format
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}
let addData = () => {
    const firstName = $("#fname").val();
    const lastName = $("#lname").val();
    const bgColor = $("#bg").val();
    const txtSize = $("#size").val();


    if (firstName == "" || lastName == "" || bgColor == "" || txtSize == "") {
        alert("All fields are Required");
    }
    else {
        let objAdd = firstName + lastName;
        if (totalRecords.includes(objAdd)) {
            alert("Object Already Exists");
        }
        else {
            totalRecords.push(objAdd);
            let checkId = `check${rowCount}`;
            let firstId = `first${rowCount}`;
            let lastId = `last${rowCount}`;
            let editId = `edit${rowCount}`;
            let delId = `del${rowCount}`;
            let rowId = `row${rowCount}`;
            let rowHtml = $(`<tr id=${rowId}>
                            <th><input type="checkbox" id=${checkId} onclick="checkClicked(this)"></th>
                            <th><input type="text" id=${firstId} value=${firstName} style="background-color: #${bgColor};font-size:${txtSize}" readOnly></th>
                            <th><input type="text" id=${lastId} value=${lastName} style="background-color: #${bgColor};font-size:${txtSize}" readOnly></th>
                            <th><button type="button" class="btn btn-success pl-5 pr-5" id=${editId} onClick="editData(this.id)">Edit</button></th>
                            <th><button type="button" class="btn btn-danger pl-5 pr-5" id=${delId} onClick="deleteData(this.id)" disabled>Delete</button></th>
                        </tr>`);
            rowHtml.hide();
            $("#userData").append(rowHtml);

            rowHtml.fadeIn(2000);
            $("#fname").val("");
            $("#lname").val("");
            $("#bg").val("");

           
           
            
            if (totalRecords.length != 0) {
                if($('#selectAll').is(':checked'))
                {
               
                    let sdiv= `<input type="checkbox" id="selectAll" name="sa" onclick="selectAll(this)" checked><label class="pl-3" for="sa">Select All</label><br>
                                <div id="dpara">
                                <p>Total ${rowCount-1} Row(s) Selected</p>
                                <button type="button" id=bid class="btn btn-danger pl-5 pr-5" onClick="deleteAllData()">Delete All</button>
                            </div>`;
                    $("#upCheckbox").html(sdiv);
                
                 }
                 else{
                    $("#upCheckbox").html(`<input type="checkbox" id="selectAll" name="sa" onclick="selectAll(this)"><label class="pl-3" for="sa">Select All</label><br>`);
                 }
            }
            rowCount++;
            ccount++
        }
    }
}

let editData = (id) => {
    let rowNumber = id.substr(4);
    console.log(id + "--------------" + rowNumber);
    let f = $(`#first${rowNumber}`).val();
    let l = $(`#last${rowNumber}`).val();
    let c = $(`#last${rowNumber}`).css('background-color');
    let s = $(`#last${rowNumber}`).css('font-size');
    let fs;
    let objtoRemove = f + l;
    let index = totalRecords.indexOf(objtoRemove);
    totalRecords.splice(index, 1);

    let hexc = rgb2hex(c);
    if (s == "18px") {
        fs = "Large";
    }
    else if (s == "16px") {
        fs = "Medium";
    }
    else {
        fs = "Small";
    }

    $("#bg").val(hexc);
    $("#size").val(fs);
    $("#fname").val(f);
    $("#lname").val(l);

    $("#btnDiv").html(`<button type="button" id="updateBtn" class="btn btn-default border border-primary pl-5 pr-5 ml-5" onclick="updateData(${rowNumber})" style="color:blue;">Update</button>`);
}

let updateData = (id) => {

    if ($("#fname").val() == "" || $("#lname").val() == "" || $("#bg").val() == "") {
        alert("all are Required");
    }
    else {


        let fN = $("#fname").val();
        let lN = $("#lname").val();
        let bg = $("#bg").val();
        let tx = $("#size").val();
        let bgc = `#${bg}`;

        let objAddUpdated = fN + lN;

        totalRecords.push(objAddUpdated);


        $(`#first${id}`).val(fN);
        $(`#last${id}`).val(lN);
        $(`#first${id}`).css({ "background-color": `${bgc}`, "font-size": `${tx}` });
        $(`#last${id}`).css({ "background-color": `${bgc}`, "font-size": `${tx}` });


        $("#fname").val("");
        $("#lname").val("");
        $("#bg").val("");
        $("#btnDiv").html(`<button type="button" id="addBtn" class="btn btn-default border border-primary pl-5 pr-5 ml-5" onclick="addData()" style="color:blue;">Add</button>`);


    }
}

let deleteData = (id) => {
    let rowNumber = id.substr(3);
    let ftoDelete = $(`#first${rowNumber}`).val();
    let ltoDelete = $(`#last${rowNumber}`).val();
    let objtoDelete = ftoDelete + ltoDelete;
    let Dindex = totalRecords.indexOf(objtoDelete);
    totalRecords.splice(Dindex, 1);
    $(`#check${rowNumber}`).prop('checked', false);

    if (totalRecords.length == 0) {

        $("#upCheckbox").html("");

    }

    $(`#row${rowNumber}`).fadeOut("slow",function(){
        $(this).remove();
    });
    rowCount--;
   
    $("#fname").val("");
    $("#lname").val("");
    $("#btnDiv").html(`<button type="button" id="addBtn" class="btn btn-default border border-primary pl-5 pr-5 ml-5" onclick="addData()" style="color:blue;">Add</button>`);


    let flag=0;
        for (let p = 0; p < rowCount; p++) {
            let element = $(`#check${p + 1}`);
            if (element.length!=0) {
               if(!($(`#check${p+1}`).is(':checked')))
               {
                    flag=0;
               }
               else{
                   flag=1;
                   break;
               }
         }
        }
        console.log(flag);
        if(flag==0)
         {
            $("#modifier").html("");
            modifierDiv=0;  
         }
}

let selectAll = (check) => {
    if (check.checked == true) {
        let para = `<div id="dpara">
                    <p>Total ${rowCount - 1} Row(s) Selected</p>
                    <button type="button" id=bid class="btn btn-danger pl-5 pr-5" onClick="deleteAllData()">Delete All</button>
                </div>`;
        $("#upCheckbox").append(para);
        for (let e = 0; e < rowCount; e++) {
            let element = $(`#check${e + 1}`);
            if (element.length!=0) {
                $(`#check${e + 1}`).prop('checked', true);
                $(`#del${e + 1}`).prop('disabled', true);
            }
        }
        let modiDiv = `<div id="cdiv">Modify Above Selected Items</div>
                    <div id="d-flex">
                        <input type="text" id="color" placeholder="bg-color">
                        <select class="bg-light border ml-5" name="size" id="msize">
                            <option value="Large">Large</option>
                            <option value="Medium">Medium</option>
                            <option value="Small">Small</option>
                         </select>
                        <button type="button" id="app" class="btn btn-info pl-5 pr-5" onClick="applyData()">Apply</button>
                    </div>`;

        if(modifierDiv==0)
        {
            $("#modifier").append(modiDiv);
            modifierDiv=1;
        }
    }
    else {
        $("#dpara").remove();
        for (let e = 0; e < rowCount; e++) {
            let element = $(`#check${e + 1}`);
            if (element.length!=0) {
                $(`#check${e + 1}`).prop('checked', false);
                $(`#del${e + 1}`).prop('disabled', true);
            }
        }
        let flag=0;
        for (let e = 0; e < rowCount; e++) {
            let element = $(`#check${e + 1}`);
            if (element.length!=0) {
               if(!($(`#check${e+1}`).is(':checked')))
               {
                    flag=0;
               }
               else{
                   flag=1;
                   break;
               }
         }
        }
        if(flag==0)
         {
            $("#modifier").html("");
            modifierDiv=0;  
         }
        
    }
}

let checkClicked = (cbox) => {
    let rowNumber = cbox.id.substr(5);
   
    if (cbox.checked == true) {
     
        $(`#del${rowNumber}`).prop('disabled', false);
        let para = `<div id="cdiv">Modify Above Selected Items</div>
                    <div id="d-flex">
                        <input type="text" id="color" placeholder="bg-color">
                        <select class="bg-light border ml-5" name="size" id="msize">
                            <option value="Large">Large</option>
                            <option value="Medium">Medium</option>
                            <option value="Small">Small</option>
                         </select>
                        <button type="button" id="app" class="btn btn-info pl-5 pr-5" onClick="applyData()">Apply</button>
                    </div>`;

        if(modifierDiv==0)
        {
            $("#modifier").append(para);
            modifierDiv=1;
        }
        let qflag=0;
       
        for (let q = 0; q < ccount; q++) {
            
                let element = $(`#check${q + 1}`);
              
                if (element.length!=0) {
                    console.log("oooooo"+$(`#check${q+1}`).is(':checked')+q);
                    if($(`#check${q+1}`).is(':checked'))
                    {
                            qflag=1;
                            
                    }
                    else{
                        qflag=0;
                       break;
                    }
                }
              
        }
        console.log(qflag);
        if(qflag==1)
         {
           if($('#selectAll').is(':checked'))
            {
           
                let sdiv= `<input type="checkbox" id="selectAll" name="sa" onclick="selectAll(this)" checked><label class="pl-3" for="sa">Select All</label><br>
                            <div id="dpara">
                            <p>Total ${rowCount-1} Row(s) Selected</p>
                            <button type="button" id=bid class="btn btn-danger pl-5 pr-5" onClick="deleteAllData()">Delete All</button>
                        </div>`;
                $("#upCheckbox").html(sdiv);
            
             }
             else{
                $(`#selectAll`).prop('checked',true);
            let para = `<div id="dpara">
                        <p>Total ${rowCount - 1} Row(s) Selected</p>
                        <button type="button" id=bid class="btn btn-danger pl-5 pr-5" onClick="deleteAllData()">Delete All</button>
                        </div>`;
            $("#upCheckbox").append(para); 
        }
         }
     
    }
    else {
        $(`#del${rowNumber}`).prop('disabled', true);
       
        $("#dpara").remove();
        if($('#selectAll').is(':checked'))
        {
            for (let e = 0; e < ccount; e++) {
                let element = $(`#check${e + 1}`);
                if (element.length!=0) {
                    if($(`#check${e+1}`).is(':checked'))
                    {
                        $(`#del${e + 1}`).prop('disabled', false);
                    }
                }
            }
        }
        $(`#selectAll`).prop('checked', false);
        let flag=0;
        for (let e = 0; e < rowCount; e++) {
            let element = $(`#check${e + 1}`);
            if (element.length!=0) {
               if(!($(`#check${e+1}`).is(':checked')))
               {
                    flag=0;
               }
               else{
                   flag=1;
                   break;
               }
         }
        }
        if(flag==0)
         {
            $("#modifier").html("");
            modifierDiv=0;  
         }
        }

}

let deleteAllData = () => {
    // $("#userData").fadeOut("slow",function(){
    //     $(this).empty()
    // });
    for (let e = 0; e < ccount; e++) {
        let element = $(`#check${e + 1}`);
        if (element.length!=0) {
           if($(`#check${e+1}`).is(':checked'))
           {
                $(`#row${e+1}`).fadeOut("slow",function(){
                     $(this).remove();
                });
                rowCount--;
                
           }
          
     }
    }
    if(rowCount!=0)
    {
        $("#upCheckbox").html(`<input type="checkbox" id="selectAll" name="sa" onclick="selectAll(this)"><label class="pl-3" for="sa">Select All</label><br>`);

    }
    else{
        $("#upCheckbox").html("");
    }
    
    totalRecords.splice(0, totalRecords.length);
    $("#btnDiv").html(`<button type="button" id="addBtn" class="btn btn-default border border-primary pl-5 pr-5 ml-5" onclick="addData()" style="color:blue;">Add</button>`);
    
    $("#modifier").html("");
    modifierDiv=0;  
}

let applyData=()=>{
    let newColor=$("#color").val();
    let nc=`#${newColor}`;
    let newFont=$("#msize").val();
    for (let e = 0; e < rowCount; e++) {
        let element = $(`#check${e + 1}`);
        if (element.length!=0) {
            if($(`#check${e+1}`).is(':checked'))
            {
                $(`#first${e + 1}`).css({ "background-color": `${nc}`, "font-size": `${newFont}` });
                $(`#last${e + 1}`).css({ "background-color": `${nc}`, "font-size": `${newFont}` });
            }
        }
    }
    $("#color").val("");
}