'use strict';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			tasks: []
		}
	}


	addNewTask = (textForNewTask) => {
		const newTask = new Task( textForNewTask );

		this.setState(prevState => {
			return {
				tasks: prevState.tasks.concat( newTask )
			}
		})
	}


	render() {
		return (
			<div className="container">
				<div className="row">
					<BlockTasks on_addNewTask={this.addNewTask} />
					<BlockDoneTasks />
				</div>
			</div>
		);
	}
}

class Task {
	constructor(textOfTask){
		this.textOfTask = textOfTask;
		this.completedTask = false;
	}
}

class BlockTasks extends React.Component {
	constructor() {
		super();
	}


	render(){
		return (
			<div className="col-md-6">
				<div className="todolist not-done">
					<TitleOfSection text={'Todos'} />
					<InputTask on_addNewTask={this.props.on_addNewTask} />
					<ButtonMarkAllAsCompleted />
					<hr />
					<ToDoTasksList />
					<ToDoTaskCounter />
				</div>
			</div>
		);
	}
}


function BlockDoneTasks(props){
	return (
		<div className="col-md-6">
			<div className="todolist">
				<TitleOfSection text={'Already Done'} />
				<DoneTasksList />
			</div>
		</div>
	);
}

function TitleOfSection(props){
	return <h1>{props.text}</h1>;
}

class InputTask extends React.Component {
	constructor() {
		super();

		this.state = {
			inputNewTask: ''
		}
	}

	_handlerOnSubmit = (e) => {
		e.preventDefault();
		this.props.on_addNewTask(this.state.inputNewTask);
		this.setState({ inputNewTask: '' })
	}

	_handlerOnChange = (e) => {
		this.setState({ inputNewTask: e.target.value })
	}

	render (){
		return (
			<form onSubmit={this._handlerOnSubmit}>
				<input type="text" className="form-control add-todo" placeholder="Add todo" name="inputNewTask" id="inputNewTask" value={this.state.inputNewTask} onChange={this._handlerOnChange} />
			</form>
		);
	}
}


function ButtonMarkAllAsCompleted(props) {
	return (
		<button id="checkAll" className="btn btn-success">Mark all as done</button>
	);
}

class ToDoTasksList extends React.Component {
	constructor() {
		super();
	}

	render(){
		return (
			<ul id="sortable" className="list-unstyled">
				<li className="ui-state-default">
					<div className="checkbox">
						<label>
						<input type="checkbox" defaultValue />Take out the trash</label>
					</div>
				</li>
		  </ul>
		);
	}
}

function ToDoTaskCounter(props){
	return(
		<div className="todo-footer">
			<strong><span className="count-todos" /></strong> Items Left
		</div>
	);
}

function DoneTasksList(props){
	return(
		<ul id="done-items" class="list-unstyled">
			<li>Some item <button class="remove-item btn btn-default btn-xs pull-right"><span class="glyphicon glyphicon-remove"></span></button></li>
		</ul>
	);
}


/* Renderizamos el componente global */
ReactDOM.render(<App />,
	document.getElementById('root'))
