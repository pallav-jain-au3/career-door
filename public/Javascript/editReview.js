$('#editReview').submit(function (e) {
    
   let editReview = $('#editReview');
   let endpoint = editReview.attr('action');
   let reviewData= editReview.serialize();
   console.log(reviewData)
   e.preventDefault();
   $.ajax({
       url: endpoint,
       type: 'PUT',
       data: reviewData ,
       success: function(locationToRedirect){
           window.location = locationToRedirect;
       },
       error: function (xhr) {
           console.log(xhr.responseText);
       }

   });
});