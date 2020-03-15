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
// bar chart    
    function init() {
        // data.forEach(sample => {
        //     if (sample.id === parseInt(datasetType)) {
        //         let value = sample.sample_values,
        //             otuId = sample.otu_ids,
        //             otuLabel = sample.otu_labels,
        //             zipped=[];
        //         for (let i=0; i<value.length;i++){
        //             zipped.push({
        //                 value: value[i],
        //                 id: `OTU ${otuId[i]}`,
        //                 label: otuLabel[i]
        //             });
        //         };
        //         let sorted = zipped.sort((a, b) => {
        //             return b.value - a.value;
        //         });
        //         let topTen = sorted.slice(0, 10);
        //         topTen = topTen.reverse();
        //         let trace = [{
        //             x: topTen.map(obj => obj.value),
        //             y: topTen.map(obj => obj.id),
        //             label: topTen.map(obj => obj.id),
        //             text: topTen.map(obj => obj.label),
        //             type: "bar",
        //             orientation:'h'
        //         }];
        //         let layout = {
        //             height: 600,
        //             width: 800
        //         };
        //         Plotly.newPlot('bar', trace, layout);     
        //     };
        // });
        
        
        
        // function sortData(x){
            
        //     let sample = data[x];
        //     let value = sample.sample_values
        //     let otuId = sample.otu_ids
        //     let otuLabel = sample.otu_labels
        //     zipped = []
        //     for (let i=0; i<value.length;i++){
        //         zipped.push({
        //             value: value[i],
        //             id: `OTU ${otuId[i]}`,
        //             label: otuLabel[i]
        //         });
        //     };
        //     let sorted = zipped.sort((a, b) => {
        //         return b.value - a.value;
        //     });
        //     let topTen = sorted.slice(0, 10);
        //     topTen = topTen.reverse();
        //     return topTen;
        //     // console.log(topTen);    
        // }

   
        // let topTen = sortData(0);
        // // console.log(topTen)
        // let trace = [{
        //     x: topTen.map(obj => obj.value),
        //     y: topTen.map(obj => obj.id),
        //     label: topTen.map(obj => obj.id),
        //     text: topTen.map(obj => obj.label),
        //     type: "bar",
        //     orientation:'h'
        // }];
        // let layout = {
        //     height: 600,
        //     width: 800
        // };
        // Plotly.newPlot('bar', trace, layout);

// Initial Table
        let info = d3.select('#sample-metadata').append('ul');
        // console.log(datasetType);
        function addData (value){
            demographicData.forEach(person => {
                if (person.id === parseInt(value)) {
                    Object.entries(person).forEach(([key, value]) => {
                        info.append('li').text(`${key}: ${value}`)
                    });
                };
            });
        }
        addData('940');
    }
    init();
    function optionChanged(value){
        console.log(value);
        // addData(value);
        // Plotly.restyle('bar', 'x',[],'y',[],'label',[],'text',[]);
    }

});

