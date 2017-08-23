let HOST = "http://localhost:8000";
let TOKEN = "PcyG24nCJcsxvChVJmAmzuHPGzhHa2rJ";
$(function () {
  searchCep();
  
});
//Procura pelo cep conforme a pessoa digital
function searchCep() {
  $(".cep-input").keyup(function () {
    let cepInput = $(this);
    let cep = cepInput.val();
    if (cep.length < 9) {
      return false;
    }
    $.ajax({
      method: "GET",
      url: HOST + "/api/v1/search/zip-code",
      data: {zip_code: cep, system_token: TOKEN},
      dataType: "JSON"
    }).done(function (data) {
      let address = data.result;
      if (address === false || address === "false") {
        return false;
      }
      let addressGroup = $(cepInput.parent('div').parent('div').parent('.addresses'));
      console.log(addressGroup);
      $(addressGroup.find(".endereco-input")).val(address.logradouro);
      $(addressGroup.find(".bairro-input")).val(address.bairro);
      $(addressGroup.find(".cidade-input")).val(address.cidade);
      $(addressGroup.find(".estado-input")).val(address.uf);
      $(addressGroup.find(".pais-input")).val("Brasil");
    });
  });
}