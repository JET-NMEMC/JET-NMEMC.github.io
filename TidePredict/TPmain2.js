var consituate = {};
// var cstlist = ["k1_j", "o1_j", "m2_j", "s2_j", "2n2_j", "j1_j", "k2_j", "l2_j", "m1_j", "mu2_j", "n2_j", "nu2_j", "oo1_j", "p1_j", "q1_j", "t2_j"];
var cstlist = ["O1", "K1", "M2", "S2", "2N2", "J1", "K2", "L2", "M1", "MU2", "N2", "NU2", "OO1", "P1", "Q1", "T2"];
var cstlist2 = ["MF", "MM", "MSF", "MSM", "MTM", "SA", "SSA"];
var textstr
for (var i = 0; i < cstlist.length; i++) {
    document.write('<script src="omap/' + cstlist[i] + '.js" type="text/javascript"></script>');
}