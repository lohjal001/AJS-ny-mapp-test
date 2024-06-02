import { assignmentsRef } from "../utils/firebaseConfig";
import { update, child } from "firebase/database";


function InProgressContainer({assignmentPostIt}) {

const stateToDone = 'Done';




function handleToDone(event){
    event.preventDefault();
    // firebase-referencen till assingments plus firebaseID:t
    const currentAssignmentRef = child(assignmentsRef, assignmentPostIt.id);

    update (currentAssignmentRef, {
        status: stateToDone
    })
    .catch((error) => {
        console.error("Could not update assignment: ", error);
    });        
}


    return ( 
    <>
    <h4>{assignmentPostIt.assignment}</h4>
    <h4>{assignmentPostIt.assigned} </h4>
    <button onClick={handleToDone}>Done</button>
    </> );
}

export default InProgressContainer;