const searchBar = $('#searchBar');
searchBar.keyup((e) => {
    $('#suggestions').html('');
    let query = searchBar.val();
    if (!query) {
        return
    }
    findCompanyMatches(query);
})

function findCompanyMatches(query) {
    let endpoint = '/company/search?q=' + query
    $.ajax({
        url: endpoint,
        type: 'GET',
        success: function (companies) {
            displaySuggestions(companies)
        },
        error: function (xhr) {
            console.log("hi")
            console.log(xhr.responseText);
        }

    });
}

function displaySuggestions(companies) {
    let str = "";
    if (!companies.length) {
        $('#suggestions').html("<li class ='list-group-item'>No Match Found</li>");
        return
    }
    companies.forEach(company => {
        str += `<li class ="suggestion list-group-item"><a href="/company/${company._id}">${company.companyName}</a></li>`
    })
    $('#suggestions').html(str);
}