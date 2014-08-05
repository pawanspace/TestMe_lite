var CheckBoxApp = CheckBoxApp || {};

CheckBoxApp.Observer = function(checkbox){
  this.element = checkbox;
  
  $(checkbox).click(function(){
    if($(this).prop('checked')){
      CheckBoxApp.currentlySelected++;
    }else{
      CheckBoxApp.currentlySelected--; 
    }
    CheckBoxApp.masterSelector.trigger('child-changed');
  });

};

CheckBoxApp.Observer.prototype.notify = function(checked){
  this.toggle(checked);  
};

CheckBoxApp.Observer.prototype.toggle = function(checked){
  $(this.element).prop('checked', checked);
};


$(document).ready(function(){
  
  var observers = [];
  
  var allCheckBoxes =  $('.checkbox input[type=checkbox]');
  CheckBoxApp.currentlySelected = 0;
  
  $.each(allCheckBoxes, function(){
      observers.push(new CheckBoxApp.Observer(this));
  });
  
  
  CheckBoxApp.masterSelector = $('#rootSelector');
  
  CheckBoxApp.masterSelector.click(function(){
    var isChecked = CheckBoxApp.masterSelector.prop('checked');
    CheckBoxApp.currentlySelected = isChecked ? observers.length : 0;
    $.each(observers, function(){
      this.notify(isChecked);
    });
  });
  
  
  CheckBoxApp.masterSelector.on('child-changed', function(){
    if(observers.length !== CheckBoxApp.currentlySelected){
      CheckBoxApp.masterSelector.prop('checked', false);        
    } else {
      CheckBoxApp.masterSelector.prop('checked', true);        
    }
  });
  

  $('#myForm').submit(function(event){

    if(CheckBoxApp.currentlySelected <= 0){
      alert("Please choose atleast one item!");
      event.preventDefault();
    }
    else if(CheckBoxApp.currentlySelected === 1){
      if($('.checkbox input:checked[type=checkbox]').val() === 'language'){
        alert("Please choose more items!");
        event.preventDefault();
      }
    }
  })
  
});