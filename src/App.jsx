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
            validation: {
                fio: true,
                email: true,
                phone: true
            },
        }
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    submit(e) {
        e.preventDefault();
        this.validate();
    }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});

    }
    validate() {
        let {fio, email, phone, validation} = this.state;
        let isValid = {
            fio: true,
            email: true,
            phone: true,
        }
        //validate fio
        !fio.match(/^([A-zА-яЁё]+\s[A-zА-яЁё]+){2}$/) ? isValid.fio=false : isValid.fio=true;
        //validate email
        !email.match(/^[a-zA-Z0-9.-]+@(yandex.(ru|com|ua|kz|by)|ya.ru)$/) ? isValid.email=false : isValid.email=true;
        //validate phone
        let str = phone.match(/\d+/g, '')+'',
            s = str.split(',').join(''),
            phoneNumberSum = 0;
        for ( let item of s ) {
            phoneNumberSum += Number(item);
        }
        isNaN(phoneNumberSum) || phone.includes('_') || phoneNumberSum > 30 ? isValid.phone=false : isValid.phone = true;
        this.setState({validation: isValid})
        console.log(validation);
        // if ( valid.fio && valid.email && valid.phone ) {
        //     this.setState({status: 'success'});
        // } else this.setState({status: 'error'})
    }
    fioKeyUp(e) {
        e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Za-яА-Я\s@]+/, '');
    }

    render() {
        const { name, email, phone, validation } = this.state;
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
            <form className="col-sm-3 panel" action="URL.com/asdad/asdasd" onSubmit={this.submit}>
                {resultContainer}
                <div className="form-group">
                    <label for="formGroupExampleInput">ФИО</label>
                    <input
                        type="text"
                        name="fio"
                        className={"form-control "+(!validation.fio?'error':'')}
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
                        className={"form-control "+(!validation.email?'error':'')}
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
                        className={"form-control "+(!validation.phone?'error':'')}
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
