var nodeExcel = require('excel-export');
var exportExcelTest = function(app){
    app.get('/excel', function(req, res){
        var data = [[ 'xxx+', 'xxxxx,xxx', null ],
            [ 'xxxx', 'xxx', null ],
            [ 'xxxt', 'xx', null ],
            [ 'xxx', 'xxx', null ],
            [ 'xxx',
                'xxxxxxx ',
                null ],
            [ 'xxx',
                'xxx',
                null ],
            [ 'xx', 'xxx', null ],
            [ 'xx', 'iPhone5 case', null ] ];

        var colsModel = [];
        var colsModelData = [ 'yyyy', 'yyyyyyy', '' ];
        var i = 0 ;
        var conf ={};
        conf.stylesXmlFile = __dirname+"/styles.xml";
        while(i<colsModelData.length){
            colsModel.push({
                caption:colsModelData[i],
                type:typeof colsModelData[i]
            });
            i++;
        }
        conf.cols = colsModel;
        conf.rows = data;
        var result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
        res.end(result, 'binary');
    });
    app.get('/excelTest', function(req, res){
        var conf ={};
        conf.stylesXmlFile = __dirname+"/styles.xml";
        conf.cols = [{
            caption:'string',
            type:'string',
            beforeCellWrite:function(row, cellData){
                return cellData.toUpperCase();
            },
            width:28.7109375
        },{
            caption:'date',
            type:'date',
            beforeCellWrite:function(){
                var originDate = new Date(Date.UTC(1899,11,30));
                return function(row, cellData, eOpt){
                    if (eOpt.rowNum%2){
                        eOpt.styleIndex = 1;
                    }
                    else{
                        eOpt.styleIndex = 2;
                    }
                    if (cellData === null){
                        eOpt.cellType = 'string';
                        return 'N/A';
                    } else
                        return (cellData - originDate) / (24 * 60 * 60 * 1000);
                }
            }()
        },{
            caption:'bool',
            type:'bool'
        },{
            caption:'number',
            type:'number'
        }];
        conf.rows = [
            ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
            ["e", new Date(2012, 4, 1), false, 2.7182],
            ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
            ["null date", null, true, 1.414]
        ];
        var result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
        res.end(result, 'binary');
    });
    return app;
};

exports.exportExcel = function(app){
    return exportExcelTest(app);
}