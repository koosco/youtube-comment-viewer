function drawGraph(dataset, containerId) {
    console.log("drawGraph 호출");
    const width = 600;
    const height = 400;
    const padding = 40;

    // d3Container 생성 및 추가
    var d3Container = document.createElement("div");
    d3Container.setAttribute("id", containerId);
    
    var newDiv = document.getElementById("newContentDiv");
    newDiv.appendChild(d3Container);

    // SVG 영역 설정
    var svg = d3.select(`#${containerId}`).append("svg")
        .attr("width", width)
        .attr("height", height);

    // 그라데이션 정의 추가
    var defs = svg.append("defs");

    var gradient = defs.append("linearGradient")
        .attr("id", "barGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");  // 수직 그라데이션

    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "steelblue");

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "lightblue");

    // 축 스케일 설정
    var xScale = d3.scaleBand()
        .rangeRound([padding, width - padding])
        .padding(0.1)
        .domain(dataset.map(d => d.name));

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d.value)])
        .range([height - padding, padding]);

    // x축 표시
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height - padding})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // y축 표시
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${padding},0)`)
        .call(d3.axisLeft(yScale));

    // 막대 표시
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - padding - yScale(d.value))
        .attr("fill", "url(#barGradient)");  // 그라데이션 적용

    // 값 레이블 추가
    svg.selectAll(".value-label")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class", "value-label")
        .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.value) - 5)
        .attr("text-anchor", "middle")
        .text(d => d.value);

    // 그래프를 첫 번째 자식 요소로 삽입
    if(newDiv.firstChild) {
        newDiv.insertBefore(d3Container, newDiv.firstChild);
    } else {
        newDiv.appendChild(d3Container);
    }

    return { svg, xScale, yScale, width, height, padding };
}


function updateGraph(graphElements, newDataset) {
    const { svg, xScale, yScale, width, height, padding } = graphElements;

    // 새로운 그라데이션 정의 추가 (노란색 계열)
    var defs = svg.select("defs");
    if (defs.empty()) {
        defs = svg.append("defs");
    }

    var gradient = defs.append("linearGradient")
        .attr("id", "barGradientYellow")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#FFD700");  // 금색 (yellow)

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#FFFFE0");  // 연한 노란색 (light yellow)

    // x축 도메인 업데이트
    xScale.domain(newDataset.map(d => d.name));

    // y축 도메인 업데이트
    yScale.domain([0, d3.max(newDataset, d => d.value)]);

    // x축 업데이트
    svg.select(".x-axis")
        .transition()
        .duration(1000)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // y축 업데이트
    svg.select(".y-axis")
        .transition()
        .duration(1000)
        .call(d3.axisLeft(yScale));

    // 막대 업데이트
    const bars = svg.selectAll("rect")
        .data(newDataset, d => d.name);

    bars.enter()
        .append("rect")
        .attr("x", d => xScale(d.name))
        .attr("y", height - padding)
        .attr("width", xScale.bandwidth())
        .attr("height", 0)
        .attr("fill", "url(#barGradientYellow)")  // 노란색 그라데이션 적용
        .merge(bars)
        .transition()
        .duration(1000)
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - padding - yScale(d.value));

    bars.exit()
        .transition()
        .duration(1000)
        .attr("y", height - padding)
        .attr("height", 0)
        .remove();

    // 값 레이블 업데이트
    const labels = svg.selectAll(".value-label")
        .data(newDataset, d => d.name);

    labels.enter()
        .append("text")
        .attr("class", "value-label")
        .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
        .attr("y", height - padding)
        .attr("text-anchor", "middle")
        .text(d => d.value)
        .merge(labels)
        .transition()
        .duration(1000)
        .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.value) - 5)
        .text(d => d.value);

    labels.exit()
        .transition()
        .duration(1000)
        .attr("y", height - padding)
        .remove();
}
