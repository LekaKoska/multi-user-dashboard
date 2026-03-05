const loadButton = document.querySelector("#loadBtn");
const loadStatus = document.querySelector("#status");

loadButton.addEventListener("click", getUsers);

async function getUsers() {
	loadStatus.classList.add("loadStatus");
	loadStatus.innerHTML += "Loading.. ⏳";

	try {
		const response = await fetch("https://jsonplaceholder.typicode.com/users");
		if (!response.ok) {
			throw new Error("Request failed");
		}
		loadStatus.innerHTML = "";

		const data = response.json();
		return data;
	} catch (err) {
		console.error(err);
	}
}
