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
            errorFields: [],
            status: '',
        }
        window.MyForm = this;
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    validate() {
        let {fio, email, phone} = this.state;
        let isValid = false,
            errorFields = [];
        if ( !fio.match(/^([A-zА-яЁё]+\s[A-zА-яЁё]+){2}$/) ) errorFields.push('fio');
        if ( !email.match(/^[a-zA-Z0-9.-]+@(yandex.(ru|com|ua|kz|by)|ya.ru)$/) ) errorFields.push('email');
        let str = phone.match(/\d+/g, '')+'',
            s = str.split(',').join(''),
            phoneNumberSum = 0;
        for ( let item of s ) {
            phoneNumberSum += Number(item);
        }
        if ( isNaN(phoneNumberSum) || phone.includes('_') || phoneNumberSum > 30 ) errorFields.push('phone');
        if ( errorFields.length === 0 ) isValid = true;
        return {
            isValid,
            errorFields
        }
    }
    getData() {
        let obj = {}
    }
    setData(obj) {

    }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    submit(e) {
        e.preventDefault();
        let validate = this.validate();
        this.setState({errorFields: validate.errorFields})
        if ( validate.isValid ) {
            document.getElementById('submitButton').setAttribute('disabled', 'disabled');
            fetch(e.currentTarget.action)
                .then( response => {
                    return response.json();
                })
                .then( json => {
                    console.log(json);
                    this.setState({status: json.status})
                });
        }
    }
    fioKeyUp(e) {
        e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Za-яА-Я\s@]+/, '');
    }

    render() {
        let { errorFields } = this.state;
        const resultContainer = (
            this.state.status === 'success' ?
                <div className="alert alert-success">
                    <strong>Success</strong>
                </div> : this.state.status === 'error' ?
                    <div className="alert alert-danger">
                        <strong>Error</strong>
                    </div> : this.state.status === 'progress' ?
                        <div className="alert alert-warning">
                            <strong>In progress..</strong>
                        </div> : ''
        )
        return (
            <form className="col-sm-3 panel" action="error.json" onSubmit={this.submit}>
                <div id="resultContainer">
                    {resultContainer}
                </div>
                <div className="form-group">
                    <label for="formGroupExampleInput">ФИО</label>
                    <input
                        type="text"
                        name="fio"
                        className={"form-control "+(errorFields.includes('fio')?'error':'')}
                        placeholder="Введите ФИО"
                        value={this.state.fio}
                        onChange={this.handleChange}
                        onKeyUp={this.fioKeyUp}/>
                </div>
                <div className="form-group">
                    <label for="formGroupExampleInput2">Email</label>
                    <input
                        type="text"
                        name="email"
                        className={"form-control "+(errorFields.includes('email')?'error':'')}
                        placeholder="Ввведите почту"
                        value={this.state.email}
                        onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label for="formGroupExampleInput2">Телефон</label>
                    <MaskedInput
                        mask="+7(111)111-11-11"
                        type="text"
                        name="phone"
                        className={"form-control "+(errorFields.includes('phone')?'error':'')}
                        placeholder="Введите номер"
                        value={this.state.phone}
                        onChange={this.handleChange}/>
                </div>
                <input type="submit" id="submitButton" value="Submit" className="btn btn-primary"/>
            </form>
        );
    }
}

export default App;
