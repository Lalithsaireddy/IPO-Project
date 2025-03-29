document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("../html/nav/j.html");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.text();
        document.getElementById("content").innerHTML = data;
    } catch (error) {
        console.error("Error fetching the file:", error);
    }
});
