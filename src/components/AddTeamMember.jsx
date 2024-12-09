import { useState } from "react";

const AddTeamMember = (props) => {
  const [teamMember, setTeamMember] = useState({ name: "", role: "", email: "" });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch("http://127.0.0.1:8000/teammember/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teamMember),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      props.setModalOpen(false);
    //   alert("Team member added successfully!");
      props.fetchTeamMembers();
      console.log("Response:", data);
    } catch (err) {
        debugger;
      console.error("Error:", err);
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamMember((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Add Team Member</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
      <label>
          ID:
          <input type="text" name="id" value={teamMember.id} onChange={handleChange} required /><br/>
        </label>
        <label>
          Name:
          <input type="text" name="name" value={teamMember.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Role:
          <input type="text" name="role" value={teamMember.role} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Photo:
          <input type="text" name="photo" value={teamMember.photo} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddTeamMember;
