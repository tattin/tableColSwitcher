;(function($) {
    $.fn.tableColSwitcher = (function(){
        var menu = "",
            items = [];
        var $element = $(this);

        // first row add to menu
        $tr = $element.find("tr").eq(0);
        var i = 0;
        $tr.children().each(function(){
            items.push($(this).text());
            $(this).html('<a href="javascript:;" id="check_head' + i++ + '">' + $(this).html() + '</a>');
        });

        menu += '<form name="check_form" id="check_form">';
        for (var i= 0; i < items.length; i++) {
            check = (localStorage.getItem("check" + i)) ? " checked" : "";
            menu += '<label>'
                + '<input'
                + ' id="check' + i +'" '
                + ' type="checkbox"'
                + ' name="check[]"'
                + ' value="'+ i + '" '
                + check
                + ' />'
                + items[i]
                + '</label>';
        }
        menu += '</form>';
        $element.before(menu);

        var init = (function(){
            $("input[id^='check']").each(function(){
                colSwitch($(this));
            });
            // resetup click event
            $("a[id^='check_head']").on("click", function(){
                sortRows($(this));
            });
        });

        // change cell display
        var colSwitch = (function($cell){
            id = $cell.attr("id").replace("check", "");
            if ($cell.is(":checked")) {
                localStorage.setItem("check" + id, true);
                changeDisplay(id, "");
            } else {
                localStorage.removeItem("check" + id);
                changeDisplay(id, "none");
            }            
        });

        // change attribute:display func
        var changeDisplay = (function(rowIndex, display){
            $element.find("tr").each(function(){
                $(this).children().eq(rowIndex).css("display", display);
            });
        });

        // check checkbox event
        $("input[id^='check']").on("change", function(){
            colSwitch($(this));
        });

        $("a[id^='check_head']").on("click", function(){
            sortRows($(this));
        });
        var sortRows = (function($head){
            order = localStorage.getItem("order");
            sort_key = localStorage.getItem("sort_key");

            id = $head.attr("id").replace("check_head", "");

            if (id == sort_key){
                sort = (order == "desc") ? "asc" : "desc";
            } else {
                sort = "asc"; 
            }
            localStorage.setItem("sort_key", id);
            localStorage.setItem("order", sort);

            $.ajax({
                url: "index.php",
                type: "POST",
                data: {
                    "id": id,
                    "sort": sort
                },
                async: false,
                cache: false,
                dataType: "JSON",
                success: function(json_data){   
                    data_table = "<tr>";
                    $tr = $element.find("tr").eq(0);
                    $tr.each(function(){
                        data_table += $(this).html();
                    });
                    data_table += "</tr>";
                    for (var i = 0; i < json_data.length; i++) {
                        data_table += "<tr>";
                        for (var j = 0; j < json_data[i].length; j++) {
                            data_table += "<td>" + json_data[i][j] + "</td>";
                        }
                        data_table += "</tr>";
                    }

                    $element.html(data_table);
                    init();
                }
            });
        });
        init();
    });
})(jQuery);