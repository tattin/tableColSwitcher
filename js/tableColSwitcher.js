;(function($) {
    $.fn.tableColSwitcher = (function(){
        var menu = "",
            items = [];
        var $element = $(this);

        // first row add to menu
        $tr = $element.find("tr").eq(0);
        $tr.children().each(function(){
            items.push($(this).text());
        });

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
        $element.before(menu);

        $("input[id^='check']").on("change", function(){
            colSwitch($(this));
        });

        // change attribute:display func
        var changeDisplay = (function(rowIndex, display){
            $element.find("tr").each(function(){
                $(this).children().eq(rowIndex).css("display", display);
            });
        });

        var colSwitch = (function($cell){
            id = $cell.attr("id").replace("check", "");
            if($cell.is(":checked"))  {
                localStorage.setItem("check" + id, true);
                changeDisplay(id, "");
            } else {
                localStorage.removeItem("check" + id);
                changeDisplay(id, "none");
            }            
        });

        var init = (function(){
            $("input[id^='check']").each(function(){
                colSwitch($(this));
            });
        });

        init();
    });
})(jQuery);