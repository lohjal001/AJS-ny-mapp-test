import { assignmentsRef } from "../utils/firebaseConfig";
import { child, remove } from "firebase/database";


function DoneContainer({assignmentPostIt}) {


function handleRemove(event){
    event.preventDefault();
    // firebase-referencen till assingments plus firebaseID:t
    const currentAssignmentRef = child(assignmentsRef, assignmentPostIt.id);

    remove(currentAssignmentRef);
     
    //  .catch((error) => {
    //     console.error("Could not update assignment: ", error);
    // });        
}


    return ( 
    <div>
    <div>
    <h4>{assignmentPostIt.assignment}</h4>
    <h4>{assignmentPostIt.assigned} </h4>
    <button onClick={handleRemove}>Remove</button>
    </div>
    </div> );
}

export default DoneContainer;