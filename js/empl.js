$(document).ready(function () {
  var local_data = data;

  $("#txt-search").keyup(function () {
    var searchField = xoa_dau($(this).val());
    if (searchField === "") {
      $("#filter-records").html("");
      return;
    }
    var output = '<div class="row">';
    var count = 1;
    var results = [];

    $.each(local_data, function (key, val) {
      if (
        xoa_dau(val.gio).toLowerCase().includes(searchField) ||
        xoa_dau(val.name).toLowerCase().includes(searchField) ||
        xoa_dau(val.cod).toLowerCase().includes(searchField)
      ) {
        results.push(val);
      }
      $.each(val.street, function (key, value) {
        if (xoa_dau(value).toLowerCase().includes(searchField)) {
          results.push(val);
        }
      });
      if (count % 2 == 0) {
        output += '</div><div class="row">';
      }
      count++;
    });
    if (results.length > 0) {
      results = [...new Set(results)];
      $.each(results, function (key, val) {
        output += '<div class="col-md-6 well">';
        output += '<div class="col-md-12">';
        if (xoa_dau(val.name).toUpperCase().indexOf(searchField)) {
          output += '<h5 style="color:red">' + val.name + "</h5>";
        } else {
          output += "<h5>" + val.name + "</h5>";
        }
        output += "<p>" + val.gio + "</p>";
        output += "<p>" + val.cod + "</p>";
        output += "<p>";
        $.each(val.street, function (key, str) {
          if (xoa_dau(str).toLowerCase().includes(searchField)) {
            output += '<span style="color:red">' + str + ", " + "</span>";
          } else {
            output += "<span>" + str + ", " + "</span>";
          }
        });
        output += "</p>";
        output += "</div>";
        output += "</div>";
      });
    }
    output += "</div>";
    $("#filter-records").html(output);
  });
  $(".remove").click(function () {
    results = [];
    $("#filter-records").html("");
    $("#txt-search").val("");
  });

  function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str.toLowerCase();
  }
});
