console.log("hi")
$('#employeeLogin').submit(function (e) {
    $('.errorMessage').text('');
    let formEmployee = $('#employeeLogin');
    let endpoint = formEmployee.attr('action');
    let userCredentials = formEmployee.serialize();
    e.preventDefault();
    $.ajax({
        url: endpoint,
        type: 'POST',
        data: userCredentials,
        success: function (locationToRedirect) {
            window.location = locationToRedirect
        },
        error: function (xhr) {
            $('.errorMessage').append(xhr.responseText);
        }

    });
});