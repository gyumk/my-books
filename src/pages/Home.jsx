import React from 'react';
import withAuth from '../hocs/withAuth';
import axios from 'axios';
import { Col, Divider, Row } from 'antd';
import styles from './Home.module.css';
import { PushpinFilled } from '@ant-design/icons';

class Home extends React.Component {
  state = {
    books: [],
    loading: false,
    error: null,
  };
  render() {
    return (
      <Row className={styles.wrap_book_list} justify="center">
        {/* {this.state.loading && <h3>로딩중..</h3>} */}
        {/* {this.state.error && <h3>에러발생</h3>} */}
        <Col className={styles.book_list}>
          <Divider>
            <h1 className={styles.list_title}>Book List</h1>
          </Divider>
          <Col>
            <Row className={styles.books_header}>
              <Col span={11} className={styles.books_title}>
                <h3>Title</h3>
              </Col>
              <Col span={6} className={styles.books_author}>
                <h3>Author</h3>
              </Col>
            </Row>
            {this.state.error === null &&
              this.state.books.map((book) => (
                <p className={styles.book}>
                  <Row>
                    <PushpinFilled className={styles.book_icon} />
                    <Col span={11} className={styles.book_title}>
                      {book.title}
                    </Col>
                    <Col span={6} className={styles.book_author}>
                      {book.author}
                    </Col>
                  </Row>
                </p>
              ))}
          </Col>
        </Col>
      </Row>
    );
  }
  async componentDidMount() {
    // 로딩시작
    this.setState({ loading: true, error: null });
    try {
      await sleep(1000);
      const response = await axios.get('https://api.marktube.tv/v1/book', {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      });

      const books = response.data;
      console.log(books);
      this.setState({ books, loading: false, error: null });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false, error });
    }
  }
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export default withAuth(Home, true);
