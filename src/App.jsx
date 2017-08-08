import React from 'react';
import MaskedInput from 'react-maskedinput';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fio: '',
            email: '',
            phone: '',
            status: '',
        }
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    submit(e) {
        e.preventDefault();
        if( this.state.fio === '') {

        }
        console.log(this.state.fio);
        console.log(this.state.email);
        console.log(this.state.phone);
    }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    render() {
        const { name, email, phone } = this.state;
        const resultContainer = (
            <div>
                <div className="resultContainer alert alert-success">
                    <strong>Success!</strong>
                </div>
                <div className="resultContainer alert alert-danger">
                    <strong>Error!</strong>
                </div>
                <div className="resultContainer alert alert-warning">
                    <strong>Warning!</strong>
                </div>
            </div>
        )
        return (
            <form className="col-sm-3 panel" onSubmit={this.submit}>
                {resultContainer}
                <div className="form-group">
                    <label for="formGroupExampleInput">ФИО</label>
                    <input type="text" name="fio" className="form-control" id="formGroupExampleInput" value={this.state.fio} onChange={this.handleChange} placeholder="Введите ФИО"/>
                </div>
                <div className="form-group">
                    <label for="formGroupExampleInput2">Email</label>
                    <input type="text" name="email" className="form-control" id="formGroupExampleInput2" value={this.state.email} onChange={this.handleChange} placeholder="Ввведите почту"/>
                </div>
                <div className="form-group has-error">
                    <label for="formGroupExampleInput2">Телефон</label>
                    <MaskedInput mask="+7(111)111-11-11" type="text" name="phone" className="form-control" id="formGroupExampleInput2" value={this.state.phone} onChange={this.handleChange} placeholder="Введите номер"/>
                </div>
                <input type="submit" id="submitButton" value="Submit" className="btn btn-primary"/>
            </form>
        );
    }
}

export default App;
