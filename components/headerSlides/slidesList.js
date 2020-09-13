import { Droppable } from 'react-beautiful-dnd'
import SlideItem from './slideItem'

const SlidesList = ({ids, slides, onDelete}) => {

  return(
    <Droppable droppableId='slides'>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {ids.map((id, index) => (
            <SlideItem
              slide={slides[id]}
              index={index}
              key={id}
              onDelete={() => onDelete(id)}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
export default SlidesList