import { useModal } from "@/app/context/ModalContext";

export default function HikeForm({ onSubmit = () => {} }) {
  const { showModal } = useModal();
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newHike = Object.fromEntries(formData.entries());
    if (Object.values(newHike).some((value) => !value)) {
      showModal("Error", "Please fill out all the information");
    } else {
      onSubmit(newHike);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="hikeTitle">Title: </label>
      <input type="text" name="hikeTitle" id="hikeTitle" />
      <br />
      <label htmlFor="date">Date: </label>
      <input type="date" name="date" id="date" min={today} />
      <label htmlFor="time"> Time: </label>
      <input type="time" name="time" id="time" />
      <br />
      <label htmlFor="location"> Location: </label>
      <input type="text" name="location" id="location" />
      <br />
      <label htmlFor="comments">Comments: </label>
      <br />
      <textarea
        type="textarea"
        name="comments"
        id="comments"
        data-gramm="false"
      />
      <br />
      <button type="submit" className="form-button">
        Submit Form
      </button>
    </form>
  );
}
