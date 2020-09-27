import { useState } from 'react'
import { ChromePicker } from 'react-color';

const styles = {
  toggler: {
    borderRadius: 4,
    width: 40,
    height: 40,
    cursor: 'pointer',
    border: '1px solid #CCC'
  },
  popover: {
    position: 'absolute',
    zIndex: '2',
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }
}

const ColorPicker = ({color, onChange}) => {

  const [pickerVisible, setPickerVisible] = useState(false)

  const onColorChange = object => {
    onChange(object.hex)
  }

  return (
    <>
      <div
        style={{
          ...styles.toggler,
          backgroundColor: color
        }}
        onClick={() => setPickerVisible(true)}
      />

      {pickerVisible && (
        <div style={styles.popover}>
          <div
            style={styles.cover}
            onClick={() => setPickerVisible(false)}
          />
          <ChromePicker
            color={color}
            onChange={onColorChange}
          />
        </div>
      )}
    </>
  )
}
export default ColorPicker