$(document).ready(function(){

    /* for the sticky nav  */
    
      $('.blog__content--container').waypoint(function(direction){
        if (direction == 'down'){
          $('.blog__content--container').addClass('sticky');
        }else{
           $('.blog__content--container').removeClass('sticky');
        }
      },{
        offset: '60px;'
      }
    )
})