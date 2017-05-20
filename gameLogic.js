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
        '&#9817' : {
            color : 'white',
            type : 'pawn'
        },
        '&#9814' : {
            color : 'white',
            type : 'rook'
        },
        '&#9816' : {
            color : 'white',
            type : 'knight'
        },
        '&#9815' : {
            color : 'white',
            type : 'bishop'
        },
        '&#9813' : {
            color : 'white',
            type : 'queen'
        },
        '&#9812' : {
            color : 'white',
            type : 'kingw'
        },
        '&#9823' : {
            color : 'black',
            type : 'pawn'
        },
        '&#9820' : {
            color : 'black',
            type : 'rook'
        },
        '&#9822' : {
            color : 'black',
            type : 'knight'
        },
        '&#9821' : {
            color : 'black',
            type : 'bishop'
        },
        '&#9819' : {
            color : 'black',
            type : 'queen'
        },
        '&#9818' : {
            color : 'black',
            type : 'king'
        }
    };

    var cgState =   {
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

    var moves = [];

    var move_mode = false;
    var currentlySelected;

    this.validMoves = function (position) {
        var hpos = position.charAt(0);
        var vpos = position.charAt(1);
        moves.length = 0;

        switch(cgState[hpos][vpos]) {

            case piece.black.pawn: {
                if(cgState[hpos][incr(vpos)] == null) moves.push(hpos + incr(vpos));
                if(cgState[incr(hpos)] != undefined)
                    if(cgState[incr(hpos)][incr(vpos)] != null)
                        if(pType[cgState[incr(hpos)][incr(vpos)]].color != "black") moves.push(incr(hpos) + incr(vpos));
                if(cgState[dcr(hpos)] != undefined)
                    if(cgState[dcr(hpos)][incr(vpos)] != null)
                        if(pType[cgState[dcr(hpos)][incr(vpos)]].color != "black") moves.push(dcr(hpos) + incr(vpos));
                break;
            }

            case piece.white.pawn: {
                if(cgState[hpos][dcr(vpos)] == null) moves.push(hpos + dcr(vpos));
                if(cgState[incr(hpos)] != undefined)
                    if(cgState[incr(hpos)][dcr(vpos)] != null)
                        if(pType[cgState[incr(hpos)][dcr(vpos)]].color != "white") moves.push(incr(hpos) + dcr(vpos));
                if(cgState[dcr(hpos)] != undefined)
                    if(cgState[dcr(hpos)][dcr(vpos)] != null)
                        if(pType[cgState[dcr(hpos)][dcr(vpos)]].color != "white") moves.push(dcr(hpos) + dcr(vpos));
                break;
            }

            case piece.black.rook: {
                checkRook("black", hpos, vpos);
                break;
            }

            case piece.white.rook: {
                checkRook("white", hpos, vpos);
                break;
            }

            case piece.white.knight: {
                checkKnight("white", hpos, vpos);
                break;
            }

            case piece.black.knight: {
                checkKnight("black", hpos, vpos);
                break;
            }

            case piece.white.bishop: {
                checkBishop("white", hpos, vpos);
                break;
            }

            case piece.black.bishop: {
                checkBishop("black", hpos, vpos);
                break;
            }

            case piece.white.queen: {
                checkQueen("white", hpos, vpos);
                break;
            }

            case piece.black.queen: {
                checkQueen("black", hpos, vpos);
                break;
            }

            case piece.white.king: {
                checkKing("white", hpos, vpos);
                break;
            }

            case piece.black.king: {
                checkKing("black", hpos, vpos);
            }
        }
        return moves;
    };

    function checkRook(cmpColor, hpos, vpos) {
        var thpos = hpos, tvpos = vpos;
        while(checkAndAdd((thpos), (tvpos = incr(tvpos)), cmpColor));
        thpos = hpos; tvpos = vpos;
        while(checkAndAdd((thpos), (tvpos = dcr(tvpos)), cmpColor));
        thpos = hpos; tvpos = vpos;
        while(checkAndAdd((thpos = incr(thpos)), (tvpos), cmpColor));
        thpos = hpos; tvpos = vpos;
        while(checkAndAdd((thpos = dcr(thpos)), (tvpos), cmpColor));
    }
    function checkKnight(cmpColor, hpos, vpos) {
        var thpos = hpos, tvpos = vpos;
        checkAndAdd(incr(incr(thpos)), incr(tvpos), cmpColor);
        checkAndAdd(incr(incr(thpos)), dcr(tvpos), cmpColor);
        checkAndAdd(incr(thpos), incr(incr(tvpos)), cmpColor);
        checkAndAdd(dcr(thpos), incr(incr(tvpos)), cmpColor);
        checkAndAdd(dcr(dcr(thpos), incr(tvpos)), cmpColor);
        checkAndAdd(dcr(dcr(thpos)), dcr(tvpos), cmpColor);
        checkAndAdd(dcr(thpos), dcr(dcr(tvpos), cmpColor));
        checkAndAdd(incr(thpos), dcr(dcr(tvpos)), cmpColor);
    }
    function checkBishop(cmpColor, hpos, vpos) {
        var thpos = hpos, tvpos = vpos;
        while(checkAndAdd((thpos = incr(thpos)), (tvpos = incr(tvpos)), cmpColor));
        thpos = hpos; tvpos = vpos;
        while(checkAndAdd((thpos = dcr(thpos)),(tvpos = dcr(tvpos)), cmpColor));
        thpos = hpos; tvpos = vpos;
        while(checkAndAdd((thpos = dcr(thpos)), (tvpos = incr(tvpos)), cmpColor));
        thpos = hpos; tvpos = vpos;
        while(checkAndAdd((thpos = incr(thpos)), (tvpos = dcr(tvpos)), cmpColor));
    }
    function checkQueen(cmpColor, hpos, vpos) {
        checkBishop(cmpColor, hpos, vpos);
        checkRook(cmpColor, hpos, vpos);
    }
    function checkKing(cmpColor, hpos, vpos) {
        var thpos = hpos, tvpos = vpos;
        checkAndAdd(thpos, incr(tvpos), cmpColor);
        checkAndAdd(thpos, dcr(tvpos), cmpColor);
        checkAndAdd(incr(thpos), tvpos, cmpColor);
        checkAndAdd(dcr(thpos), tvpos, cmpColor);
        checkAndAdd(incr(thpos), incr(tvpos), cmpColor);
        checkAndAdd(incr(thpos), dcr(tvpos), cmpColor);
        checkAndAdd(dcr(thpos), incr(tvpos), cmpColor);
        checkAndAdd(dcr(thpos), dcr(tvpos), cmpColor);
    }
    function incr(char) {
        return String.fromCharCode(char.charCodeAt(0)+1);
    }
    function dcr(char) {
        return String.fromCharCode(char.charCodeAt(0)-1);
    }
    function checkAndAdd(thpos, tvpos, cmpColor) {
        if(cgState[thpos] === undefined) return 0;
        if(cgState[thpos][tvpos] === undefined) return 0;
        var temp = cgState[thpos][tvpos];
        if (temp === null) {
            moves.push(thpos+tvpos);
            return 1;
        }
        if (pType[temp].color === cmpColor) return 0;
        if (pType[temp].color !== cmpColor) {
            moves.push(thpos + tvpos);
            return 0;
        }
    }

    this.moveMode = function (val, position) {
        move_mode = val;
        currentlySelected = position;
    };

    this.checkChessMove = function (target) {
        var hpos = target.charAt(0);
        var vpos = target.charAt(1);

    }
}