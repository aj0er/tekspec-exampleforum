﻿const posts = document.getElementById("posts");
const contentArea = document.getElementById("editContentArea");

const postCreateArea = document.getElementById("post-create");
const postEditArea = document.getElementById("post-edit");
const postCreateForm = document.getElementById("postCreateForm");

const cancelEditBtn = document.getElementById("cancelEditBtn");
const submitEditBtn = document.getElementById("submitEditBtn");

const editForm = document.getElementById("editForm");

const urlSearchParams = new URLSearchParams(window.location.search);

postCreateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const threadId = e.target.threadId.value;

    const request = {
        content: e.target.content.value
    }

    let res = await fetch(`/api/threads/${threadId}/posts`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    });

    if (!res.ok) {
        alert("!");
        return;
    }

    window.location.reload();
});

posts.addEventListener("click", async (e) => {
    const target = e.target;

    const actionType = target.dataset.type;
    if (!actionType)
        return;

    const postId = target.dataset.id;

    switch (actionType) {
        case "delete": {
            await fetch(`/Posts/${postId}`, {
                method: "delete"
            });

            location.reload();
            break;
        }

        case "edit": {
            let postElement = target.parentNode.parentNode.parentNode;
            let postId = postElement.dataset.id;
            let content = postElement.children[1].innerText;

            editForm.dataset.postId = postId;
            contentArea.innerText = content;
            contentArea.focus();
            setEditing(true);
            break;
        }
    }
});

cancelEditBtn.addEventListener("click", () => {
    setEditing(false);
});

submitEditBtn.addEventListener("click", async () => {
    setEditing(false);

    let postId = editForm.dataset.postId;
    let res = await fetch(`/Posts/${postId}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: editForm.content.value
        })
    });

    if (res.ok) {
        location.reload();
    }
})

function setEditing(editing) {
    postCreateArea.style.display = editing ? "none" : "block";
    postEditArea.style.display   = editing ? "block" : "none";
}