$(document).ready(function () {
    initializeBoard();
});


/**
 * Dirty Code to initialize the board. Not well structured
 */
function initializeBoard() {

    var pawnBlack = '&#9823', pawnWhite = '&#9817';
    var piecesWhite = ['&#9814', '&#9816', '&#9815', '&#9813', '&#9812', '&#9815', '&#9816', '&#9814'];
    var piecesBlack = ['&#9820', '&#9822', '&#9821', '&#9819', '&#9818', '&#9821', '&#9822', '&#9820'];
    var data = 'A';
    for (var r=8; r>=1; r--) {
        var col = '';
        data = 'A';
        for (var c=0; c<8; c++) {
            col += "<td class='"+data+r+"'></td>";
            data = String.fromCharCode(data.charCodeAt(0) + 1);
        }
        $('#chessboard').append('<tr class="">'+col+'</tr>');
    }
    col = '';
    data = 'A';
    for (c=0 ; c<8 ; c++) {
        col += '<td>'+data+'</td>';
        data = String.fromCharCode(data.charCodeAt(0) + 1);
    }
    $('#bottom-table').append('<tr>'+col+'</tr>');

    for(r = 8 ; r>=1 ; r--) {
        col = '';
        col = '<td>' + r + '</td>';
        $('#left-table').append('<tr>' + col + '</tr>');
    }
    $('#left-table').append('<tr><td></td></tr>');
    
    $('#chessboard tr:nth-child(2)').each(function () {
        $(this).children().each(function () {
            $(this).html(pawnWhite);
        })
    });

    $('#chessboard tr:nth-child(7)').each(function () {
        $(this).children().each(function () {
            $(this).html(pawnBlack);
        });
    });

    $('#chessboard tr:nth-child(8)').each(function () {
        var index = 0;
        $(this).children().each(function () {
            $(this).html(piecesBlack[index]);
            index++;
        });
    });

    $('#chessboard tr:nth-child(1)').each(function () {
        var index = 0;
        $(this).children().each(function () {
            $(this).html(piecesWhite[index]);
            index++;
        });
    });
}