import CreationCard from "@/components/creation-card";



export default function ProjectCreation() {
    return (
        <>
            <CreationCard isProject/>
            <CreationCard isProject={false}/>
        </>
    );
}