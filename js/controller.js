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
  var urlPortal = "http://cms.portalmaisfoco.com.br/account/get_me/return.json/?access_token=";

  var access_token = getParameterByName('access_token');
  var user_data = "";

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
    // $(classFormContainer).append("<hr>");
    $(classFormContainer).append(formClone);
    removeForm(classForm);
    setUserId(user_data);
    searchCep();
  }

  function removeForm(classForm) {
    $(classForm + " .close").click(function () {
      if ($(classForm).length > 1) {
        $(this).parent('div').parent('div').parent(classForm).remove();
      }
    });
  }

  function serializeFormData(data, idForm) {
    var fields = $(idForm).find('.form-control');

    $.each(fields, function (index, field) {
      var nameField = $(field).attr('name');

      if($(field).attr('type') == 'file') {
        if(typeof $("input[name='"+nameField+"']")[0].files[0] !==  'undefined') {
          data.append(nameField, $("input[name='"+nameField+"']")[0].files[0]);
        }
      } else {
        data.append(nameField, $(field).val());
      }
    });
    return data;
  }

  function printErrorMsg (errors, divPrintErros) {
    $(divPrintErros).find("ul").html('');
    $(divPrintErros).css('display','block');
    $.each( errors, function( key, value ) {
      $(divPrintErros).find("ul").append('<li>'+value+'</li>');
    });
  }

  function clearErrorMsg(divClearError) {
    $(divClearError).find("ul").html('');
    $(divClearError).css('display', 'none');
  }

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  function setUserId(user_data) {
    var inputs_user_id = $('form').find('.user_id');

    $.each(inputs_user_id, function (index, field) {
      $(field).val(user_data.id);
    });
  }

  if(typeof access_token !== null) {
    $.ajax({
      async: false,
      url: urlPortal+access_token,
      type: "POST",
      headers: {
        "Accept": "application/json"
      },
      global: false,
      success: function (data) {
        user_data = data.result;
        setUserId(user_data);
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

  $("#registration_user_data").validate({
    submitHandler: function (form) {
      $.ajax({
        url: urlApi + "validate/step1",
        type: "POST",
        headers: {
          "Accept": "application/json"
        },
        data: $(form).serialize() + "&system_token=PcyG24nCJcsxvChVJmAmzuHPGzhHa2rJ",
        success: function (data) {
          if($.isEmptyObject(data.error)){
            clearErrorMsg("#step1 .print-error-msg");
            // enabledAndDisabledTab('.step1', '.step2');
            // enabledAndDisabledTabContent('#step1', '#step2');
          }else{
            printErrorMsg(data.error, "#step1 .print-error-msg");
          }
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
            "registration_user_data[alternative_email]" : {required: false, email: true},
            "registration_user_data[enrollment]" : {required: true},
            "registration_user_data[unit]" : {required: true},
            "registration_user_data[person_type]" : {required: true},
            "registration_user_data[user_id]" : {required: true}
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
            "registration_user_data[alternative_email]" : {email: "Preencha um e-mail válido"},
            "registration_user_data[enrollment]" : {required: "Campo obrigatório"},
            "registration_user_data[unit]" : {required: "Campo obrigatório"},
            "registration_user_data[person_type]" : {required: "Campo obrigatório"},
            "registration_user_data[user_id]" : {required: "Campo obrigatório"}
        }
  });

  $("#registration_addresses").validate({
    submitHandler: function (form) {
      var data = new FormData();

      data = serializeFormData(data, "#registration_addresses");
      data.append('system_token', "PcyG24nCJcsxvChVJmAmzuHPGzhHa2rJ");

      $.ajax({
        url: urlApi + "validate/step2",
        type: "POST",
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function (data) {
          if($.isEmptyObject(data.error)){
            clearErrorMsg("#step2 .print-error-msg");
            // enabledAndDisabledTab('.step2', '.step3');
            // enabledAndDisabledTabContent('#step2', '#step3');
          }else{
            printErrorMsg(data.error, "#step2 .print-error-msg");
          }
        }
      });
      return false;
    }
  });

  $("#registration_professional_data").validate({
    submitHandler: function (form) {
      var data = new FormData();

      data = serializeFormData(data, "#registration_professional_data");
      data.append('system_token', "PcyG24nCJcsxvChVJmAmzuHPGzhHa2rJ");

      $.ajax({
        url: urlApi + "validate/step3",
        type: "POST",
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function (data) {
          if($.isEmptyObject(data.error)){
            clearErrorMsg("#step3 .print-error-msg");
            // enabledAndDisabledTab('.step3', '.step4');
            // enabledAndDisabledTabContent('#step3', '#step4');
          }else{
            printErrorMsg(data.error, "#step3 .print-error-msg");
          }
        }
      });
      return false;
    },
    rules: {
      "registration_professional_data[role]" : {required: true},
      "registration_professional_data[schooling]" : {required: true},
      "registration_professional_data[work_passport]" : {required: true},
      "registration_professional_data[work_passport_series]" : {required: true},
      "registration_professional_data[work_passport_state]" : {required: true},
      "registration_professional_data[retired_worker]" : {required: true},
      "registration_professional_data[user_id]" : {required: true},
    },
    messages: {
      "registration_professional_data[role]" : {required: "Campo obrigatório"},
      "registration_professional_data[schooling]" : {required: "Campo obrigatório"},
      "registration_professional_data[work_passport]" : {required: "Campo obrigatório"},
      "registration_professional_data[work_passport_series]" : {required: "Campo obrigatório"},
      "registration_professional_data[work_passport_state]" : {required: "Campo obrigatório"},
      "registration_professional_data[retired_worker]" : {required: "Campo obrigatório"},
      "registration_professional_data[user_id]" : {required: "Campo obrigatório"},
    }
  });

  $("#registration_phone_numbers").validate({
    submitHandler: function (form) {
      $.ajax({
        url: urlApi + "validate/step4",
        type: "POST",
        headers: {
          "Accept": "application/json",
        },
        data: $(form).serialize() + "&system_token=PcyG24nCJcsxvChVJmAmzuHPGzhHa2rJ",
        success: function (data) {
          if($.isEmptyObject(data.error)){
            clearErrorMsg("#step4 .print-error-msg");
            // enabledAndDisabledTab('.step4', '.step5');
            // enabledAndDisabledTabContent('#step4', '#step5');
          }else{
            printErrorMsg(data.error, "#step4 .print-error-msg");
          }
        }
      });

      return false;
    }
  });

  $("#registration_documents").validate({
    submitHandler: function (form) {
      var data = new FormData();

      data = serializeFormData(data, "#registration_documents");
      data.append('system_token', "PcyG24nCJcsxvChVJmAmzuHPGzhHa2rJ");

      $.ajax({
        url: urlApi + "validate/step5",
        type: "POST",
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function (data) {
          if($.isEmptyObject(data.error)){
            clearErrorMsg("#step5 .print-error-msg");
            // enabledAndDisabledTab('.step5', '.step6');
            // enabledAndDisabledTabContent('#step5', '#step6');
          }else{
            printErrorMsg(data.error, "#step5 .print-error-msg");
          }
        }
      });
      return false;
    }
  });

  $("#registration_languages").validate({
    submitHandler: function (form) {
      $.ajax({
        url: urlApi + "validate/step6",
        type: "POST",
        headers: {
          "Accept": "application/json",
        },
        data: $(form).serialize() + "&system_token=PcyG24nCJcsxvChVJmAmzuHPGzhHa2rJ",
        success: function (data) {
          if($.isEmptyObject(data.error)){
            clearErrorMsg("#step6 .print-error-msg");
            // enabledAndDisabledTab('.step6', '.step7');
            // enabledAndDisabledTabContent('#step6', '#step7');
          }else{
            printErrorMsg(data.error, "#step6 .print-error-msg");
          }
        }
      });
      return false;
    }
  });

  $("#registration_dependents").validate({
    submitHandler: function (form) {
      var allData = new FormData();

      allData = serializeFormData(allData, ".tab-content");
      allData.append('system_token', "PcyG24nCJcsxvChVJmAmzuHPGzhHa2rJ");

      $.ajax({
        url: urlApi + "registration/create",
        type: "POST",
        cache: false,
        contentType: false,
        processData: false,
        data: allData,
        success: function (data) {
          console.log('cadastro realizado');
        }
      });
      return false;
    }
  });
});
