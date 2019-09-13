$.ajax({
  url: "/company/all",
  type: 'GET',
  dataType: 'json',
  success: function (companies) {
      getCompanies(companies)
  }
});

function getCompanies(companies) {
    let str = ""
    companies.forEach(company => {
      if(!company.rating){
        company.rating = "Not Rated Yet"
      }
      else{
          company.rating = `${company.rating}/5`
      }
        str += `
        <a href="/company/${company._id}" target = "_blank" class ="companyCard">
        
        <div class="container1"> 
          <div class="row">
            <div class="col-md-3">
              <div class="card-deck">         
                <div class="card card-section">

                  <img class="card-img-top company-logo" src="${company.logo}" alt="${company.companyName}">
                  <h4 class="company-title">${company.companyName}</h4>
                  <p class="card-text" id="location"><i class="fa fa-map-marker icon"></i>${company.city}, ${company.country}</p>
                  <p class="card-text" id="field"><i class='fas fa-briefcase icon'></i>${company.department}</p>
                  <p class="card-text" id="rating">${company.rating}</p>
                  <button class="btn btn-primary" id="button">Read reviews</button>

                </div>
              </div>
            </div>
          </div>
        </div>
        </a>` 
});
    
    $('#company').html(str);
}
