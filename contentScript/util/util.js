function createTag(tag, id, text) {
    const div = document.createElement(tag);
    div.setAttribute("id", id);

    if (text !== undefined) {
        div.textContent = text;
    }
    return div;
}

function appendChildDivTo(parent, child) {
    parent.appendChild(child);
}

function clearComments() {
    barGraphElements = null;
    barEntireDataLatest = null;
    token = null;
}