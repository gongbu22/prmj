import {
    Button,
    Divider,
    Form,
    Header,
    List,
    TextArea,
  } from "semantic-ui-react";
  
  export default function About() {
    return (
      <div>
        <Header as="h3" style={{ paddingTop: 40 }} color="teal">
          사용자정보
        </Header>
        <Divider />
        <List>
          <List.Item>
            <List.Icon name="users" />
            <List.Content>이름</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="mail" />
            <List.Content>
              이메일
            </List.Content>
          </List.Item>
        </List>
      </div>
    );
  }
