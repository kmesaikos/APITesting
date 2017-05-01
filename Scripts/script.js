
var tags = null;
$("#tags").keyup(function () {


    clearTimeout(tags);
    tags = setTimeout(function () {
        if ($("#tags").val().length < 3) {
            return false;
        }

        var usecache = $("#SelectCache").val();

        var URL = window.location + "/Home/GetImages?tags=" + $("#tags").val() + "&usecache="+usecache;
        //var URL = window.location + "/Home/GetImages?tags=" + $("#tags").val() + "useCache = true";

        //$("#link").html(URL).attr("href", URL);
        $("#link").attr("href", URL);
      
        $("#myDiv").toggleClass("hidden");
        //alert("Spinner Start");

        $.ajax({
            url: URL,
            data: null,
            dataType: "json",
            type: 'POST',
            cache: false,
            success: function (response, status, hqr) {
                // If is error or on success callback fails, show error
                if (response != null) {

                    var container = $("#row");
                    container.html("");

                    $.each(response, function () {
                        var thumb = $("<div>")
                            .attr("class", "class=\"col-lg-3 col-md-4 col-xs-6 thumb\"");

                        var linkimage = $("<a>")
                            .attr("class", "thumbnail")
                            //.attr("href", "#");

                        var image = $("<img>")
                            .attr("src", this.ImageUrl)
                            .attr("class", "img-responsive")
                            .attr("alt", "");

                        var title = $("<span>")
                            .html(this.Title);
                      
                            //thumb.append(title);
                            linkimage.append(image);
                            thumb.append(linkimage);
                            container.append(thumb);
                      });

                    $("#myDiv").toggleClass("hidden");
                    //alert("Spinner End");

                }
            },
            error: function (response, status, hqr) {
                //DialogSpinnerStop();

            }
        });



    }, 250);
})