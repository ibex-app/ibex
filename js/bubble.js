

var xScale, scaleCircleArea, groups_data
const drow_bubble = () => {
    // y - Likes -> GovOpo
    // size - sum - views - interactions

    group_by = "platform"
    x = "Likes"
    y = "hateSpeech"
    size = "sum"
    // filtered_data.posts.forEach(post => post.Comments = Math.floor(Math.random() * (11000, 8)))
    // groups_data.forEach(post => post.GovOpo = Math.floor(Math.random() * 200)/100-1)
    filtered_data.posts.forEach(post => post.hateSpeech = Math.floor(Math.random() * 100))
    
    group_names_arr = filtered_data.posts.map(post => post[group_by])
    group_names_flattened = [].concat.apply(group_names_arr);
    group_unique_names = group_names_flattened.filter((item, i, ar) => ar.indexOf(item) === i)

    groups_data = group_unique_names.map((group_name, index) => {
        let posts_in_group = filtered_data.posts.filter(post => post[group_by].indexOf(group_name) > -1)
        let ret_val = {
            index: index,
            title: group_name,
        }
    
        if (size == "sum" ){
            ret_val[size] = posts_in_group.length
        }
        ret_val[x] = posts_in_group.map(post => post[x]).reduce((a, b) => a + b, 0)
        ret_val[y] = posts_in_group.map(post => post[y]).reduce((a, b) => a + b, 0)/posts_in_group.length
        return ret_val
    })

    groups_data[0][size] = 8
    groups_data[1][size] = 180
    groups_data[2][size] = 40
    groups_data[3][size] = 16
    groups_data[4][size] = 160
    groups_data[5][size] = 120

    groups_data[0][y] = 80
    groups_data[1][y] = 60
    groups_data[2][y] = 8
    groups_data[3][y] = 15
    groups_data[4][y] = 10
    groups_data[5][y] = 86
    
    // define scales
    rect = document.querySelector('.sub-content').getBoundingClientRect()

    max_size = Math.max.apply(Math, groups_data.map(post => post[size]));

    maxCircleArea = Math.PI * Math.pow(80, 2);

    circleAreaScale = d3.scaleLinear()
        .domain([0, max_size])
        .range([0, maxCircleArea]);

    scaleCircleArea = (d) => {
        return Math.sqrt(circleAreaScale(d) / Math.PI)
    }

    max_x = Math.max.apply(Math, groups_data.map(post => post[x]));
    min_x = Math.min.apply(Math, groups_data.map(post => post[x]));
    
    xScale = d3.scaleLinear().domain([min_x * .95, max_x * 1.05]).range([50, rect.right - rect.left])

    max_y = Math.max.apply(Math, groups_data.map(post => post[y]));
    min_y = Math.min.apply(Math, groups_data.map(post => post[y]));
    yScale = d3.scaleLinear().domain([100, 0]).range([50, (rect.bottom - rect.top) * 1.05])
    

    // drow axis
    xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(6)

    yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(6)
  
    d3.select("svg")
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0,"+((rect.bottom - rect.top)*1.1)+")")
        .call(xAxis)
        .append("text")
        .attr("x", rect.right - rect.left)
        .attr("y", "50")
        .attr("color", "red")
        .text(x)

    d3.select("svg")
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(50, 50)")
        .call(yAxis)
        .append("text")
        .attr("x", "100")
        .attr("y", "50")
        .attr("color", "red")
        .text(y)
  
    
    

    //tooltipTitle
    var toolTip = d3.select('body')
        .append('div')
        .attr('id', 'tooltip')
        .attr('style', 'position: absolute; opacity: 0;');
    
    // drow circles
    var k = d3.select("svg")
        .selectAll("circle")
        .data(groups_data)
        .enter()
    
    k.append("circle")
        .attr("r", d => scaleCircleArea(d[size]))
        .attr('cy', d => yScale(d[y]))
        .attr('cx', d => xScale(d[x]))
        .attr('fill', d => colors[d.index] ? colors[d.index] : colors[d.index - colors.length])
        .on('mouseover', function (d) {
            d3.select('#tooltip')
                .transition()
                .duration(200)
                .style('opacity', 1);

            d3.select('#tooltip').html(x + ':' + d[x] + "<br>" +  y +": " + "$" + d[y] + "T" + "<br/>" + size + ":" + (d[size] / 1000000000).toFixed(2))
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px")
        })
        .on('mouseout', function () {
            d3.select('#tooltip').style('opacity', 0)
        })

        k.append("circle")
            .attr('fill', d => colors[d.index] ? colors[d.index] : colors[d.index - colors.length])
            .attr("cx", rect.right - rect.left + 50)
            .attr('cy', d => 46 + (d.index * 25))
            .attr("r", 8)
        
        k.append("text")
            .attr("class","legend")
            .attr("x", rect.right - rect.left + 80)
            .attr("y", d => 50+ (d.index * 25))
            .text(d => d.title)

}


