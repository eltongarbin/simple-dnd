import React, { Component } from 'react';

class AppDragDropDemo extends Component {
  state = {
    tasks: [
      {
        name: 'Learn Angular',
        category: 'wip',
        bgcolor: 'yellow'
      },

      {
        name: 'React',
        category: 'wip',
        bgcolor: 'pink'
      },

      {
        name: 'Vue',
        category: 'complete',
        bgcolor: 'skyblue'
      }
    ]
  };

  onDragOver(e) {
    e.preventDefault();
  }

  onDragStart(e, id) {
    // "text/plain" because IE, otherwise would be "id"
    e.dataTransfer.setData('text/plain', id);
  }

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData('text');
    let tasks = this.state.tasks.filter((task) => {
      if (task.name === id) {
        task.category = cat;
      }
      return task;
    });

    this.setState((prevState) => ({
      ...prevState,
      tasks
    }));
  };

  render() {
    const tasks = {
      wip: [],
      complete: []
    };

    this.state.tasks.forEach((t) => {
      tasks[t.category].push(
        <div
          key={t.name}
          onDragStart={(e) => this.onDragStart(e, t.name)}
          draggable
          className="draggable"
          style={{ backgroundColor: t.bgcolor }}
        >
          {t.name}
        </div>
      );
    });

    return (
      <div>
        <h2>DRAG & DROP DEMO</h2>
        <div className="container-drag">
          <div
            className="board"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => {
              this.onDrop(e, 'wip');
            }}
          >
            <span className="task-header">WIP</span>
            {tasks.wip}
          </div>
          <div
            className="board"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e, 'complete')}
          >
            <span className="task-header">COMPLETED</span>
            {tasks.complete}
          </div>
        </div>
      </div>
    );
  }
}

export default AppDragDropDemo;
