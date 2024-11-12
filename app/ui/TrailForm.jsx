export default function TrailForm({ onSubmit }) {
  return (
    <form className="trail-form" onSubmit={onSubmit}>
      <p>Copy and paste all the information from AllTrails:</p>
      <label htmlFor="trail_name">Trail Name: </label>
      <input type="text" name="trail_name" id="trail_name" />
      <br />
      <label htmlFor="area_name">Area Name: </label>
      <input type="text" name="area_name" id="area_name" />
      <br />
      <label htmlFor="difficulty_rating"> Difficulty Rating: </label>
      <select name="difficulty_rating" id="difficulty_rating">
        <option value="easy">easy</option>
        <option value="moderate">moderate</option>
        <option value="hard">hard</option>
      </select>
      <br />
      <label htmlFor="length"> Length: </label>
      <input type="number" step=".1" name="length" id="length" />
      <br />
      <label htmlFor="elevation_gain">Elevation Gain: </label>
      <input type="number" name="elevation_gain" id="elevation_gain" />
      <br />
      <label htmlFor="route_type"> Route Type: </label>
      <select name="route_type" id="route_type">
        <option value="loop">loop</option>
        <option value="out-and-back">out-and-back</option>
        <option value="point-to-point">point-to-point</option>
      </select>
      <br />
      <label htmlFor="trail_link"> AllTrails Link: </label>
      <input type="trail_link" name="trail_link" id="trail_link" />
      <br />
      <div className="form-button-section">
      <button type="submit" className="form-button">
        Submit Form
      </button>
      </div>
    </form>
  );
}