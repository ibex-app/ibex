let full
const drow_dep_chart = () => {
    document.getElementById('dep-graph').innerHTML = ''
    full = []
    Object.keys(global_filters).filter(a => a != 'categories' && a != 'date' && a != 'platforms').forEach(filter_name => {
        global_filters[filter_name].forEach(filter_val => {
            full.push({ type: filter_name, title: filter_val})
        })
    })

    let matrix = []
    full.forEach( filter_from => {
        let matrix_line = []
        full.forEach( filter_dest => {
            // console.log(filter_from, filter_dest)
            let count
            let filter_type_dest = filter_dest.type == 'persons' ? 'persons_appeared' : filter_dest.type 
            let filter_type_from = filter_from.type == 'persons' ? 'persons_appeared' : filter_from.type 
            if(filter_from.title == filter_dest.title && filter_type_from == filter_type_dest){
                count = 0    
            } else if (filter_type_from == 'channels' && filter_type_dest == 'channels'){
                count = filtered_data.posts.filter(post => post.channel == filter_dest.title && post.channel == filter_from.title).length
            }else if (filter_type_dest == 'channels'){
                count = filtered_data.posts.filter(post => post.channel == filter_dest.title && post[filter_type_from].indexOf(filter_from.title) > -1).length
            }else if (filter_type_from == 'channels'){
                count = filtered_data.posts.filter(post => post[filter_type_dest].indexOf(filter_dest.title) > -1 && post.channel == filter_from.title).length
            }else{
                count = filtered_data.posts.filter(post => post[filter_type_dest].indexOf(filter_dest.title) > -1 && post[filter_type_from].indexOf(filter_from.title) > -1).length
            }
            matrix_line.push(count)
        })
        matrix.push(matrix_line)
    })
    draw_dep_chart_d3(matrix)
}

var l = 0;
const draw_dep_chart_d3 = (matrix_) => {
    var height = window.innerHeight
    var width = window.innerWidth - 360
    var svg = d3.select("#dep-graph")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + (width/(2*1.2)) + "," + (height/2) + ")")
    
    // give this matrix to d3.chord(): it will calculates all the info we need to draw arc and ribbon
    var res = d3.chord()
        .padAngle(0.005)
        // .sortSubgroups(d3.descending)
        (matrix_)
    // if(l != 0) return;
        // console.log("matrix", matrix_, res)
    //  l++
    // Add the links between groups
    svg
        .datum(res)
        .append("g")
        .selectAll("path")
        .data((d) => { return d})
        .enter()
        .append("path")
            .attr("d", d3.ribbon().radius((height - 250)/2))
            .style("fill", d => filter_colors[full[d.source.index].type])
            .style("opacity", d => d.source.value === 1.001 ? .8 : .6 )
            .style("stroke", "rgba(255,255,255,.2)");
    
    // this group object use each group of the data.groups object
    var group = svg
        .datum(res)
        .append("g")
        .selectAll("g")
        .data((d) => { return d.groups})
        .enter()
    
    // // add the group arcs on the outer part of the circle
    group.append("g")
        .append("path")
        .style("fill", d => filter_colors[full[d.index].type])
        .style("stroke", "rgba(255,255,255,.2)")
        .attr("d", d3.arc()
            .innerRadius((height - 250)/2 + 2)
            .outerRadius((height - 250)/2 + 12)
        )
    
    // // Add the labels of a few ticks:
    group
        .selectAll(".group-tick-label")
        .data((d) => { return [{index: d.index, value: d.value, angle: (d.startAngle + d.endAngle) / 2}]})
        .enter()
        .append("g")
        .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + ((height - 250)/2 + 15) + ",0)"; })
        .append("text")
            .attr("x", 8)
            .attr("dy", ".35em")
            .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
            .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
            .text(d =>  full[d.index].title.length < 30 ? full[d.index].title : (full[d.index].title.substr(0, 30) + '...')) 
            .style("fill", d => filter_colors[full[d.index].type])
            .style("font-size", 11)
}
    
// Returns an array of tick angles and values for a given group and step.
function groupTicks(d, step) {
    var k = (d.endAngle - d.startAngle) / d.value;
    return d3.range(0, d.value, step).map(function(value) {
        return { index: d.index, value: value, angle: value * k + (d.startAngle - (d.startAngle - d.endAngle)/2 )};
    });
}