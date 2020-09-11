import { useState } from 'react'
import { Typography, Input, Button } from 'antd'
import { CheckOutlined, EditOutlined } from '@ant-design/icons'

const { Title } = Typography

const TitleEditable = ({title: initialTitle, onAccept}) => {

  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(initialTitle)

  const saveClicked = () => {
    if(title != '' && title != initialTitle) {
      onAccept(title)
    } else {
      setTitle(initialTitle)
      setEditing(false)
    }
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      saveClicked()
    }
  }

  return (
    <div className="container">
      {editing ? (
        <div className="bar"
          style={{
            position: 'absolute',
            width: '70%',
            top: 4,
            left: 6
          }}
        >
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              marginRight: 10,
              fontSize: '1.33rem',
              borderRadius: 3,
              padding: '0 8px',
            }}
            autoFocus
            onKeyDown={handleKeyDown}
          />
          <Button
            className="button"
            type="primary"
            shape="circle"
            icon={<CheckOutlined />}
            onClick={saveClicked}
          />
        </div>
      ) : (
        <div className="bar">
          <Title
            level={3}
            style={{margin: 0,fontWeight: 400}}
          >
            {title}
          </Title>
          <Button
            className="button"
            type="text"
            icon={<EditOutlined />}
            onClick={() => setEditing(true)}
          />
        </div>
      )}
      <style jsx>{`
        .bar {
          display: flex;
          align-items: center;
        }

        .container {
          height: 32px;
        }
      `}</style>
    </div>
  )
}
export default TitleEditable