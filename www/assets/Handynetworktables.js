function batteryPercent(voltage){
    var normalizedVoltage = voltage - 5;
    // console.log(normalizedVoltage);
    return normalizedVoltage * 20;

}