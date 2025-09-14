// js/script.js

/**
 * Get the container element for a given task status.
 * @param {string} status - The status of the task ("todo", "doing", "done").
 * @returns {HTMLElement} The container element for that status.
 */
function getTaskContainer(status) {
  return document.querySelector(`.${status}-container`);
}

/**
 * Create a task card element for a given task.
 * @param {Object} task - The task object.
 * @param {number} task.id - The unique ID of the task.
 * @param {string} task.title - The title of the task.
 * @param {string} task.description - The description of the task.
 * @param {string} task.status - The status of the task ("todo", "doing", "done").
 * @returns {HTMLElement} The DOM element representing the task card.
 */
function createTaskCard(task) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.textContent = task.title;
  card.dataset.id = task.id; // store task id for later interactions
  return card;
}

/**
 * Render all tasks into their correct columns.
 * Clears existing tasks, then repopulates from the data.
 * @param {Array<Object>} tasks - The list of task objects to display.
 */
function renderTasks(tasks) {
  // Clear all containers first
  ["todo", "doing", "done"].forEach((status) => {
    const container = getTaskContainer(status);
    if (container) container.innerHTML = "";
  });

  // Add each task into the correct column
  tasks.forEach((task) => {
    const container = getTaskContainer(task.status);
    if (container) {
      const card = createTaskCard(task);
      container.appendChild(card);
    }
  });

  // Update column counts
  updateColumnCounts(tasks);
}

/**
 * Update the column headings with the number of tasks in each column.
 * @param {Array<Object>} tasks - The list of task objects.
 */
function updateColumnCounts(tasks) {
  const statuses = ["todo", "doing", "done"];
  statuses.forEach((status) => {
    const count = tasks.filter((task) => task.status === status).length;
    const heading = document.querySelector(`.${status}-heading`);
    if (heading) {
      heading.textContent = `${status.toUpperCase()} (${count})`;
    }
  });
}

// ====== INITIAL RENDER ======
document.addEventListener("DOMContentLoaded", () => {
  renderTasks(initialTasks);
});
