function GameLogic() {

    var piece = {
        white : {
            pawn : '&#9817',
            rook : '&#9814',
            knight : '&#9816',
            bishop : '&#9815',
            queen : '&#9813',
            king : '&#9812'
        },
        black : {
            pawn : '&#9823',
            rook : '&#9820',
            knight : '&#9822',
            bishop : '&#9821',
            queen : '&#9819',
            king : '&#9818'
        }
    };

    var pType = {
        '$#9817' : {
            color : 'black',
            type : 'pawn'
        },
        '$#9814' : {
            color : 'black',
            type : 'rook'
        },
        '$#9816' : {
            color : 'black',
            type : 'knight'
        },
        '$#9815' : {
            color : 'black',
            type : 'bishop'
        },
        '$#9813' : {
            color : 'black',
            type : 'queen'
        },
        '$#9812' : {
            color : 'black',
            type : 'king'
        },
        '$#9823' : {
            color : 'white',
            type : 'pawn'
        },
        '$#9820' : {
            color : 'white',
            type : 'rook'
        },
        '$#9822' : {
            color : 'white',
            type : 'knight'
        },
        '$#9821' : {
            color : 'white',
            type : 'bishop'
        },
        '$#9819' : {
            color : 'white',
            type : 'queen'
        },
        '$#9818' : {
            color : 'white',
            type : 'king'
        }
    };

    var cgState = {
        A : {
            1: piece.black.rook,
            2: piece.black.pawn,
            3: null,
            4: null,
            5: null,
            6: null,
            7: piece.white.pawn,
            8: piece.white.rook
        },
        B : {
            1: piece.black.knight,
            2: piece.black.pawn,
            3: null,
            4: null,
            5: null,
            6: null,
            7: piece.white.pawn,
            8: piece.white.knight
        },
        C : {
            1: piece.black.bishop,
            2: piece.black.pawn,
            3: null,
            4: null,
            5: null,
            6: null,
            7: piece.white.pawn,
            8: piece.white.bishop
        },
        D : {
            1: piece.black.queen,
            2: piece.black.pawn,
            3: null,
            4: null,
            5: null,
            6: null,
            7: piece.white.pawn,
            8: piece.white.queen
        },
        E : {
            1: piece.black.king,
            2: piece.black.pawn,
            3: null,
            4: null,
            5: null,
            6: null,
            7: piece.white.pawn,
            8: piece.white.king
        },
        F : {
            1: piece.black.bishop,
            2: piece.black.pawn,
            3: null,
            4: null,
            5: null,
            6: null,
            7: piece.white.pawn,
            8: piece.white.bishop
        },
        G : {
            1: piece.black.knight,
            2: piece.black.pawn,
            3: null,
            4: null,
            5: null,
            6: null,
            7: piece.white.pawn,
            8: piece.white.knight
        },
        H : {
            1: piece.black.rook,
            2: piece.black.pawn,
            3: null,
            4: null,
            5: null,
            6: null,
            7: piece.white.pawn,
            8: piece.white.rook
        }
    };

    function validMoves(position) {
        var hpos = position.charAt(0);
        var vpos = position.charAt(1);
        var moves = [];

        switch(cgState[hpos][vpos]) {

            case piece.black.pawn: {
                if(pType[cgState[hpos][incr(vpos)]].color != "black") moves.add(hpos+incr(vpos));
                if(pType[cgState[dcr(hpos)][incr(vpos)]].color != "black") moves.add(dcr(hpos)+incr(vpos));
                if(pType[cgState[incr(hpos)][incr(vpos)]].color != "black") moves.add(incr(hpos+incr(vpos)));
                break;
            }

            case piece.white.pawn: {
                if(pType[cgState[hpos][dcr(vpos)].color != "white"]) moves.add(hpos+dcr(vpos));
                if(pType[cgState[dcr(hpos)][dcr(vpos)]].color != "white") moves.add(dcr(hpos)+dcr(vpos));
                if(pType[cgState][incr(hpos)][dcr(vpos)].color != "white") moves.add(incr(hpos)+dcr(vpos));
                break;
            }

            case piece.black.rook: {
                checkRook("black", hpos, vpos, moves);
                break;
            }

            case piece.white.rook: {
                checkRook("white", hpos, vpos, moves);
                break;
            }

            case piece.white.knight: {
                break;
            }

            case piece.black.knight: {
                break;
            }

            case piece.white.bishop: {
                break;
            }

            case piece.black.bishop: {
                break;
            }

            case piece.white.queen: {
                break;
            }

            case piece.black.queen: {
                break;
            }

            case piece.white.king: {
                break;
            }

            case piece.black.king: {

            }
        }
        return moves;
    }

    function incr(char) {
        return String.fromCharCode(char.charCodeAt(0)+1);
    }
    function dcr(char) {
        return String.fromCharCode(char.charCodeAt(0)-1);
    }
    function checkRook(cmpColor, hpos, vpos, moves) {
        var thpos = hpos, tvpos = vpos;
        var temp;
        while(1) {
            temp = cgState[thpos][(tvpos = incr(tvpos))];
            if(temp == undefined || pType[temp].color == cmpColor) break;
            if(temp == null) moves.add(thpos+tvpos);
            if(pType[temp].color != cmpColor) {
                moves.add(thpos+tvpos);
                break;
            }
        }

        thpos = hpos; tvpos = vpos;
        while(1) {
            temp = cgState[thpos][(tvpos = dcr(tvpos))];
            if(temp == undefined || pType[temp].color == cmpColor) break;
            if(temp == null) moves.add(thpos+tvpos);
            if(pType[temp].color != cmpColor) {
                moves.add(thpos+tvpos);
                break;
            }
        }

        thpos = hpos; tvpos = vpos;
        while(1) {
            temp = cgState[(thpos = incr(thpos))][vpos];
            if(temp == undefined || pType[temp].color == cmpColor) break;
            if(temp == null) moves.add(thpos+tvpos);
            if(pType[temp].color != cmpColor) {
                moves.add(thpos+tvpos);
                break;
            }
        }

        thpos = hpos; tvpos = vpos;
        while(1) {
            temp = cgState[(thpos = dcr(thpos))][vpos];
            if(temp == undefined || pType[temp].color == cmpColor) break;
            if(temp == null) moves.add(thpos+tvpos);
            if(pType[temp].color != cmpColor) {
                moves.add(thpos+tvpos);
                break;
            }
        }
    }
    function checkKnight(cmpColor, hpos, vpos, moves) {

    }
    function checkBishop(cmpColor, hpos, vpos, moves) {

    }
    function checkQueen(cmpColor, hpos, vpos, moves) {

    }
    function checkKing(cmpColor, hpos, vpos, moves) {

    }
}