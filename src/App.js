import React, {useState} from 'react';
import './App.css'
import CallersList from "./components/CallersList";
import Calls from "./components/Calls";
import AddEditForm from "./components/AddEditForm";



const App = () => {
    const [displayFormAddEdit, setDisplayFormAddEdit] = useState(false);
    const [dataForForm, setDataForForm] = useState( {
        id: '',
        callerId: '',
        contactedId: '',
        newDate: '',
        newDuration: '',
        actionType: ''
    });


    return (<div>
        {
            (displayFormAddEdit) ? renderForm() : renderGeneral()
        }
    </div>);

    function changePage(event){
        console.log("Im change page");
        console.log(displayFormAddEdit);
        if(!displayFormAddEdit) {
            let actionType =  event.target.innerText;
            let target = event.target;
            while (target && target.nodeName != 'TR') {
                target = target.parentElement;
            }
            let callerId = target.childNodes[1].innerText;
            let contactedId = target.childNodes[2].innerText;
            let newDate =  target.childNodes[2].innerText;
            let newDuration = target.childNodes[4].innerText;
            let id = target.childNodes[0].innerText;
            let obj = {id, callerId, contactedId, newDate, newDuration, actionType};
            setDataForForm(obj);
            setDisplayFormAddEdit(true);
        }
        else {
            let obj = {id: '',
                callerId: '',
                contactedId: '',
                newDate: '',
                newDuration: '',
                actionType: ''}
            setDataForForm(obj);
            setDisplayFormAddEdit(false);
        }
    }


   function renderGeneral() {
       return (
           <div className="container-fluid d-flex justify-content-between">
               <CallersList />
               <Calls changePage={changePage}/>
           </div>
       );
   }

    function renderForm() {
        return (
            <div className="container-fluid d-flex justify-content-center">
                <AddEditForm changePage={changePage} dataForm={dataForForm} />
            </div>
        );
    }
}


export default App;

