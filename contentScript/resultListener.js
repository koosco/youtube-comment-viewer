// 3. background에서 데이터 받음
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // 5. DOM에 data 표시
    if(request.result){
        // var newItem = document.getElementById("newContentDiv-result");
        console.log(request);
        console.log(request.result);
        console.log(request.result.data);
        const dataset = request.result.data;
        //div 추가

        const width = 600;
        const height = 400;
    
        // 새로운 div 생성
        var d3Container = document.createElement("div");
        d3Container.setAttribute("id", "newContentDiv-result");
        
        var newDiv = document.getElementById("newContentDiv");
        newDiv.appendChild(d3Container);
        

        var padding = 30; // 스케일 표시용 여백
    
        // 2. SVG 영역 설정
        var svg = d3.select(d3Container).append("svg").attr("width", width).attr("height", height);

        //  3. 축 스케일(눈금) 설정
        var xScale = d3.scaleBand()
        .rangeRound([padding, width - padding])
        .padding(0.1)
        .domain(dataset.map(function (d) { return d.name; }));

        var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function (d) { return d.value; })])
        .range([height - padding, padding]);

        // 4. 축 표시
        svg.append("g")
        .attr("transform", "translate(" + 0 + "," + (height - padding) + ")")
        .call(d3.axisBottom(xScale));

        svg.append("g")
        .attr("transform", "translate(" + padding + "," + 0 + ")")
        .call(d3.axisLeft(yScale));

        // 5. 막대 표시
        svg.append("g")
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function (d) { return xScale(d.name); })
        .attr("y", function (d) { return yScale(d.value); })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return height - padding - yScale(d.value); })
        .attr("fill", "steelblue");

        if(newDiv) {
            var firstChild = newDiv.firstChild;
            newDiv.insertAfter(d3Container, firstChild);
        }
        //div 추가 끝
        }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // 5. DOM에 data 표시
    if(request.moreContentresult){
        console.log(request.moreContentresult);
    }
});