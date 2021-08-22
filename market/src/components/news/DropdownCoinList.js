import React from 'react';
import Select from 'react-select'

const DropdownCoinList = ({ setCoin, filteredCoins, coin, firstUpdate}) => {

  const customStyles = {
    dropdownIndicator: base => ({
      ...base,
      color: 'black'
    }),
    control: base => ({
      ...base,
      borderColor: 'black',
      // This line disable the blue borde
    })
  };

  const handleChange = (e) => {
    setCoin(e.value);
    console.log('./Dropdown: coin is', e.value )
  }

  const options = filteredCoins.map((coin) => {
    return {
        value: coin.id,
        label: coin.name
    }
  });



    return (
      <Select
        options={options}
        onChange={e => handleChange(e)} isSearchable
        styles={customStyles}
        theme={theme => ({
        ...theme,
        borderRadius: 0,

        colors: {
          ...theme.colors,
          primary25: 'rgb(120, 202, 200)',
          primary: 'black',
          borderRadius: 'black'
        },
      })

      }>
      </Select>
    )
}

export default DropdownCoinList
