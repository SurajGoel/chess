$(document).ready(function () {
    new controller();
});

/**
 * Model Part of MVC Pattern.
 * Contains the logic and data for the whole application.
 * Takes Order from Controller.
 */
var model = function () {
    var gameLogic = new GameLogic();

    var data = {};
    data.pawnBlack = '&#9823';
    data.pawnWhite = '&#9817';
    data.piecesWhite = ['&#9814', '&#9816', '&#9815', '&#9813', '&#9812', '&#9815', '&#9816', '&#9814'];
    data.piecesBlack = ['&#9820', '&#9822', '&#9821', '&#9819', '&#9818', '&#9821', '&#9822', '&#9820'];

    this.getValidMoves = function (cell) {
        if($.trim(cell.html())=='') return null;
        return gameLogic.validMoves(cell.attr('class'));
    };

    /**
     * Creates Chess Board data that will be fed directly to the chessBoard HTML Element.
     * @return {*}
     */
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

    /**
     * Creates Bottom Table data that will be fed directly to the bottom-table HTML Element.
     * @return {string}
     */
    this.getBottomTableData = function () {
        var col = '';
        var data = 'A';
        for (var c=0 ; c<8 ; c++) {
            col += '<td>'+data+'</td>';
            data = String.fromCharCode(data.charCodeAt(0) + 1);
        }
        return ('<tr>'+col+'</tr>');
    };

    /**
     * Creates Left Table data that will be fed directly to the left-table HTML Element.
     * @return {string}
     */
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

    /**
     * Returns UNICODE data of various pieces used in Chess.
     * @return {{}}
     */
    this.getPiecesData = function () {
        return data;
    }

    this.enableMoveMode = function (position) {
        gameLogic.moveMode(true, position);
    };

    this.disableMoveMode = function () {
        gameLogic.moveMode(false);
    };

    this.checkMove = function (target) {
        gameLogic.checkChessMove(target);
    }
};

/**
 * View part of MVC Pattern.
 * Responsible of everything related to view of Chess Board.
 * Change the UI directly. Takes Order from Controller part.
 */
var view = function () {

    var move_mode = false;
    var valid_moves;
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
    };

    this.enableMoveMode = function (validMoves) {
        move_mode = true;
        valid_moves = validMoves;
        for(var i in validMoves)
            $('.'+validMoves[i]).addClass('highlight');
    };

    this.disableMoveMode = function () {
        move_mode = false;
        for(var i in valid_moves)
            $('.'+valid_moves[i].removeClass('highlight'));
    }
};

/**
 * Controller Function Expression.
 * Controller Part of Typical MVC Pattern.
 * Called on document load function of the window.
 * Contains View and Model required for the proper functioning.
 * Responds to click events and input happerning on the view side
 */
var controller = function () {
    var myView = new view();
    var myModel = new model();

    myView.createChessBoard(myModel.getChessBoardData());
    myView.createLeftTable(myModel.getLeftTableData());
    myView.createBottomTable(myModel.getBottomTableData());
    myView.populateChessBoard(myModel.getPiecesData());

    $('#chessboard tr td').click(function () {
        click1($(this));
    });

    function click1(objectClicked) {
        $('#chessboard tr td').unbind('click');
        var validMoves = myModel.getValidMoves($(this));
        myModel.enableMoveMode(objectClicked.attr('class'));
        myView.enableMoveMode(validMoves);
        for(var i in validMoves) {
            $('.'+validMoves[i]).click(function () {
                moveClick($(this))
            });
        }
        objectClicked.click(cancelMove);
    }

    function moveClick(objectClicked) {
        $('#chessboard tr td').unbind('click');
        myModel.checkMove(objectClicked.attr('class'));
        myModel.makeMove();
        myView.makeMove();
        $('#chessboard tr td').click(click1);
    }

    function cancelMove() {
        myModel.disableMoveMode();
        myView.disableMoveMode();
        $('#chessboard tr td').click(function () {
            click1($(this));
        });
    }
};