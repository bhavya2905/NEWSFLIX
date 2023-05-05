import { Layout } from 'antd'
import styled from 'styled-components';
import React, { useEffect, useState } from 'react'
import Siderf from './Siderf'
import { Table } from 'antd';
import axios from 'axios';
import { Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../actions/posts';

const { Content } = Layout;
export const Users = ({news}) => {
  const dispatch = useDispatch();
 
    const handleDelete=(e)=>{
      
      dispatch(deleteComment(e.target.id.split(':')[1], e.target.id.split(':')[0]));
      alert('Comment Deleted Successfully');
      window.location.reload();
      

    }

    const user=[];
    const colorCat={
      sports:'success',
      health:'warning',
      weather:'primary',
      politics:'danger'
    }
    
    news.map((e)=>{
      e.comments.map((c,i)=>{
        user.push({
          category: <Badge bg={colorCat[e.caption]}>
          {e.caption}
        </Badge>,
          name: <Link to={`/articles/${e._id}`} key={e._id}>{e.title} </Link>,
          email:c.split(':')[0],
          comment:c.split(':')[1],
          del: <Button variant="danger" id={`${e._id}:${i}`} onClick={handleDelete}>delete</Button>
        })
      })
    })
    
    
    const columns = [
        {
          title: "Article-Category",
          dataIndex: "category",
          key: "category",
        },
        {
          title: "Article-Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Comment",
          dataIndex: "comment",
          key: "comment",
        },
        {
          title: "Delete",
          dataIndex: "del",
          key: "del",
        },
        
      ];
      
      
  return (
    <Layout>
      <Siderf keys={3}/>
      <Content>
        <Container>
            <Table dataSource={user} columns={columns} pagination={{pageSize:5}} className='mytable' />
        </Container>
      </Content>
      
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  
  background-color: #000;
  .mytable{ 
    background:#001529;
  }
  .mytable ul{
    color:#2bbbe2;
  }
`;

