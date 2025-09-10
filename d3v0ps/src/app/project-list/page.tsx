import ProjectCard from "./project-card";
import Link from "next/link";

// Fake project data for display purposes
const fakeProjects = [
    {
        title: "Decentralized Exchange Platform",
        description: "Building a high-performance DEX with low gas fees and cross-chain capabilities for DeFi enthusiasts",
        minContribution: "0.5",
        participantsCount: 12,
        creatorName: "0xEtherDev"
    },
    {
        title: "NFT Marketplace for Digital Art",
        description: "A curated platform for digital artists to mint, showcase, and sell their creations with customizable royalty splits",
        minContribution: "0.2",
        participantsCount: 8,
        creatorName: "CryptoArtist"
    },
    {
        title: "DAO Governance Framework",
        description: "A modular governance system for DAOs with proposal creation, voting mechanisms, and treasury management",
        minContribution: "0.75",
        participantsCount: 24,
        creatorName: "0xGovernance"
    },
    {
        title: "DeFi Lending Protocol",
        description: "A secure lending and borrowing platform with dynamic interest rates and multi-collateral support",
        minContribution: "1.0",
        participantsCount: 16,
        creatorName: "DeFiBuilder"
    },
    {
        title: "Smart Contract Auditing Service",
        description: "A community-driven security auditing service with bug bounties and automated vulnerability scanning",
        minContribution: "0.3",
        participantsCount: 7,
        creatorName: "SecurityDAO"
    }
];

export default function ProjectListPage() {
    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-8">Available Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fakeProjects.map((project, index) => (
                <Link
                key={index}
                href={`/project`}
                className="block"
                >
                <ProjectCard
                    title={project.title}
                    description={project.description}
                    minContribution={project.minContribution}
                    participantsCount={project.participantsCount}
                    creatorName={project.creatorName}
                />
                </Link>
            ))}
            </div>
        </div>
    );
}