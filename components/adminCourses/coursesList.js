import { Droppable } from 'react-beautiful-dnd'
import CourseItem from './courseItem'

const CoursesList = ({ids, courses, disabled}) => {

  return(
    <Droppable droppableId='courses'>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {ids.map((id, index) => (
            <CourseItem
              disabled={disabled}
              course={courses[id]}
              index={index}
              key={id}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
export default CoursesList