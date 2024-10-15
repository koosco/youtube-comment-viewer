// function drawGraph(nodes, links, containerId) {// 1. SVG 설정
//     const width = 800;
//     const height = 600;

//     const svg = d3.select("svg")
//         .attr("width", width)
//         .attr("height", height);

//     // 2. Force Simulation 설정
//     const simulation = d3.forceSimulation(nodes)
//         .force("link", d3.forceLink(links).id(d => d.id).distance(100))  // 링크 설정
//         .force("charge", d3.forceManyBody().strength(-300))  // 서로 밀어내는 힘
//         .force("center", d3.forceCenter(width / 2, height / 2))  // 중앙 정렬
//         .force("collision", d3.forceCollide(50));  // 노드 간의 충돌 방지

//     // 3. 링크 그리기
//     const link = svg.append("g")
//         .attr("class", "links")
//         .selectAll("line")
//         .data(links)
//         .enter().append("line")
//         .attr("class", "link");

//     // 4. 노드 그리기
//     const node = svg.append("g")
//         .attr("class", "nodes")
//         .selectAll("circle")
//         .data(nodes)
//         .enter().append("circle")
//         .attr("class", "node")
//         .attr("r", 10)
//         .call(d3.drag()
//             .on("start", dragstarted)
//             .on("drag", dragged)
//             .on("end", dragended));

//     // 5. 텍스트 라벨 추가
//     const text = svg.append("g")
//         .attr("class", "labels")
//         .selectAll("text")
//         .data(nodes)
//         .enter().append("text")
//         .attr("dx", 12)
//         .attr("dy", ".35em")
//         .text(d => d.id);

//     // 6. 시뮬레이션 업데이트
//     simulation.on("tick", () => {
//         link
//             .attr("x1", d => d.source.x)
//             .attr("y1", d => d.source.y)
//             .attr("x2", d => d.target.x)
//             .attr("y2", d => d.target.y);

//         node
//             .attr("cx", d => d.x)
//             .attr("cy", d => d.y);

//         text
//             .attr("x", d => d.x)
//             .attr("y", d => d.y);
//     });
// }

// // 7. 드래그 이벤트 처리
// function dragstarted(event, d) {
//     if (!event.active) simulation.alphaTarget(0.3).restart();
//     d.fx = d.x;
//     d.fy = d.y;
// }

// function dragged(event, d) {
//     d.fx = event.x;
//     d.fy = event.y;
// }

// function dragended(event, d) {
//     if (!event.active) simulation.alphaTarget(0);
//     d.fx = null;
//     d.fy = null;
// }