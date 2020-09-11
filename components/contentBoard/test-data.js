const INITIAL_DATA = {
  tasks: {
    'task-1': {id: 'task-1', content: 'hola que tal'},
    'task-2': {id: 'task-2', content: 'otra'},
    'task-3': {id: 'task-3', content: 'esta es otra tarea'},
    'task-4': {id: 'task-4', content: 'QUE PASO'}
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Made',
      taskIds: [],
    }
  },
  columnOrder: ['column-1', 'column-2'],
}
export default INITIAL_DATA