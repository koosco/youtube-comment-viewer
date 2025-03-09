// 데이터를 받아와 워드 클라우드를 업데이트하는 함수
function updateWordCloud(comments, containerId) {
    let words = Object.entries(comments).map(([key, value]) => ({
        text: key,
        size: value
    }));

    drawWordCloud(words, containerId);
}

// 워드 클라우드를 생성하는 함수
function drawWordCloud(words, containerId) {
    console.log(JSON.stringify(words));
    console.log('container id is', containerId);
    
    const width = 800;
    const height = 800;

    // SVG 선택 및 설정
    const svg = d3.select(`#${containerId}`).append("svg")
        .attr("width", width)
        .attr("height", height);

    // Zoom 가능한 그룹 생성
    const g = svg.append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);  // 초기 위치를 중앙으로 설정

    svg.call(d3.zoom().on("zoom", zoomed));

    // 워드 클라우드 레이아웃 설정
    const layout = d3.layout.cloud()
        .size([width, height])
        .words(words)
        .padding(5)
        .rotate(() => Math.random() * 90 - 45)  // -45도에서 45도 사이 무작위 회전
        .fontSize(d => d.size * 3)
        .on("end", renderWords);  // `renderWords` 함수 호출

    layout.start();

    // 워드 클라우드 그리기 함수
    function renderWords(words) {
        g.selectAll("text")
            .data(words)
            .enter()
            .append("text")
            .style("font-size", d => `${d.size}px`)
            .style("fill", (d, i) => d3.schemeCategory10[i % 10])  // 색상 팔레트
            .attr("text-anchor", "middle")
            .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
            .text(d => d.text);
    }

    function zoomed(event) {
        g.attr("transform", event.transform);
    }
}
