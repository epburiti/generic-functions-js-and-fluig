maskMoeda = intvariavel => {
    let tmporario = intvariavel + '';
    tmporario = tmporario.replace(/([0-9]{2})$/g, ",$1");
    if (tmporario.length > 6)
        tmporario = tmporario.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    return tmporario;
}