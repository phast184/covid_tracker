export const fetchThings = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
    
}


export const buildChartData = (data, caseType) => {
    let chartData = [];
    let lastDataPoint;

    for (let date in data.cases){
        if(lastDataPoint){
            let newDataPoint = {
                x: date,
                y: data[caseType][date] - lastDataPoint,
            }
            chartData.push(newDataPoint)
        }
        lastDataPoint = data[caseType][date]
    }
    return chartData;
}

