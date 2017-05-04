$(document).ready(function () {
    new controller();
});

var model = function () {
    var data = {};
    data.pawnBlack = '&#9823';
    data.pawnWhite = '&#9817';
    data.piecesWhite = ['&#9814', '&#9816', '&#9815', '&#9813', '&#9812', '&#9815', '&#9816', '&#9814'];
    data.piecesBlack = ['&#9820', '&#9822', '&#9821', '&#9819', '&#9818', '&#9821', '&#9822', '&#9820'];

    this.getChessBoardData = function () {
        var data = 'A';
        var boardData = null;
        for (var r=8; r>=1; r--) {
            var col = '';
            data = 'A';
            for (var c=0; c<8; c++) {
                col += "<td class='"+data+r+"'></td>";
                data = String.fromCharCode(data.charCodeAt(0) + 1);
            }
            boardData += '<tr class="">'+col+'</tr>';
        }
        return boardData;
    };

    this.getBottomTableData = function () {
        var col = '';
        var data = 'A';
        for (var c=0 ; c<8 ; c++) {
            col += '<td>'+data+'</td>';
            data = String.fromCharCode(data.charCodeAt(0) + 1);
        }
        return ('<tr>'+col+'</tr>');
    };

    this.getLeftTableData = function () {
        var data = '';
        for(var r = 8 ; r>=1 ; r--) {
            var col = '';
            col = '<td>' + r + '</td>';
            data += ('<tr>' + col + '</tr>');
        }
        data += ('<tr><td></td></tr>');
        return data;
    };

    this.getPiecesData = function () {
        return data;
    }
};

var view = function () {
    this.createChessBoard = function (data) {
        $('#chessboard').append(data);
    };
    this.createLeftTable = function (data) {
        $('#left-table').append(data);
    };
    this.createBottomTable = function (data) {
        $('#bottom-table').append(data);
    };
    this.populateChessBoard = function (data) {

        $('#chessboard tr:nth-child(2)').each(function () {
            $(this).children().each(function () {
                $(this).html(data.pawnWhite);
            })
        });

        $('#chessboard tr:nth-child(7)').each(function () {
            $(this).children().each(function () {
                $(this).html(data.pawnBlack);
            });
        });

        $('#chessboard tr:nth-child(8)').each(function () {
            var index = 0;
            $(this).children().each(function () {
                $(this).html(data.piecesBlack[index]);
                index++;
            });
        });

        $('#chessboard tr:nth-child(1)').each(function () {
            var index = 0;
            $(this).children().each(function () {
                $(this).html(data.piecesWhite[index]);
                index++;
            });
        });
    }
};

var controller = function () {
    var myView = new view();
    var myModel = new model();

    myView.createChessBoard(myModel.getChessBoardData());
    myView.createLeftTable(myModel.getLeftTableData());
    myView.createBottomTable(myModel.getBottomTableData());
    myView.populateChessBoard(myModel.getPiecesData());
};