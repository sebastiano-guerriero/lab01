// Vanilla JavaScript entry file for your tutorial.
// You and your audience will write code here during the video.

document.addEventListener("DOMContentLoaded", () => {
  const mainCheckbox = document.querySelector('[data-name="main-checkbox"]');
  const emailActions = document.querySelector('[data-name="email-actions"]');
  const itemCheckboxes = document.querySelectorAll('[data-name="item-checkbox"]');

  function updateEmailActionsVisibility() {
    if (!emailActions) return;
    const show =
      Boolean(mainCheckbox?.checked) ||
      [...itemCheckboxes].some((input) => input.checked);
    emailActions.classList.toggle("hidden", !show);
    emailActions.classList.toggle("flex", show);
  }

  function syncMainFromItems() {
    if (!mainCheckbox) return;
    const items = [...itemCheckboxes];
    const total = items.length;
    const checkedCount = items.filter((input) => input.checked).length;
    mainCheckbox.indeterminate = checkedCount > 0 && checkedCount < total;
    mainCheckbox.checked = checkedCount > 0 && checkedCount === total;
  }

  function onMainChange() {
    if (!mainCheckbox) return;
    const anyItemChecked = [...itemCheckboxes].some((input) => input.checked);
    if (anyItemChecked) {
      itemCheckboxes.forEach((input) => {
        input.checked = false;
      });
    } else {
      itemCheckboxes.forEach((input) => {
        input.checked = true;
      });
    }
    syncMainFromItems();
    updateEmailActionsVisibility();
  }

  function onItemChange() {
    syncMainFromItems();
    updateEmailActionsVisibility();
  }

  mainCheckbox?.addEventListener("change", onMainChange);
  itemCheckboxes.forEach((input) =>
    input.addEventListener("change", onItemChange),
  );
  syncMainFromItems();
  updateEmailActionsVisibility();
});


