function drawNetworkGraph(nodes, links, containerId) {
    var width = 600;
    var height = 600;

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
        .on("click", highlightNode, links)
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
        console.log(`d: ${d}`);
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    function highlightNode(event, d, links) {
        const connectedNodes = new Set();
        const connectedLinks = new Set();

        console.log(`d: ${d.id}`);
        for(const link of links) {
            const json = JSON.stringify(link);
            console.log(`data: ${json}`);
            break;
        }
    
        // 링크 데이터를 탐색하여 연결된 노드와 링크를 필터링
        links.forEach(l => {
            // source와 target이 객체일 수 있으므로 .id 또는 직접 비교
            const sourceId = l.source.id || l.source;
            const targetId = l.target.id || l.target;
    
            if (sourceId === d.id) {
                connectedNodes.add(targetId);
                connectedLinks.add(l);
            } else if (targetId === d.id) {
                connectedNodes.add(sourceId);
                connectedLinks.add(l);
            }
        });
    
        // 모든 노드 및 링크를 흐리게 처리
        node.selectAll("circle").attr("fill", "lightgray");
        link.attr("stroke-opacity", 0.1);
    
        // 선택된 노드 및 연결된 노드 강조
        d3.select(this).attr("fill", "darkblue");  // 클릭된 노드 강조
        node.selectAll("circle")
            .filter(n => connectedNodes.has(n.id || n))  // 연결된 노드 필터링
            .attr("fill", "darkblue");
    
        // 연결된 링크 강조
        link
            .filter(l => connectedLinks.has(l))
            .attr("stroke", "darkblue")
            .attr("stroke-opacity", 1);
    }

    function zoomed(event) {
        container.attr("transform", d3.zoomTransform(svg.node()));
    }
}
