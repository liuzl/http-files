// Initialize the editor with a JSON schema
var editor = new JSONEditor(document.getElementById('editor_holder'), {
  ajax: true, disable_properties: true,
  schema: { $ref: "./schema/crawler_item.json" }, startval: null
});

var indicator = document.getElementById('valid_indicator');

function submit() {
    var errors = editor.validate();
    if (errors.length) {
        indicator.style.color = 'red';
        var err = errors[0].path + ": " + errors[0].message;
        indicator.textContent = err;
        return
    }

    $.ajax({
      type: "POST",
      url: "/api/crawler/create/" + editor.getValue().crawler_name,
      dataType: "json",
      data: JSON.stringify(editor.getValue()),
      success: function(data) {
        indicator.style.color = 'green';
        indicator.textContent = JSON.stringify(data);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        indicator.style.color = 'red';
        indicator.textContent = XMLHttpRequest.responseText;
      }
    });
}

document.getElementById('submit').addEventListener('click', submit);

editor.on('change',function() {
  var errors = editor.validate();
  if (errors.length) {
    indicator.style.color = 'red';
    indicator.textContent = "not valid";
  } else {
    indicator.style.color = 'green';
    indicator.textContent = "valid";
  }
});

document.getElementById('restore').addEventListener('click',function() {
  $.getJSON("default.json", function(result) {
    editor.setValue(result);
    console.log(JSON.stringify(result));
  });
});

