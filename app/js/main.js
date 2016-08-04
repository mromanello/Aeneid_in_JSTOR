function initViz(){
    // load the data
    d3.json("/data/quot_freq_empty2.json", function(error, data) {
      if (error) return console.warn(error);
      createIndex(data);
      });

    d3.json("/data/aeneid.json", function(error, data) {
      if (error) return console.warn(error);
      loadText(data);
      });

    function createIndex(incomingData){
      var margin = { top: 15, right: 0, bottom: 0, left: 50 },
          width = 960 - margin.left - margin.right,
          height = 550 - margin.top - margin.bottom,
          gridSize = Math.floor(height / 20);

      // #chart will need to be replaced with the ID of the left column
      var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      // eventually replace this with a color brewer
      var colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]
      var books = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"]
      /*
      maps the chunks to an index 
      */
      var chunks = {
          '1-50':1,
          '101-150':2,
          '151-200':3,
          '201-250':4, 
          '251-300':5, 
          '301-350':6,
          '351-400':7,
          '401-450':8,
          '451-500':9,
          '501-550':10,
          '51-100':11,
          '551-600':12,
          '601-650':13,
          '651-700':14,
          '701-750':15,
          '751-800':16,
          '801-850':17,
          '851-900':18,
          '901-950':19,
          '951-1000':20
      }
      // create the row labels (line chunk)
      var lineChunkLabels = svg.selectAll(".lineChunkLabel")
          .data(Object.keys(chunks))
          .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", "label");
      // create 
      var bookLabels = svg.selectAll(".bookLabel")
          .data(books)
          .enter().append("text")
            .text(function(d) { return d; })
            .attr("x", function(d, i) { return i * gridSize; })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("class","label");
      
      var cells = svg.selectAll(".cell")
          .data(incomingData,function(d){
            return d.book+":"+d.chunk;
          })
          ;

      //cells.append("title");

      cells.enter().append("rect")
          .attr("x", function(d) { return (d.book - 1) * gridSize; })
          .attr("y", function(d) { return (chunks[d.chunk] - 1) * gridSize; })
          .attr("rx", 4)
          .attr("ry", 4)
          .attr("class", "bordered")
          .attr("width", gridSize)
          .attr("height", gridSize)
          .style("fill", colors[0]);
    };

    function loadText(textData){
      /*
      * loads the text of the Aeneid into the HTML
      * with display:none; display of the text is then
      * triggered by click events on the heatmap-index
      */
      var chunks = d3.select("#text")
      .selectAll("div.chunk")
      .data(textData)
      .enter()
      .append("div")
      .attr("class","chunk")
      .style("display","none")
      .attr("id",function(d){
        return "chunk-"+d.book+"-"+d.chunk;
      });
      
      var lines = chunks.selectAll("div.line")
      .data(function(d){
        return d.lines;
      })
      .enter()
      .append("div")
      .attr("class","line")
      .html(function(d){
        return d.text;
        //return "<span>("+d.line+") </span>"+d.text;
      })
      ;
    };

      // TO be continued...
      /*
      TODO: 
      * bind each cell with a click event => on click show 
      * tooltip on each cell (bootstrap) showing number of quotations and number of references
      */
};