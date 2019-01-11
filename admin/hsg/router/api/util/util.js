function RndNum(n){
    var rnd="";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10 + 1 );
    return rnd;
}

module.exports = {RndNum}