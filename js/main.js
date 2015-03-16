var eventNum;
var current;

//click on 'new' at main page
$("#goto-new-note").on("singletap", function() {
$.UIGoToArticle("#note-new");
});

//click on 'back' at view event
$("#goto-home").on("singletap", function() {
$.UIGoToArticle("#home");
});

//range control 
$('#rangeValue1').html($('#rangeControl1').val());

$('#rangeControl1').on('change', function() {
    $('#rangeValue1').html($(this).val());
});

$('#rangeValue2').html($('#rangeControl2').val());

$('#rangeControl2').on('change', function() {
    $('#rangeValue2').html($(this).val());
});

 //delete an event
$("#delete-invite").on("singletap", function() {
    $.UIPopup({
        id: "warning",
        title: 'Attention!',
        message: 'Do you really want to delete this event?',
        cancelButton: 'No',
        continueButton: 'Yes',
        callback: function() {
            delete notes[eventNum];
            current.remove();
            $.UIGoToArticle("#home");
        }
    });
   
});

var notes = [
    { title: "SimpleNote Intro", content: "SimpleNote is built with ChocolateChip-UI", location: "", day: "", month: "" }
];


//populate notes list
for (var i = 1; i < notes.length; i++) {
     listNode(i);
}   


function listNode(id) {
$("#home-note-list").append("<li class='nav' id='" + id + "' data-id='" + id + "'>" +
"<h3>" + notes[id].title + "</h3>" +
"<h4>" + notes[id].content.substr(0, 30) + "...</h4>" +
"</li>");
}

//to link to the correct note
$("#home-note-list").on("singletap", "li", function() {
    var id = $(this).data("id"); // read the data-id from note item
    eventNum = id;
    current = this;
    viewNote(id);
});

function viewNote(id) {
    $("#note-view").data("id", id);
    $("#note-view .event-title").text(notes[id].title); // change title
    $("#note-view .event-details").html(notes[id].content); // change content
    $("#note-view .event-location").text(notes[id].location); // change location
    $("#note-view .event-day").text(notes[id].day); // change location
    $("#note-view .event-month").text(notes[id].month); // change location

    $.UIGoToArticle("#note-view");
}

//handle creating new note
$("#note-new-save").on("singletap", function() {
    var title = $("#event-new-title").val();
    var details = $("#event-new-details").val();
    var location = $("#event-new-location").val();
    var day = $("#rangeControl1").val();
    var month = $("#rangeControl2").val();
    
    // if title is empty, set it to "New Note"
    if (title.length < 1) {
        title = "New Event";
    }
   
    $("#invite-response").html("");
    initDeletables();
    addNote(title, details, location, day, month);
    
});

function addNote(title, content, location, day, month) {
    // push the new note to notes array
    notes.push({title: title, content: content, location: location, day: day, month: month});
    // display to note we just added
    listNode(notes.length - 1);
    // clear the form values
    $("#event-new-title").val("");
    $("#event-new-details").val("");
    $("#event-new-location").val("");
    $("#rangeValue1").val("");
    $("#rangeValue2").val("");
    // view the note
    viewNote(notes.length - 1);
}


var names = [
    { name: "" }
];


for (var i = 1; i < names.length; i++) {
    listName(i);
}

function listName(id) {
    $("#people-list").append("<li>" + "<h3>" + names[id].name + "</h3>" + "</li>");
}

//when button is pressed
$("#send-invite").on("singletap", function() {
   var name = $("#event-new-people").val();
    
    // if content is empty, display a popup dialog
    if (name.length < 1) {
        $.UIPopup({
            id: "note-new-warning",
            title: 'Name is empty!',
            message: 'Please enter a name',
            continueButton: 'Okay',
            
        });
    } else {
        $("#invite-response").html("Invite sent to " + name);
        addName(name);
    }
});

function addName(name) {
    // push the new note to notes array
    names.push({name: name});
    // display to note we just added
    listName(names.length - 1);
    // clear the form values
    $("#event-new-people").val("");
}
  
function initDeletables() { 
    $.UIDeletable({
        list: '#people-list', // UIDeletable acts on #list1
    });
}




