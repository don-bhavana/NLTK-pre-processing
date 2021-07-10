// Document is ready
//SIGN UP
$(document).ready(function () {
    
    $(".table-container").hide();

    // EXECUTE BUTTON 
    $('#execute-btn').click(function () {
        $.ajax({
            url: 'http://localhost:5000/preprocessing',
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ "text": $('#data').val() }),
            success: function (data, textStatus, jQxhr) {
                // var stringified = JSON.stringify(data);
                // var parsedObj = JSON.parse(stringified);
                console.log(data)

                var html = '';
                var len = data.tokenized.length
                var rem = len%3;
                console.log(len,rem,len-rem)
                for (var i = 0; i < len-rem; i+=3)
                    html += '<tr><td>' + data.tokenized[i] + '</td><td>' + data.tokenized[i+1] + '</td><td>' + data.tokenized[i+2] + '</td></tr>';
                    console.log(i)
                    // $('#thetable tr').first().after(html);
                if(rem==1){
                    html += '<tr><td>' + data.tokenized[len-1] + '</td><td>' + " " + '</td><td>' + " " + '</td></tr>';
                }
                else if (rem ==2){
                    html += '<tr><td>' + data.tokenized[len-2] + '</td><td>' + data.tokenized[len-1] + '</td><td>' + " "+ '</td></tr>';
                }
                    $('#tokenized-table tr').first().after(html);
              

                var html = '';
                var len = data.removed_sw.length
                var rem = len%3;
                console.log(len,rem,len-rem)
                for (var i = 0; i < len-rem; i+=3)
                    html += '<tr><td>' + data.removed_sw[i] + '</td><td>' + data.removed_sw[i+1] + '</td><td>' + data.removed_sw[i+2] + '</td></tr>';
                    console.log(i)
                if(rem==1){
                    html += '<tr><td>' + data.removed_sw[len-1] + '</td><td>' + " " + '</td><td>' + " " + '</td></tr>';
                }
                else if (rem ==2){
                    html += '<tr><td>' + data.removed_sw[len-2] + '</td><td>' + data.removed_sw[len-1] + '</td><td>' + " "+ '</td></tr>';
                }
                $('#rm-stopwords-table tr').first().after(html);


                var html = '';
                console.log(data.lemmetized,typeof(data.lemmetized))
                var len = data.lemmetized.length
                var rem = len%3;
                console.log(len,rem,len-rem)
                for (var i = 0; i < len-rem; i+=3)
                    html += '<tr><td>' + data.lemmetized[i] + '</td><td>' + data.lemmetized[i+1] + '</td><td>' + data.lemmetized[i+2] + '</td></tr>';
                    console.log(i)
                if(rem==1){
                    html += '<tr><td>' + data.lemmetized[len-1] + '</td><td>' + " " + '</td><td>' + " " + '</td></tr>';
                }
                else if (rem ==2){
                    html += '<tr><td>' + data.lemmetized[len-2] + '</td><td>' + data.lemmetized[len-1] + '</td><td>' + " "+ '</td></tr>';
                }
                $('#lemmetized-table tr').first().after(html);

                $(".table-container").slideDown();

            
            },
            error: function (jqXhr, textStatus, errorThrown, data) {
                alert(errorThrown + "data is " + data);
            }
        });
    });
});



