const url = "https://api.openai.com/v1/chat/completions"; 
const apiKey = "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"; 

const form = document.getElementById('questionsForm');
const resultsContainer = document.getElementById('results');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const destination = document.getElementById('destino').value;
    const duration = document.getElementById('duracion').value;
    const season = document.getElementById('estacion').value;
    const budget = document.getElementById('presupuesto').value;
    const friends = document.getElementById('acompanantes').value;
    const movement = document.getElementById('transporte').value;
    const food_budget = document.getElementById('presupuesto_comidas').value;
    const activities = document.getElementById('actividades').value;
    const history = document.getElementById('lugares_historicos').value;
    
    const nlf = document.getElementById('vida_nocturna').value;
    const food_int = document.getElementById('comida').value;

    try {
        const prompt = `Genera un plan paso a paso de que hacer para viajar a ${destination} durante ${duration} días en ${season}, con un presupuesto total de ${budget} USD. Viajaré con ${friends} acompañantes y nos moveremos principalmente en ${movement}. El presupuesto para alimentación es de ${food_budget} USD diarios por persona. Durante este viaje, me gustaría participar en las siguientes actividades: "${activities}". Además, me interesa visitar los siguientes lugares históricos: "${history}". En cuanto a la vida nocturna, estoy interesado en: "${nlf}". Preferimos disfrutar de la gastronomía local, especialmente "${food_int}". Por favor, proporciona recomendaciones detalladas y específicas, lugares, precios y situaciones muy especificas para cada día de mi estadía en El Salvador, quiero el plna paso a paso, dia a dia en forma de lista especificamemte.`;
        ;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                messages: [{ role: "user", content: prompt }],
                max_tokens: 600,
                temperature: 0.6,
                model: "gpt-3.5-turbo",
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.choices && data.choices.length > 0) {
            const content = data.choices[0].message.content.trim(); 
            resultsContainer.innerHTML = `<p>${content}</p>`;
            console.log(content);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});
