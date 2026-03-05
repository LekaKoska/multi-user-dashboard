const loadButton = document.querySelector("#loadBtn");
const loadStatus = document.querySelector("#status");
const dashboard = document.querySelector("#dashboard");

loadButton.addEventListener("click", getUsers);

async function getUsers() {
	loadStatus.classList.add("loadStatus");
	loadStatus.innerHTML = "Loading.. ⏳";

	try {
		const response = await fetch("https://jsonplaceholder.typicode.com/users");
		if (!response.ok) {
			throw new Error("Request failed");
		}
		loadStatus.innerHTML = "";

		const data = await response.json();
		renderUser(data);
	} catch (err) {
		console.error(err);
	}
}

function renderUser(data) {
	const html = data
		.map(
			(user) => `
        <div class="user-card">
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>City:</strong> ${user.address.city}</p>
            <p><strong>Adress:</strong> ${user.address.street}</p>
            <button class="delete-btn">Obriši</button>
        </div>
    `,
		)
		.join("");

	dashboard.innerHTML = html;
}

const waiting = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

dashboard.addEventListener("click", async (event) => {
	if (event.target.tagName === "BUTTON") {
		const button = event.target;
		const card = event.target.closest(".user-card");

		button.textContent = "Deleting..";
		button.disabled = true;

		await waiting(1000);
		card.remove();
		console.log("Ovo se izvrsava tek posle brisanja");
	}
});
