import React from 'react'

const TempAtual = (props) => {

    return (
        <div className='componenteTempAtual'>
            {props.temperature} 
            {<span>°</span>}
        </div>
    )
}

export default TempAtual