import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import AddTeamMember from "./AddTeamMember";

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  
  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/teammembers/"); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      debugger;
      setTeamMembers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch team members data from API
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  if (loading) {
    return <p style={styles.message}>Loading team members...</p>;
  }

  if (error) {
    return <p style={styles.message}>Error: {error}</p>;
  }

  return (
    <div style={styles.container}>
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <AddTeamMember setModalOpen={setModalOpen} fetchTeamMembers={fetchTeamMembers}/>
        </Modal>
      )}
      <h2 style={styles.header}>Meet Our Team</h2>
      <button
            onClick={() => setModalOpen(true)}
            className="bg-pink-500 text-white px-6 mr-3 py-3 rounded shadow hover:bg-purple-600 mb-5"
          >
            Add Team Member
      </button>
      <div style={styles.grid}>
        {teamMembers.map((member) => (
          <div key={member.id} style={styles.card}>
            <img src={member.photo} alt={member.name} style={styles.photo} />
            <h3 style={styles.name}>{member.name}</h3>
            <p style={styles.role}>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Basic styles
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  photo: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
  },
  name: {
    fontSize: "18px",
    margin: "10px 0 5px",
  },
  role: {
    fontSize: "14px",
    color: "#555",
  },
  message: {
    textAlign: "center",
    fontSize: "18px",
    marginTop: "20px",
  },
};

export default TeamMembers;
