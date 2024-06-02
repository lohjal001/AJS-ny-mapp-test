import { update, push } from 'firebase/database'
import { assignmentsRef } from '../utils/firebaseConfig';

function AssignmentForm() {
     
    let tempCategory = 'frontend'
    let tempAssignmentText = '';

    const newAssignment = {};

    //TEXT  -- setting decription for assignment 
    function handleAssignmentText(event){
        tempAssignmentText = (event.target.value);
    }

    //CATEGORY -- setting category for assignment
    function handleCategoryChange(event){
        tempCategory = (event.target.value)
        console.log(tempCategory);
    }

    // submitting assignment and pushing to firebase db
    function handleSubmitAssignment(event) {
        event.preventDefault();
        event.target.reset;


        // generate uniqe firebaseID
        const newID = push(assignmentsRef).key;

        newAssignment[newID] = {
            assigned: 'none',
            assignment: tempAssignmentText ,
            category: tempCategory ,
            status: 'To do'
        };

        try {
            if (!tempAssignmentText == "") {  
                update(assignmentsRef, newAssignment);
            } else {
                throw new Error("Task field is empty");
            }
        } catch (error) {
            alert("Please fill in the task field");
        }
        
    }
    

    return (
        <form>
            <input type="text" onChange={handleAssignmentText} placeholder="Write task" />
            <select id='selectCategory' onChange={handleCategoryChange}>
                <option value='frontend'>Frontend</option>
                <option value='backend' >Backend</option>
                <option value='ux'>UX</option>
            </select>
            <button onClick={handleSubmitAssignment}>Submit</button>
        </form>);

}

export default AssignmentForm;