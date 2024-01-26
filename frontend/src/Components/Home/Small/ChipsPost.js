import React, { useState,useEffect } from 'react';
import { Chips } from 'primereact/chips';

const ChipsPost = (props) => {
    


    useEffect(() => {
 
    console.log(props.chips)
  
    }, []);
    

    const customChip = (item) => {
        return (
            <div>
                <span>{item} - (active) </span>
                <i className="pi pi-user-plus" style={{ fontSize: '14px' }}></i>
            </div>
        );
    }

    return (
        <div>
            <div className="card p-fluid">
                <h5>Basic</h5>
                <Chips value={props.chips} onChange={(e) => props.setChips(e.value)} />



            </div>
        </div>
    )
}
export default ChipsPost