function initViz(){ 

    var books = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
    /*
    maps the chunks to an index 
    */
    var chunks = {
        '1-50':1,
        '51-100':2,
        '101-150':3,
        '151-200':4,
        '201-250':5, 
        '251-300':6, 
        '301-350':7,
        '351-400':8,
        '401-450':9,
        '451-500':10,
        '501-550':11,
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

    var buckets = 9;

    // eventually replace this with a color brewer
    var colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"];

    $('#datafilter').on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
      var dataFilter = $("option:selected").text();
      updateIndex(dataFilter);
      d3.selectAll(".chunk").style("display","none"); // reset the text display
    });

    // load the data
    d3.json("/data/quot_freq4.json", function(error, data) {
      if (error) return console.warn(error);
      createIndex(data);
      // TODO: pre-load the results into the HTML
      });

    d3.json("/data/perseus_aeneid.json", function(error, data) {
      if (error) return console.warn(error);
      loadText(data);
      });

    function updateIndex(filter){
      var cells = d3.select("#chart").select("svg").selectAll("rect");
      // re-compute the color-scale
      var colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(cells.data(), function (d) { 
                if(d.counts != null){
                  if(filter == "references"){
                    return d.counts.reference_count;
                  }
                  else if(filter == "quotations"){
                    return d.counts.quotation_count;
                  }
                  else{
                    return d.counts.quotation_count + d.counts.reference_count;
                  }
                }
              })])
              .range(colors);

      cells.transition().duration(500)
      .style("fill", function(d){
          if(filter == "references"){
            return ((d.counts == null) ? "#D3D3D3" : colorScale(d.counts.reference_count));
          }
          else if(filter == "quotations"){
            return ((d.counts == null) ? "#D3D3D3" : colorScale(d.counts.quotation_count));
          }
          else{
            return ((d.counts == null) ? "#D3D3D3" : colorScale(d.counts.quotation_count + d.counts.reference_count));
          }
      });

      //cells.on("click",function(d){console.log(filter);});
    };

    function createIndex(incomingData){
      var margin = { top: 15, right: 0, bottom: 0, left: 60 },
          width = 960 - margin.left - margin.right,
          height = 550 - margin.top - margin.bottom,
          gridSize = Math.floor(height / 21); // perhaps needs to be changed

      var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var tooltip = d3.tip()
                      .attr('class', 'd3-tip')
                      .html(function(d) { 
                        // TODO: replace with moustache template!
                        return "<strong>References</strong>: <span>"+
                        d.counts.reference_count+"</span><br/> <strong>Quotations:</strong> <span>"
                        +d.counts.quotation_count+"</span>";
                      });

      tooltip.offset([-7,0]);

      svg.call(tooltip);

      var colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(incomingData, function (d) { 
                if(d.counts != null){
                  return d.counts.quotation_count + d.counts.reference_count;
                }
              })])
              .range(colors);
      
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

      cells.enter().append("rect")
          .attr("x", function(d) { return (d.book - 1) * gridSize; })
          .attr("y", function(d) { return (chunks[d.chunk] - 1) * gridSize; })
          .attr("rx", 4)
          .attr("ry", 4)
          .attr("class", "bordered")
          .attr("width", gridSize)
          .attr("height", gridSize)
          .style("fill", function(d){
              return ((d.counts == null) ? "#D3D3D3" : colors[0]);
          })
          .on("click",function(d){
            if(d.counts != null){
              var chunk_els = d3.selectAll(".chunk");
              chunk_els.style("display",function(el){
                return ((el.book == d.book && el.chunk == d.chunk) ? "block" : "none");
              });
            }
          })
          .on("mouseover",tooltip.show)
          .on("mouseout",tooltip.hide)
          ;
      cells.transition().duration(500)
              .style("fill", function(d) {
                return ((d.counts == null) ? "#D3D3D3" : colorScale(d.counts.quotation_count + d.counts.reference_count));
              });
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
        // TODO: add a human-readable heading
        return "chunk-"+d.book+"-"+d.chunk;
      })
      .html(function(d){
        return "<h5>"+"(Book "+d.book+", lines "+d.chunk+")</h4>";
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