var apikey = "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"

function OpenaiFetchAPI(destination, duration, season) {
    console.log("Calling GPT3");
    var url = "https://api.openai.com/v1/chat/completions";
    var bearer = 'Bearer ' + apikey;

    var prompt = `Dame un itinerario para viajar a este destino: ${destination} por ${duration} días durante la estación del año ${season}. En este viaje a El Salvador,`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "messages": [{ role: "user", content: prompt}],
            "max_tokens": 50, 
            "temperature": 0.7, 
            "model": "gpt-3.5-turbo",
            "top_p": 1,
            "n": 1,
            "stream": false,
            "logprobs": null,
            "stop": "\n"
        })
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        console.log(data['choices'][0].text); 
    }).catch(error => {
        console.log('Something bad happened ' + error);
    });
}
var destino = "El Salvador";
var duracion = "4";
var estacion = "verano";

OpenaiFetchAPI(destino, duracion, estacion);
