function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

const Utils = {
    timeout,
}

export default Utils;