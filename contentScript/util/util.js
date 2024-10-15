function createTag(tag, id, text) {
    const div = document.createElement(tag);
    div.setAttribute("id", id);

    if (text !== undefined) {
        div.textContent = text;
    }
    return div;
}

function addChildDivTo(parent, child) {
    parent.appendChild(child);
}

function clearComments() {
    graphElements = null;
    entireDataLatest = null;
    token = null;
}