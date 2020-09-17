let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
let ur = document.getElementById('ur');
socket.onopen = () => {
    console.log("Successfully Connected");
};

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!")
};

socket.onerror = error => {
    console.log("Socket Error: ", error);
};
let animation = {
    ur: new CountUp('ur', 0, 0, 2, 1, { decimalPlaces: 2, useEasing: true, useGrouping: false, separator: " ", decimal: "." }),
};
let tempState;
socket.onmessage = event => {
    let data = JSON.parse(event.data);
    if (tempState !== data.menu.state) {
        tempState = data.menu.state;
        if (tempState == 2) ur.style.opacity = 1;
        else ur.style.opacity = 0;
    };
    if (data.gameplay.hits.unstableRate != '') animation.ur.update(data.menu.mods.num >= 64 ? data.gameplay.hits.unstableRate / 1.5 : data.gameplay.hits.unstableRate);
    else animation.ur.update(0);
};