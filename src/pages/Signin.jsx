import React from 'react';
import axios from 'axios';
import { message, Col, Row } from 'antd';
import withAuth from '../hocs/withAuth';
import styles from './Signin.module.css';

class Signin extends React.Component {
  state = {
    email: '',
  };
  passwordRef = React.createRef(null);
  render() {
    return (
      <Row justify="center">
        <Col>
          <h1>Sign in</h1>
          {/* <div className={styles.img}></div> */}
        </Col>
        <Col>
          <p>
            <input
              type="text"
              value={this.state.email}
              onChange={this.change}
            />
          </p>
          <p>
            <input type="password" ref={this.passwordRef} />
          </p>
          <p>
            <button onClick={this.click}>로그인 버튼</button>
          </p>
        </Col>
      </Row>
    );
  }
  click = async () => {
    // console.log(this.state.email, this.passwordRef.current.value);
    const email = this.state.email;
    const password = this.passwordRef.current.value;
    if (email === '' || password === '') return;
    try {
      const response = await axios.post('https://api.marktube.tv/v1/me', {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      this.props.history.push('/');
    } catch (error) {
      const errorCode = error?.response?.data?.error || 'NOT_MATCH';
      if (errorCode === 'USER_NOT_EXIST') {
        message.error('유저네임이 일치하지않습니다.');
      } else if (errorCode === 'PASSWORD_NOT_MATCH') {
        message.error('패스워드가 일치하지 않습니다.');
      } else {
        message.error('그밖의 에러');
      }
    }
  };
  change = (e) => this.setState({ email: e.target.value });
}

export default withAuth(Signin, false);
