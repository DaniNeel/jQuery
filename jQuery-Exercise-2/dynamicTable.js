let totalRecords = [];
let rowCount = 0;
let modifierDiv = 0;
let ccount = 0;
let id=1;
var hexDigits = new Array
    ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

//Function to convert rgb color to hex format
const rgb2hex = (rgb) => {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

const hex = (x) => {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}
const addData = () => {
    const firstName = $("#fname").val().trim().split(" ");
    const lastName = $("#lname").val().trim().split(" ");
    const bgColor = $("#bg").val().trim().split(" ");
    const txtSize = $("#size").val();
    let bgcheck = `#${bgColor[0]}`;

    if (firstName[0] == "" || lastName[0] == "" || bgColor[0] == "") {
        alert("All fields are Required");
    }
    else {
        if (!(/^#[0-9A-F]{6}$/i.test(bgcheck))) {
            alert("please enter valid 6 digit color hex code");
        } else {
            let objAdd = firstName[0] + lastName[0];
            if (totalRecords.includes(objAdd)) {
                alert("Object Already Exists");
            }
            else {
                totalRecords.push(objAdd);
                for(let i=0;i<ccount;i++)
                {
                    if($(`#row${i+1}`).length==0)
                    {

                    }
                }
                
                let checkId = `check${id}`;
                let firstId = `first${id}`;
                let lastId = `last${id}`;
                let editId = `edit${id}`;
                let delId = `del${id}`;
                let rowId = `row${id}`;
                let rowHtml = $(`<tr id=${rowId}>
                                        <th><input type="checkbox" id=${checkId} onclick="checkClicked(this)"></th>
                                        <th><input type="text" id=${firstId} value=${firstName[0]} style="background-color: #${bgColor[0]};font-size:${txtSize}" readOnly></th>
                                        <th><input type="text" id=${lastId} value=${lastName[0]} style="background-color: #${bgColor[0]};font-size:${txtSize}" readOnly></th>
                                        <th><button type="button" class="btn btn-success pl-5 pr-5" id=${editId} onClick="editData(this.id)">Edit</button></th>
                                        <th><button type="button" class="btn btn-danger pl-5 pr-5" id=${delId} onClick="deleteData(this.id)">Delete</button></th>
                                    </tr>`);
                rowHtml.hide();
                $("#userData").append(rowHtml);

                rowHtml.fadeIn(2000);
                $("#fname").val("");
                $("#lname").val("");
                $("#bg").val("");




                if (totalRecords.length != 0) {
                    if ($('#selectAll').is(':checked')) {
                        $("#sAll").html(`<input type="checkbox" id="selectAll" name="sa" onclick="selectAll(this)"><label class="pl-3" for="sa">Select All</label><br>`);
                   
                        let sdiv = `<div id="dpara">
                                            <p>Total ${rowCount} Row(s) Selected</p>
                                            <button type="button" id=bid class="btn btn-danger pl-5 pr-5" onClick="deleteAllData()">Delete All</button>
                                        </div>`;
                        $("#upCheckbox").html(sdiv);

                    }
                    else {
                        $("#sAll").html(`<input type="checkbox" id="selectAll" name="sa" onclick="selectAll(this)"><label class="pl-3" for="sa">Select All</label><br>`);
                   
                    }
                }
                rowCount++;
                id++;
                ccount++
            }
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

    if ($("#fname").val().trim().split(" ")[0] == "" || $("#lname").val().trim().split(" ")[0] == "" || $("#bg").val().trim().split(" ")[0] == "") {
        alert("all are Required");
    }
    else {


        let fN = $("#fname").val().trim().split(" ");
        let lN = $("#lname").val().trim().split(" ");
        let bg = $("#bg").val().trim().split(" ");
        let tx = $("#size").val();
        let bgc = `#${bg[0]}`;
        if (!(/^#[0-9A-F]{6}$/i.test(bgc))) {
            alert("please enter valid 6 digit color hex code");
        }
        else {


            let objAddUpdated = fN[0] + lN[0];

            totalRecords.push(objAddUpdated);


            $(`#first${id}`).val(fN[0]);
            $(`#last${id}`).val(lN[0]);
            $(`#first${id}`).css({ "background-color": `${bgc}`, "font-size": `${tx}` });
            $(`#last${id}`).css({ "background-color": `${bgc}`, "font-size": `${tx}` });


            $("#fname").val("");
            $("#lname").val("");
            $("#bg").val("");
            $("#btnDiv").html(`<button type="button" id="addBtn" class="btn btn-default border border-primary pl-5 pr-5 ml-5" onclick="addData()" style="color:blue;">Add</button>`);


        }
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

    

    $(`#row${rowNumber}`).fadeOut("slow", function () {
        $(this).remove();
    });
    rowCount--;

    $("#fname").val("");
    $("#lname").val("");
    $("#btnDiv").html(`<button type="button" id="addBtn" class="btn btn-default border border-primary pl-5 pr-5 ml-5" onclick="addData()" style="color:blue;">Add</button>`);
    let counter3=0;
    for (let s = 0; s < ccount; s++) {

        let element = $(`#check${s + 1}`);

        if (element.length != 0) {

            if ($(`#check${s + 1}`).is(':checked')) {
                counter3++;

            }

        }

    }
 
    if(counter3!=0)
    {
        if (counter3 == (rowCount)) {
        
            $("#sAll").html(`<input type="checkbox" id="selectAll" name="sa" onclick="selectAll(this)" checked><label class="pl-3" for="sa">Select All</label><br>`);

            let sdiv1 = `<div id="dpara">
                                        <p>Total ${counter3} Row(s) Selected</p>
                                        <button type="button" id=bid class="btn btn-danger pl-5 pr-5" onClick="deleteAllData()">Delete All</button>
                                        </div>`;
            $("#upCheckbox").html(sdiv1);
          
        }
        else {
            $("#sAll").html(`<input type="checkbox" id="selectAll" name="sa" onclick="selectAll(this)"><label class="pl-3" for="sa">Select All</label><br>`);
            let sdiv2 = `<div id="dpara">
                                    <p>Total ${counter3} Row(s) Selected</p>
                                    <button type="button" id=bid class="btn btn-danger pl-5 pr-5" onClick="deleteAllData()">Delete All</button>
                                    </div>`;
            $("#upCheckbox").html(sdiv2);
        }
    }
    else{
        $("#sAll").html(`<input type="checkbox" id="selectAll" name="sa" onclick="selectAll(this)"><label class="pl-3" for="sa">Select All</label><br>`);
        
        $("#upCheckbox").html("");
    }

    let flag = 0;
    for (let p = 0; p < ccount; p++) {
        let element = $(`#check${p + 1}`);
        if (element.length != 0) {
            if (!($(`#check${p + 1}`).is(':checked'))) {
                flag = 0;
            }
            else {
                flag = 1;
                break;
            }
        }
    }
    console.log(flag);
    if (flag == 0) {
        $("#modifier").html("");
        modifierDiv = 0;
    }
}

let selectAll = (check) => {
    if (check.checked == true) {
       
        $("#sAll").html(`<input type="checkbox" id="selectAll" name="sa" onclick="selectAll(this)" checked><label class="pl-3" for="sa">Select All</label><br>`);

        let para = `<div id="dpara">
                    <p>Total ${rowCount} Row(s) Selected</p>
                    <button type="button" id=bid class="btn btn-danger pl-5 pr-5" onClick="deleteAllData()">Delete All</button>
                </div>`;
        $("#upCheckbox").html(para);
        for (let e = 0; e < ccount; e++) {
            let element = $(`#check${e + 1}`);
            if (element.length != 0) {
                $(`#check${e + 1}`).prop('checked', true);

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

        if (modifierDiv == 0) {
            $("#modifier").append(modiDiv);
            modifierDiv = 1;
        }
    }
    else {
       
        $("#dpara").remove();
        for (let e = 0; e < ccount; e++) {
            let element = $(`#check${e + 1}`);
            if (element.length != 0) {
                $(`#check${e + 1}`).prop('checked', false);

            }
        }
        let flag = 0;
        for (let e = 0; e <ccount; e++) {
            let element = $(`#check${e + 1}`);
            if (element.length != 0) {
                if (!($(`#check${e + 1}`).is(':checked'))) {
                    flag = 0;
                }
                else {
                    flag = 1;
                    break;
                }
            }
        }
        if (flag == 0) {
            $("#modifier").html("");
            modifierDiv = 0;
        }

    }
}

let checkClicked = (cbox) => {
    let rowNumber = cbox.id.substr(5);

    if (cbox.checked == true) {


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

        if (modifierDiv == 0) {
            $("#modifier").append(para);
            modifierDiv = 1;
        }
        let counter = 0;
        for (let s = 0; s < ccount; s++) {

            let element = $(`#check${s + 1}`);

            if (element.length != 0) {

                if ($(`#check${s + 1}`).is(':checked')) {
                    counter++;

                }

            }

        }
     

        if (counter == (rowCount)) {
           
            $("#sAll").html(`<input type="checkbox" id="selectAll" name="sa" onclick="selectAll(this)" checked><label class="pl-3" for="sa">Select All</label><br>`);

            let sdiv1 = `<div id="dpara">
                                        <p>Total ${counter} Row(s) Selected</p>
                                        <button type="button" id=bid class="btn btn-danger pl-5 pr-5" onClick="deleteAllData()">Delete All</button>
                                        </div>`;
            $("#upCheckbox").html(sdiv1);
           
        }
        else {
            $("#sAll").html(`<input type="checkbox" id="selectAll" name="sa" onclick="selectAll(this)"><label class="pl-3" for="sa">Select All</label><br>`);
            let sdiv2 = `<div id="dpara">
                                    <p>Total ${counter} Row(s) Selected</p>
                                    <button type="button" id=bid class="btn btn-danger pl-5 pr-5" onClick="deleteAllData()">Delete All</button>
                                    </div>`;
            $("#upCheckbox").html(sdiv2);
        }

    }
    else {


        $("#dpara").remove();
        if ($('#selectAll').is(':checked')) {
            for (let e = 0; e < ccount; e++) {
                let element = $(`#check${e + 1}`);
                if (element.length != 0) {
                    if ($(`#check${e + 1}`).is(':checked')) {
                        $(`#del${e + 1}`).prop('disabled', false);
                    }
                }
            }
        }
        $(`#selectAll`).prop('checked', false);
        let flag = 0;
        for (let e = 0; e < ccount; e++) {
            let element = $(`#check${e + 1}`);
            if (element.length != 0) {
                if (!($(`#check${e + 1}`).is(':checked'))) {
                    flag = 0;
                }
                else {
                    flag = 1;
                    break;
                }
            }
        }
        if (flag == 0) {
            $("#modifier").html("");
            modifierDiv = 0;
        }
    }
    let counter1 = 0;
    for (let s = 0; s < ccount; s++) {

        let element = $(`#check${s + 1}`);

        if (element.length != 0) {

            if ($(`#check${s + 1}`).is(':checked')) {
                counter1++;

            }

        }

    }

    if (counter1 == 0) {
        $("#upCheckbox").html("");
    } else {
        let para2 = `<div id="dpara">
        <p>Total ${counter1} Row(s) Selected</p>
        <button type="button" id=bid class="btn btn-danger pl-5 pr-5" onClick="deleteAllData()">Delete All</button>
        </div>`;
        $("#upCheckbox").html(para2);
    }
   

}

let deleteAllData = () => {
    // $("#userData").fadeOut("slow",function(){
    //     $(this).empty()
    // });
    for (let e = 0; e < ccount; e++) {
        let element = $(`#check${e + 1}`);
        if (element.length != 0) {
            if ($(`#check${e + 1}`).is(':checked')) {
                
                 let ftoDelete = $(`#first${e+1}`).val();
                let ltoDelete = $(`#last${e+1}`).val();
                    let objtoDelete = ftoDelete + ltoDelete;
                    let Dindex = totalRecords.indexOf(objtoDelete);
                totalRecords.splice(Dindex, 1);
                $(`#row${e + 1}`).fadeOut("slow", function () {
                    $(this).remove();
                });
                rowCount--;

            }

        }
    }
    if (rowCount != 0) {
        $("#sAll").html(`<input type="checkbox" id="selectAll" name="sa" onclick="selectAll(this)"><label class="pl-3" for="sa">Select All</label><br>`);
        $("#upCheckbox").html("");
           
    }
    else {
        $("#sAll").html("");
        $("#upCheckbox").html("");
    }

    
    
    $("#modifier").html("");
    modifierDiv = 0;
}

let applyData = () => {
    let newColor = $("#color").val();
    let nc = `#${newColor}`;
    if (!(/^#[0-9A-F]{6}$/i.test(nc))) {
        alert("please enter valid 6 digit color hex code");
    }
    else {

        let newFont = $("#msize").val();
        for (let e = 0; e < ccount; e++) {
            let element = $(`#check${e + 1}`);
            if (element.length != 0) {
                if ($(`#check${e + 1}`).is(':checked')) {
                    $(`#first${e + 1}`).css({ "background-color": `${nc}`, "font-size": `${newFont}` });
                    $(`#last${e + 1}`).css({ "background-color": `${nc}`, "font-size": `${newFont}` });
                }
            }
        }
        $("#color").val("");
    }
}