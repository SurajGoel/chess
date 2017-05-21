function GameLogic() {

    var nHold = '&nbsp';
    var movesMade = 0;
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
            type : 'king'
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

    // Maintain the current Game state internally to drive all the process further.
    // Not relying on data provided by the user.
    var cgState =   {
        A : {
            1: piece.black.rook,
            2: piece.black.pawn,
            3: nHold,
            4: nHold,
            5: nHold,
            6: nHold,
            7: piece.white.pawn,
            8: piece.white.rook
        },
        B : {
            1: piece.black.knight,
            2: piece.black.pawn,
            3: nHold,
            4: nHold,
            5: nHold,
            6: nHold,
            7: piece.white.pawn,
            8: piece.white.knight
        },
        C : {
            1: piece.black.bishop,
            2: piece.black.pawn,
            3: nHold,
            4: nHold,
            5: nHold,
            6: nHold,
            7: piece.white.pawn,
            8: piece.white.bishop
        },
        D : {
            1: piece.black.queen,
            2: piece.black.pawn,
            3: nHold,
            4: nHold,
            5: nHold,
            6: nHold,
            7: piece.white.pawn,
            8: piece.white.queen
        },
        E : {
            1: piece.black.king,
            2: piece.black.pawn,
            3: nHold,
            4: nHold,
            5: nHold,
            6: nHold,
            7: piece.white.pawn,
            8: piece.white.king
        },
        F : {
            1: piece.black.bishop,
            2: piece.black.pawn,
            3: nHold,
            4: nHold,
            5: nHold,
            6: nHold,
            7: piece.white.pawn,
            8: piece.white.bishop
        },
        G : {
            1: piece.black.knight,
            2: piece.black.pawn,
            3: nHold,
            4: nHold,
            5: nHold,
            6: nHold,
            7: piece.white.pawn,
            8: piece.white.knight
        },
        H : {
            1: piece.black.rook,
            2: piece.black.pawn,
            3: nHold,
            4: nHold,
            5: nHold,
            6: nHold,
            7: piece.white.pawn,
            8: piece.white.rook
        }
    };

    // Variable to hold current valid moves.
    var moves = [];

    var move_mode = false;
    var cSelected, cTarget;
    var turn = 'white';
    var cmpColor;

    /**
     * The function that returns the valid moves for the piece at "position"
     * @param position
     * @return {Array}
     */
    this.validMoves = function (position) {
        var hpos = position.charAt(0);
        var vpos = position.charAt(1);
        cmpColor = turn;
        moves.length = 0;
        if(cgState[hpos][vpos] !== nHold) {
            if(pType[cgState[hpos][vpos]].color !== turn) return moves
        }
        switch(cgState[hpos][vpos]) {

            case piece.black.pawn: {
                if(cgState[hpos][incr(vpos)] == nHold) moves.push(hpos + incr(vpos));
                if(cgState[incr(hpos)] !== undefined)
                    if(cgState[incr(hpos)][incr(vpos)] !== nHold)
                        if(pType[cgState[incr(hpos)][incr(vpos)]].color !== "black") moves.push(incr(hpos) + incr(vpos));
                if(cgState[dcr(hpos)] !== undefined)
                    if(cgState[dcr(hpos)][incr(vpos)] !== nHold)
                        if(pType[cgState[dcr(hpos)][incr(vpos)]].color !== "black") moves.push(dcr(hpos) + incr(vpos));
                break;
            }

            case piece.white.pawn: {
                if(cgState[hpos][dcr(vpos)] == nHold) moves.push(hpos + dcr(vpos));
                if(cgState[incr(hpos)] !== undefined)
                    if(cgState[incr(hpos)][dcr(vpos)] !== nHold)
                        if(pType[cgState[incr(hpos)][dcr(vpos)]].color !== "white") moves.push(incr(hpos) + dcr(vpos));
                if(cgState[dcr(hpos)] !== undefined)
                    if(cgState[dcr(hpos)][dcr(vpos)] !== nHold)
                        if(pType[cgState[dcr(hpos)][dcr(vpos)]].color !== "white") moves.push(dcr(hpos) + dcr(vpos));
                break;
            }

            case piece.black.rook: {
                checkRook(hpos, vpos);
                break;
            }

            case piece.white.rook: {
                checkRook(hpos, vpos);
                break;
            }

            case piece.white.knight: {
                checkKnight(hpos, vpos);
                break;
            }

            case piece.black.knight: {
                checkKnight(hpos, vpos);
                break;
            }

            case piece.white.bishop: {
                checkBishop(hpos, vpos);
                break;
            }

            case piece.black.bishop: {
                checkBishop(hpos, vpos);
                break;
            }

            case piece.white.queen: {
                checkQueen(hpos, vpos);
                break;
            }

            case piece.black.queen: {
                checkQueen(hpos, vpos);
                break;
            }

            case piece.white.king: {
                checkKing(hpos, vpos);
                break;
            }

            case piece.black.king: {
                checkKing(hpos, vpos);
            }
        }
        return moves;
    };

    /**
     * Helper functions for the valid moves calculation.
     * @param hpos
     * @param vpos
     */

    function checkRook(hpos, vpos) {
        var thpos = hpos, tvpos = vpos;
        while(checkAndAdd((thpos), (tvpos = incr(tvpos))));
        thpos = hpos; tvpos = vpos;
        while(checkAndAdd((thpos), (tvpos = dcr(tvpos))));
        thpos = hpos; tvpos = vpos;
        while(checkAndAdd((thpos = incr(thpos)), (tvpos)));
        thpos = hpos; tvpos = vpos;
        while(checkAndAdd((thpos = dcr(thpos)), (tvpos)));
    }
    function checkKnight(hpos, vpos) {
        var thpos = hpos, tvpos = vpos;
        checkAndAdd(incr(incr(thpos)), incr(tvpos));
        checkAndAdd(incr(incr(thpos)), dcr(tvpos));
        checkAndAdd(incr(thpos), incr(incr(tvpos)));
        checkAndAdd(dcr(thpos), incr(incr(tvpos)));
        checkAndAdd(dcr(dcr(thpos), incr(tvpos)));
        checkAndAdd(dcr(dcr(thpos)), dcr(tvpos));
        checkAndAdd(dcr(thpos), dcr(dcr(tvpos)));
        checkAndAdd(incr(thpos), dcr(dcr(tvpos)));
    }
    function checkBishop(hpos, vpos) {
        var thpos = hpos, tvpos = vpos;
        while(checkAndAdd((thpos = incr(thpos)), (tvpos = incr(tvpos))));
        thpos = hpos; tvpos = vpos;
        while(checkAndAdd((thpos = dcr(thpos)),(tvpos = dcr(tvpos))));
        thpos = hpos; tvpos = vpos;
        while(checkAndAdd((thpos = dcr(thpos)), (tvpos = incr(tvpos))));
        thpos = hpos; tvpos = vpos;
        while(checkAndAdd((thpos = incr(thpos)), (tvpos = dcr(tvpos))));
    }
    function checkQueen(hpos, vpos) {
        checkBishop(hpos, vpos);
        checkRook(hpos, vpos);
    }
    function checkKing(hpos, vpos) {
        var thpos = hpos, tvpos = vpos;
        checkAndAdd(thpos, incr(tvpos));
        checkAndAdd(thpos, dcr(tvpos));
        checkAndAdd(incr(thpos), tvpos);
        checkAndAdd(dcr(thpos), tvpos);
        checkAndAdd(incr(thpos), incr(tvpos));
        checkAndAdd(incr(thpos), dcr(tvpos));
        checkAndAdd(dcr(thpos), incr(tvpos));
        checkAndAdd(dcr(thpos), dcr(tvpos));
    }
    function incr(char) {
        return String.fromCharCode(char.charCodeAt(0)+1);
    }
    function dcr(char) {
        return String.fromCharCode(char.charCodeAt(0)-1);
    }
    function checkAndAdd(thpos, tvpos) {
        console.log("Thpos + Tvpos " + thpos+tvpos);
        console.log(cmpColor);
        if(cgState[thpos] === undefined) {
            console.log("1");
            return 0;
        }
        if(cgState[thpos][tvpos] === undefined) {
            console.log("2");
            return 0;
        }
        var temp = cgState[thpos][tvpos];
        if (temp === nHold) {
            console.log("3");
            moves.push(thpos+tvpos);
            return 1;
        }
        if (pType[temp].color === cmpColor) {
            console.log("4");
            return 0;
        }
        if (pType[temp].color !== cmpColor) {
            console.log("5");
            moves.push(thpos + tvpos);
            return 0;
        }
        console.log("end");
    }

    this.moveMode = function (val, position) {
        move_mode = val;
        cSelected = position;
    };

    this.checkChessMove = function (target) {
        cTarget = target;
        var hpos = target.charAt(0);
        var vpos = target.charAt(1);
        var pTarget = cgState[hpos][vpos];
        var source = cgState[cSelected.charAt(0)][cSelected.charAt(1)];
        if(pTarget === nHold) return true;
        if(pType[pTarget].color !== pType[source].color) return true;
        return false;
    };

    this.makeChessMove = function () {
        movesMade++;
        var temp = cgState[cSelected.charAt(0)][cSelected.charAt(1)];
        cgState[cSelected.charAt(0)][cSelected.charAt(1)] = nHold;
        cgState[cTarget.charAt(0)][cTarget.charAt(1)] = temp;
        if(turn === 'white') turn = 'black';
        else turn = 'white';
    }
}