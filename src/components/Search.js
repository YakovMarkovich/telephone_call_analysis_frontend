import React, {useState} from 'react';
import {searchCallers} from "../actions/CallerActions";
import {connect} from "react-redux";


const Search = (props) => {
    const [searchValue, setSearchValue] = useState('');

    function handleChange (e) {
        setSearchValue(e.target.value);
    };

    function handleClick  (e)  {
        if(!searchValue){
            return;
        }
        props.searchCallers(searchValue);
        setSearchValue('');
    };

    return (
        <div className='d-flex justify-content-center mb-2 mt-1'>
            <input
                value={searchValue}
                onChange={handleChange}
                placeholder=' search'
                type='text'
                required/>
            <button style= {{backgroundColor: "grey", color: "white", width:100}} onClick={handleClick}>Find</button>
            {props.error!="not correct date format"? <h1>{props.error}</h1>:null}
        </div>
    );
};


function mapStateToProps(state) {
    return {
        error: state.error.message
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchCallers: (searchString) => dispatch(searchCallers(searchString))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Search);