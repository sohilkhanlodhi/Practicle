
$(document).ready(function () {
    loadData();
});


function loadData() {
    $.ajax({
        url: "/Student/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Address + '</td>';
                html += '<td>' + item.Gender + '</td>';
                html += '<td>' + item.City + '</td>';
                html += '<td>' + item.Mobile + '</td>';
                html += '<td><a href="#"class="btn btn-primary" onclick="return getbyID(' + item.Id + ')">Edit</a> | <a href="#"class="btn btn-danger" onclick="Delele(' + item.Id + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function getbyID(StudID) {

    $('#Name').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');
    $('#Gender').css('border-color', 'lightgrey');
    $('#City').css('border-color', 'lightgrey');
    $('#Mobile').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Student/getbyID/" + StudID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
            $('#Address').val(result.Address);

          
         

            $('#Gender').val(result.Gender);
            $('#City').val(result.City);
            $('#Mobile').val(result.Mobile);

            var Data = result.Image;
            if (Data != null && Data != "") {
                var ImgPath = result.Image;
                $('#previewHolder').attr('src', "../../Gallery/Image/" + ImgPath);
            }

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}





function Add() {
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        toastr.error("Please Enter Name");
        $('#Name').focus();
        return false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }

    if ($('#Address').val().trim() == "") {
        $('#Address').css('border-color', 'Red');
        toastr.error("Please Enter Address");
        $('#Address').focus();
        return false;
    }
    else {
        $('#Address').css('border-color', 'lightgrey');
    }

    if ($('#City').val().trim() == "") {
        $('#City').css('border-color', 'Red');
        toastr.error("Please Enter City");
        $('#City').focus();
        return false;
    }
    else {
        $('#City').css('border-color', 'lightgrey');
    }

    if (isNaN($('#Mobile').val()) || $('#Mobile').val().length != 10) {
        $('#Mobile').css('border-color', 'Red');
        toastr.error("Please Enter 10 digit Mobile No.");
        $('#Mobile').focus();
        return false;
    }
    else {
        $('#Mobile').css('border-color', 'lightgrey');
    }


    var ProfileImgfileUpload = $("#Image").get(0);
    var Image = ProfileImgfileUpload.files;

    var ChkGender;
    if ($('#Gender').is(":checked")) {
        ChkGender = "Male";
    }
    else {
        ChkGender = "Female";
    }

    var fileData = new FormData();
    fileData.append("Id", $("#Id").val());

    fileData.append("Name", $("#Name").val());
    fileData.append("Address", $("#Address").val());
    fileData.append("Gender", ChkGender);
    fileData.append("City", $("#City").val());
    fileData.append("Mobile", $("#Mobile").val());
    fileData.append("Image", Image[0]);



    $.ajax({
        type: "POST",
        url: "/Student/Add",
        data: fileData,
        contentType: false,
        processData: false,
        dataType: "json",
        enctype: 'multipart/form-data',
        success: function (result) {
            if (result.Status == "0") {
                toastr.error(result.Message, "Error");
            }
            else {
                toastr.success(result.Message, "Success");
               
                clearTextBox();

                $('#myModal').modal('hide');
            }
            loadData();
     
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}




function Update() {
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        toastr.error("Please Enter Name");
        $('#Name').focus();
        return false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }

    if ($('#Address').val().trim() == "") {
        $('#Address').css('border-color', 'Red');
        toastr.error("Please Enter Address");
        $('#Address').focus();
        return false;
    }
    else {
        $('#Address').css('border-color', 'lightgrey');
    }

    if ($('#City').val().trim() == "") {
        $('#City').css('border-color', 'Red');
        toastr.error("Please Enter City");
        $('#City').focus();
        return false;
    }
    else {
        $('#City').css('border-color', 'lightgrey');
    }

    if (isNaN($('#Mobile').val()) || $('#Mobile').val().length != 10) {
        $('#Mobile').css('border-color', 'Red');
        toastr.error("Please Enter 10 digit Mobile No.");
        $('#Mobile').focus();
        return false;
    }
    else {
        $('#Mobile').css('border-color', 'lightgrey');
    }

    var ProfileImgfileUpload = $("#Image").get(0);
    var Image = ProfileImgfileUpload.files;

    var ChkGender;
    if ($('#Gender').is(":checked")) {
        ChkGender = "Male";
    }
    else {
        ChkGender = "Female";
    }

    var fileData = new FormData();
    fileData.append("Id", $("#Id").val());

    fileData.append("Name", $("#Name").val());
    fileData.append("Address", $("#Address").val());
    fileData.append("Gender", ChkGender);
    fileData.append("City", $("#City").val());
    fileData.append("Mobile", $("#Mobile").val());
    fileData.append("Image", Image[0]);

    $.ajax({
        type: "POST",
        url: "/Student/Update",
        data: fileData,
        contentType: false,
        processData: false,
        dataType: "json",
        enctype: 'multipart/form-data',
        success: function (result) {
            if (result.Status == "0") {
                toastr.error(result.Message, "Error");
            }
            else {
                toastr.success(result.Message, "Success");

                clearTextBox();

                $('#myModal').modal('hide');
            }
            loadData();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    
}


function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Student/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                if (result.Status == "0") {
                    toastr.error(result.Message, "Error");
                }
                else {
                    toastr.success(result.Message, "Success");
                    loadData();

                    $('#myModal').modal('hide');
                }
               
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}


function clearTextBox() {
    $('#Id').val("");
    $('#Name').val("");
    $('#Address').val("");
    $('#Gender').val("");
    $('#City').val("");
    $('#Mobile').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');
    $('#Gender').css('border-color', 'lightgrey');
    $('#City').css('border-color', 'lightgrey');
    $('#Mobile').css('border-color', 'lightgrey');
}
 