import { useState } from 'react'
import { Button, Input } from 'antd'

const NewSectionPrompt = ({onAccept, onCancel}) => {

  const [value, setValue] = useState('')

  const onKeyDown = (e) => {
    if(e.key === 'Enter' && value != '') {
      onAccept(value)
    }
  }

  const accept = () => {
    value != '' && onAccept(value)
  }

  const buttons = (
    <div className="buttons">
      <Button type="text" onClick={onCancel} style={{marginRight: 10}}>Cancelar</Button>
      <Button type="primary" onClick={accept}>Agregar</Button>

      <style jsx>{`
        .buttons {
          text-align: right;
          margin-top: 10px;
        }
      `}</style>
    </div>
  )

  return (
    <>
      <Input 
        autoFocus
        placeholder="Ingresa el nombre de la seccón"
        onKeyDown={onKeyDown}
        onChange={e => setValue(e.target.value)}
      />
      {buttons}
    </>
  )
}
export default NewSectionPrompt