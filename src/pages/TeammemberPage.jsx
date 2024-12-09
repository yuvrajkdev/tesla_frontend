import React from "react";
import TeamMembers  from "../components/TeamMembers";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer'

const TeammembersPage = () => {
    return (
        <div>
            <NavBar />
            <TeamMembers />
            <Footer />
        </div>
    );
};

export default TeammembersPage;
