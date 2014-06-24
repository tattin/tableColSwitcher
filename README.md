# tableColSwitcher.js

## useage

- js
```
<script>
$(function(){
    $("#table_id").tableColSwitcher();
})
</script>
```

- html
```
<table id="table_id">
    <tr>
        <th>header1</th>
        <th>header2</th>
        <th>header3</th>
    </tr>
    <tr>
        <td>data1</td>
        <td>data2</td>
        <td>data3</td>
    </tr>
    <tr>
        <td>data4</td>
        <td>data5</td>
        <td>data6</td>
    </tr>
</table>
```

    * <td> tags or <th> tags in first <tr> tag will be checkbox-menu.
    * change display column, when you click checkbox-menu.
    * sort column, when you click table-header-row.