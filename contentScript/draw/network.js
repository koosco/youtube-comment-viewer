function drawNetworkGraph(nodes, links) {
    const svg = d3.select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    svg.selectAll("*").remove();

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
        .attr("stroke-width", d => Math.sqrt(d.value) + 1);

    const node = container.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(nodes)
        .enter().append("g")
        .call(d3.drag()  // 드래그 기능 추가
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );

    const circle = node.append("circle")
        .attr("r", 10)
        .attr("fill", "lightblue")
        .on("click", highlightNode)
        .style("cursor", "pointer");  // 마우스가 올라갔을 때 커서 변경

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

    // 드래그 동작 함수들
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

    // 노드 강조 기능
    function highlightNode(event, d) {
        // 연결된 링크 및 노드를 필터링
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

        // 모든 노드 및 링크를 흐리게 처리
        node.selectAll("circle").attr("fill", "lightgray");
        link.attr("stroke-opacity", 0.1);

        // 선택된 노드 및 연결된 노드 강조
        d3.select(this).attr("fill", "darkblue");  // 클릭된 노드 강조
        node.selectAll("circle")
            .filter(n => connectedNodes.has(n.id))  // 연결된 노드 필터링
            .attr("fill", "darkblue");  // 연결된 노드를 짙은 파란색으로

        // 연결된 링크 강조
        link
            .filter(l => connectedLinks.has(l))
            .attr("stroke", "darkblue")  // 강조된 링크 색상 변경
            .attr("stroke-opacity", 1);  // 연결된 링크 강조
    }

    // 줌 이벤트 함수
    function zoomed(event) {
        container.attr("transform", event.transform);
    }
}