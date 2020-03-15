let dropdown = d3.select('#selDataset');
let datasetType = dropdown.node().value;

d3.json('samples.json').then((importedData)=>{
    let data = importedData.samples; 
    // add dropdown
    data.forEach(sample => {
        let id = sample.id;
        let dropDwon = d3.select('#selDataset');
        dropDwon.append('option').text(id)
    });

    function init() {
        function sortData(x){
            let sample = data[x];
            let value = sample.sample_values
            let otuId = sample.otu_ids
            let otuLabel = sample.otu_labels
            zipped = []
            for (let i=0; i<value.length;i++){
                zipped.push({
                    value: value[i],
                    id: `OTU ${otuId[i]}`,
                    label: otuLabel[i]
                });
            };
            let sorted = zipped.sort((a, b) => {
                return b.value - a.value;
            });
            let topTen = sorted.slice(0, 10);
            topTen = topTen.reverse();
            return topTen;
            // console.log(topTen);    
        }
        //Initial Plot
        let topTen = sortData(0);
        console.log(topTen)
        let trace = [{
            x: topTen.map(obj => obj.value),
            y: topTen.map(obj => obj.id),
            label: topTen.map(obj => obj.id),
            text: topTen.map(obj => obj.label),
            type: "bar",
            orientation:'h'
        }];
        
        let layout = {
            height: 600,
            width: 800
        };
        Plotly.newPlot('bar', trace, layout);
        // Initial Table
        let table = d3.select('panel-title');
        function addData (){

        }
    };
    // function buildPlot() {
    //     let dropdown = d3.select('#selDataset');
    //     let datasetType = dropdown.node().value;
    //     id === datasetType;

        // function init() {
        //     let trace = [{
        //         x: topTen.map(obj => obj.otu_ids),
        //         y: topTen.map(obj => obj.sample_values),
        //         text:otuLabel,
        //         type: "bar",
        //         orientation:'h'
        //     }];
        //     let layout = {
        //         height: 600,
        //         width: 800
        //     };
        //     Plotly.newPlot('bar', trace, layout);
        // };
    // };
    init();
});

// d3.select('#selDataset').on('click', buildPlot());