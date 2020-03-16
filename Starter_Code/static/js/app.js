d3.json('samples.json').then((importedData)=>{
    let data = importedData.samples; 
    let demographicData = importedData.metadata;
    // add dropdown
    data.forEach(sample => {
        let id = sample.id;
        let dropDwon = d3.select('#selDataset');
        dropDwon.append('option').text(id)
    });

    let dropdown = d3.select('#selDataset');
    let datasetType = dropdown.node().value;
    let info = d3.select('#sample-metadata').append('ul');
    // Create table    
    function addData (value){
        demographicData.forEach(person => {
            if (person.id === parseInt(value)) {
                Object.entries(person).forEach(([key, value]) => {
                    info.append('li').text(`${key}: ${value}`)
                });
            };
        });
    }
    // Sort data for bar chart
    function sortData(idValue){
        data.forEach(sample => {
            if (sample.id === idValue) { //string
                let value = sample.sample_values,
                    otuId = sample.otu_ids,
                    otuLabel = sample.otu_labels;
                let zipped = [];
                    topTen = [];
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
                let top = sorted.slice(0, 10);
                top = top.reverse();
                top.forEach(i => topTen.push(i));
            }
        });   
        // console.log(topTen);
        return topTen; 
    }
    // initialize page    
    function init() {
        //bar chart
        let topTen = sortData('940');
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
            width: 500
        };
        Plotly.newPlot('bar', trace, layout);   
        //bubble chart
        let bubbleInit = data[0];
        let trace1 = [{
            mode: "markers",
            x: bubbleInit.otu_ids,
            y: bubbleInit.sample_values,
            marker:{
                color:bubbleInit.otu_ids,
                size:bubbleInit.sample_values
            },
            text: bubbleInit.otu_labels,
        }];
        let layout1 = {
            xaxis:{title: `OTU ID: ${datasetType}`}
        };
        Plotly.newPlot('bubble', trace1, layout1);   
        //table
        addData('940');
    }
    //update page
    function update(){
        d3.select('#sample-metadata').text("")
        dropdown = d3.select('#selDataset');
        datasetType = dropdown.node().value;  //string
        info = d3.select('#sample-metadata').append('ul');
        addData(datasetType);
        let newData = sortData(datasetType);
        console.log(newData);
        Plotly.restyle('bar', 'x',[newData.map(obj => obj.value)]);
        Plotly.restyle('bar','y',[newData.map(obj => obj.id)]);
        Plotly.restyle('bar','label',[newData.map(obj => obj.id)]);
        Plotly.restyle('bar','text',[newData.map(obj => obj.label)]); 
        data.forEach(sample => {
            if (sample.id === datasetType) {
                Plotly.restyle('bubble', 'x',[sample.otu_ids],'y',[sample.sample_values],'color',[sample.otu_ids],'size',[sample.sample_values],'text',[sample.otu_labels]);
            };
        });
    }
    d3.select('#selDataset').on('change',update);
    init();
});
