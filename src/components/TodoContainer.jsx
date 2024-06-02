import { assignmentsRef } from "../utils/firebaseConfig";
import { update, child } from "firebase/database";

function TodoContainer({assignmentPostIt}) {

    let tempAssignedText = '';
    const stateToProgress = 'In progress';

    function handleAssignedText(event){
        tempAssignedText = (event.target.value);
        console.log(tempAssignedText);
    }
    

    function handleToInProgress(event){
        event.preventDefault();
        // firebase-referencen till assingments plus firebaseID:t
        const currentAssignmentRef = child(assignmentsRef, assignmentPostIt.id);

        try {
            if (!tempAssignedText == "") {  
                update (currentAssignmentRef, {
                    assigned: tempAssignedText,
                    status: stateToProgress
                })
            } else {
                throw new Error("No person assigned");
            }
        } catch (error) {
            alert("Please assign to a person");
        }       
    }

    return ( 
        <div className="todoCont">
        <form>
        <h4>{assignmentPostIt.assignment}</h4>
            <input type="text" placeholder="Assign to a person" onChange={handleAssignedText}></input>
            <button onClick={handleToInProgress}>In progress</button>
        </form>
        </div>
     );
}

export default TodoContainer;

