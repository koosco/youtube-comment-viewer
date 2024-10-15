function drawNetworkGraph(nodes, links, containerId) {
    var width = 800;  // width 값 정의
    var height = 800;  // height 값 정의

    var svg = d3.select(`#${containerId}`).append("svg")
        .attr("width", width)
        .attr("height", height);

    // svg.selectAll("*").remove();

    const zoom = d3.zoom()
        .scaleExtent([0.5, 5])
        .on("zoom", zoomed);

    const container = svg.append("g");

    svg.call(zoom);

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = container.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke-width", d => Math.sqrt(d.value) + 1)
        .attr("stroke", "gray");  // 링크 색상 지정

    const node = container.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(nodes)
        .enter().append("g")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );

    const circle = node.append("circle")
        .attr("r", 10)
        .attr("fill", "lightblue")
        .on("click", highlightNode)
        .style("cursor", "pointer");

    node.append("text")
        .attr("dx", 15)
        .attr("dy", ".35em")
        .text(d => d.id);

    node.append("title")
        .text(d => d.id);

    simulation
        .nodes(nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(links);

    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("transform", d => `translate(${d.x},${d.y})`);
    }

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    function highlightNode(event, d) {
        console.log(`links: ${links}`);
        const connectedNodes = new Set();
        const connectedLinks = new Set();

        links.forEach(l => {
            if (l.source.id === d.id) {
                connectedNodes.add(l.target.id);
                connectedLinks.add(l);
            } else if (l.target.id === d.id) {
                connectedNodes.add(l.source.id);
                connectedLinks.add(l);
            }
        });

        node.selectAll("circle").attr("fill", "lightgray");
        link.attr("stroke-opacity", 0.1);

        d3.select(this).attr("fill", "darkblue");
        node.selectAll("circle")
            .filter(n => connectedNodes.has(n.id))
            .attr("fill", "darkblue");

        link
            .filter(l => connectedLinks.has(l))
            .attr("stroke", "darkblue")
            .attr("stroke-opacity", 1);
    }

    function zoomed(event) {
        container.attr("transform", d3.zoomTransform(svg.node()));
    }
}
