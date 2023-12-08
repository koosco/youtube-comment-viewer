// 4. DOM에 새로운 요소 추가
setTimeout(() => {
    var newDiv = document.createElement("div");

    var newHead = document.createElement("h1");
    newHead.textContent = "Custom Div Tag";
    newDiv.appendChild(newHead);

    // var newContentDiv = document.createElement("div");
    // newContentDiv.setAttribute("id", "newContentDiv-result");
    // newDiv.appendChild(newContentDiv);
    
    // start
    const width = 600;
    const height = 400;

    // 새로운 div 생성
    var d3Container = document.createElement("div");
    d3Container.setAttribute("id", "newContentDiv-result");
    newDiv.appendChild(d3Container);

    const svg = d3.select(d3Container)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const jsonData = {
        "nodes": [
            { "id": "Word1", "size": 20 },
            { "id": "Word2", "size": 30 },
            { "id": "Word3", "size": 15 },
            { "id": "Word4", "size": 40}
            // 추가 노드들...
        ],
        "links": [
            { "source": "Word1", "target": "Word2" },
            { "source": "Word2", "target": "Word3" },
            { "source": "Word2", "target": "Word4"}
            // 추가 연결들...
        ]
    };

    const simulation = d3.forceSimulation(jsonData.nodes)
        .force("link", d3.forceLink(jsonData.links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-50))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide().radius(d => d.size + 15));

    const link = svg.append("g")
        .selectAll("line")
        .data(jsonData.links)
        .enter()
        .append("line")
        .style("stroke", "#999")
        .style("stroke-width", 1);

    const node = svg.append("g")
        .selectAll("text")
        .data(jsonData.nodes)
        .enter()
        .append("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("dy", "0.3em")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", d => d.size + "px")
        .text(d => d.id);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });
    // end

    var moreButton = document.createElement('button');
    moreButton.textContent = "더 보기";
    moreButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({moreContent: true}, () => {
            
        }); 
    });
    newDiv.appendChild(moreButton);

    var existingDiv = document.getElementById("secondary");

    // secondary(youtube 우측 최상단)에 결과를 넣을 div tag 삽입
    if(existingDiv) {
        var firstChild = existingDiv.firstChild;
        existingDiv.insertBefore(newDiv, firstChild);
    }
}, 2000);