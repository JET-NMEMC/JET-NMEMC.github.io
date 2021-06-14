formatDegree=function(value) {
    ///<summary>将度转换成为度分秒</summary>
    value = Math.abs(value);
    var v1 = Math.floor(value);//度
    var v2 = Math.floor((value - v1) * 60);//分
    var v3 = ((value - v1) * 3600 % 60).toFixed(3);//秒
    return v1 + '°' + v2 + '\′' + v3 + '″';
};
du2dufenmiao=function(value,n) {
    ///<summary>将度转换成为度分秒</summary>
    value = Math.abs(value);
    var v1 = Math.floor(value);//度
    var v2 = Math.floor((value - v1) * 60);//分
    var v3 = ((value - v1) * 3600 % 60).toFixed(n);//秒
    return v1 + '°' + v2 + '\′' + v3 + '″';
};
du2dufen=function(value,n) {
    ///<summary>将度转换成为度分秒</summary>
    value = Math.abs(value);
    var v1 = Math.floor(value);//度
    var v2 = ((value-v1) * 60).toFixed(n);//分
    // var v3 = ((value - v1) * 3600 % 60).toFixed(3);//秒
    return v1 + '°' + v2 + '\′';
};

DegreeConvertBack=function(value) { ///<summary>度分秒转换成为度</summary>
    var du = value.split("°")[0];
    var fen = value.split("°")[1].split(/′|'/)[0];
    var miao = value.split("°")[1].split(/′|'/)[1].split(/″|"/)[0];

    return Math.abs(du) + Math.abs(fen) / 60 + Math.abs(miao) / 3600;
};