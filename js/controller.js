$(document).ready(function () {




  $('.date').mask('11/11/1111');
  $('.time').mask('00:00:00');
  $('.date_time').mask('00/00/0000 00:00:00');
  $('.cep').mask('00000-000');
  $('.phone').mask('0000-0000');
  $('.mobile').mask('9999-99999');
  $('.phone_with_ddd').mask('(00) 0000-0000');
  $('.cpf').mask('000.000.000-00', {reverse: true});
  $('.money').mask('000.000.000.000.000,00', {reverse: true});




    var urlApi = "http://dev.portaladminv2.com/api/v1/";

  $(".nav-tabs li").removeClass("disabled");
  $(".nav-tabs li a[data-toggle=tab]").on("click", function (e) {
    if ($(this).parent().hasClass("disabled")) {
      e.preventDefault();
      return false;
    }
  });

  function enabledAndDisabledTab(tabDisabled, tabEnabled) {
    $(".nav-tabs " + tabDisabled).removeClass("active");
    $(".nav-tabs " + tabDisabled).addClass("disabled");

    $(".nav-tabs " + tabEnabled).removeClass("disabled");
    $(".nav-tabs " + tabEnabled).addClass("active");
  }

  function enabledAndDisabledTabContent(tabContentDisabled, tabContentEnabled) {
    $(".tab-content " + tabContentDisabled).removeClass("active");
    $(".tab-content " + tabContentDisabled).addClass("disabled");

    $(".tab-content " + tabContentEnabled).removeClass("disabled");
    $(".tab-content " + tabContentEnabled).addClass("active");
  }

  function addForm(classForm, classFormContainer) {
    var form = $($(classForm).first());
    let indexForm = $(classForm).length;
    var formClone = form.clone();
    var fields = formClone.find('.form-control');
    $.each(fields, function (index, field) {
      var fieldname = $(field).attr('name');
      $(field).val("");
      var newName = fieldname.replace(/\[\d+\]/, "[" + indexForm + "]");
      $(field).attr('name', newName);
    });
    $(classFormContainer).append("<hr>");
    $(classFormContainer).append(formClone);
    removeForm(classForm);
    searchCep();
  }

  function removeForm(classForm) {

    $(classForm + " .close").click(function () {
      if ($(classForm).length > 1) {
        $(this).parent('div').parent('div').parent(classForm).remove();
      }
    });

  }

  removeForm('.addresses');
  removeForm('.contacts');
  removeForm('.documents');
  removeForm('.languages');
  removeForm('.dependents');

  $("#add-address").click(function () {
    addForm('.addresses', '.addresses-container');
  });

  $("#add-contacts").click(function () {
    addForm('.contacts', '.contacts-container');
  });

  $("#add-documents").click(function () {
    addForm('.documents', '.documents-container');
  });

  $("#add-languages").click(function () {
    addForm('.languages', '.languages-container');
  });

  $("#add-dependents").click(function () {
    addForm('.dependents', '.dependents-container');
  });

  var registration_user_data = "";
  var registration_addresses = "";
  var registration_professional_data = "";
  var registration_phone_numbers = "";
  var registration_documents = "";
  var registration_languages = "";
  var registration_dependents = "";

  $("#registration_user_data").validate({
    submitHandler: function (form) {
      registration_user_data = $(form).serialize();

      $.ajax({
        url: urlApi + "validate/step",
        type: "POST",
        headers: {
          "Accept": "application/json"
        },
        data: $(form).serialize() + "&system_token=PcyG24nCJcsxvChVJmAmzuHPGzhHa2rJ",
        success: function (data) {
          enabledAndDisabledTab('.step1', '.step2');
          enabledAndDisabledTabContent('#step1', '#step2');
        }
      });
      return false;
    },
    rules: {
            "registration_user_data[full_name]" : {required: true},
            //"registration_user_data[cpf]" : {required: true},
            "registration_user_data[date_of_birth]" : {required: true},
            "registration_user_data[mothers_name]" : {required: true},
            "registration_user_data[fathers_name]" : {required: true},
            "registration_user_data[gender]" : {required: true},
            "registration_user_data[civil_status]" : {required: true},
            "registration_user_data[breed]" : {required: true},
            "registration_user_data[email]" : {required: true, email: true},
            "registration_user_data[alternative_email]" : {required: false, email: true}
            




        },
        messages: {
            "registration_user_data[full_name]" : {required : "Campo obrigatório"},
            "registration_user_data[date_of_birth]" : {required: "Campo obrigatório"},
            "registration_user_data[mothers_name]" : {required: "Campo obrigatório"},
            "registration_user_data[fathers_name]" : {required: "Campo obrigatório"},
            "registration_user_data[gender]" : {required: "Campo obrigatório"},
            "registration_user_data[civil_status]" : {required: "Campo obrigatório"},
            "registration_user_data[breed]" : {required: "Campo obrigatório"},
            "registration_user_data[email]" : {required: "Campo obrigatório", email: "Preencha um e-mail válido"},            
            "registration_user_data[alternative_email]" : {email: "Preencha um e-mail válido"}      

        }
  });

  $("#registration_addresses").validate({
    submitHandler: function (form) {
      registration_addresses = $(form).serialize();

      $.ajax({
        url: urlApi + "validate/step",
        type: "POST",
        headers: {
          "Accept": "application/json",
        },
        data: $(form).serialize() + "&system_token=PcyG24nCJcsxvChVJmAmzuHPGzhHa2rJ",
        success: function (data) {
          enabledAndDisabledTab('.step2', '.step3');
          enabledAndDisabledTabContent('#step2', '#step3');
        }
      });

      return false;
    }
  });

  $("#registration_professional_data").validate({
    submitHandler: function (form) {
      registration_professional_data = $(form).serialize();

      $.ajax({
        url: urlApi + "validate/step",
        type: "POST",
        headers: {
          "Accept": "application/json",
        },
        data: $(form).serialize() + "&system_token=PcyG24nCJcsxvChVJmAmzuHPGzhHa2rJ",
        success: function (data) {
          enabledAndDisabledTab('.step3', '.step4');
          enabledAndDisabledTabContent('#step3', '#step4');
        }
      });

      return false;
    }
  });

  $("#registration_phone_numbers").validate({
    submitHandler: function (form) {
      registration_phone_numbers = $(form).serialize();

      $.ajax({
        url: urlApi + "validate/step",
        type: "POST",
        headers: {
          "Accept": "application/json",
        },
        data: $(form).serialize() + "&system_token=PcyG24nCJcsxvChVJmAmzuHPGzhHa2rJ",
        success: function (data) {
          enabledAndDisabledTab('.step4', '.step5');
          enabledAndDisabledTabContent('#step4', '#step5');
        }
      });

      return false;
    }
  });

  $("#registration_documents").validate({
    submitHandler: function (form) {
      registration_documents = $(form).serialize();

      $.ajax({
        url: urlApi + "validate/step",
        type: "POST",
        headers: {
          "Accept": "application/json",
        },
        data: $(form).serialize() + "&system_token=PcyG24nCJcsxvChVJmAmzuHPGzhHa2rJ",
        success: function (data) {
          enabledAndDisabledTab('.step5', '.step6');
          enabledAndDisabledTabContent('#step5', '#step6');
        }
      });
      return false;
    }
  });

  $("#registration_languages").validate({
    submitHandler: function (form) {
      registration_languages = $(form).serialize();

      $.ajax({
        url: urlApi + "validate/step",
        type: "POST",
        headers: {
          "Accept": "application/json",
        },
        data: $(form).serialize() + "&system_token=PcyG24nCJcsxvChVJmAmzuHPGzhHa2rJ",
        success: function (data) {
          enabledAndDisabledTab('.step6', '.step7');
          enabledAndDisabledTabContent('#step6', '#step7');
        }
      });
      return false;
    }
  });

  $("#registration_dependents").validate({
    submitHandler: function (form) {
      registration_dependents = $(form).serialize();
      var registration_all_data = registration_user_data + "&" + registration_addresses + "&" + registration_professional_data + "&" + registration_phone_numbers + "&" + registration_documents + "&" + registration_languages + "&" + registration_dependents;

      $.ajax({
        url: urlApi + "registration/create",
        type: "POST",
        headers: {
          "Accept": "application/json",
        },
        data: registration_all_data + "&system_token=PcyG24nCJcsxvChVJmAmzuHPGzhHa2rJ",
        success: function (data) {
          console.log('cadastro realizado');
        }
      });
      return false;
    }
  });
});
