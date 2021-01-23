import React from 'react'
import './Table.css'
import numeral from 'numeral'
import {useGlobalContext} from './context/context'
function Table() {
    const {countries} = useGlobalContext();
    let tempCountries = [...countries];
    tempCountries = tempCountries.sort((a,b) =>b.cases - a.cases);

    return (
        <div className = 'table'>
            {tempCountries.map(country => {
                return(
                    <tr>
                        <td>{country.country}</td>
                        <td>
                            <strong>{numeral(country.cases).format("0,0")}</strong>
                        </td>
                    </tr>
                )
            })}
        </div>
    )
}

export default Table
