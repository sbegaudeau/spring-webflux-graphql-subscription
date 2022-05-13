import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import EventIcon from "@mui/icons-material/Event";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const createEventMutation = gql`
  mutation createdEvent($name: String!) {
    createEvent(name: $name) {
      name
      createdOn
    }
  }
`;

export const App = () => {
  const [state, setState] = useState({
    value: "",
    events: [],
  });

  const [createEvent, { loading: mutationLoading, data: mutationData }] = useMutation(createEventMutation);
  useEffect(() => {
    if (!mutationLoading && mutationData) {
      const { createEvent } = mutationData;
      setState(prevState => ({ ...prevState, events: [...prevState.events, createEvent]}))
    }
  }, [mutationLoading, mutationData]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setState((prevState) => ({ ...prevState, value }));
  };

  const handleClick = () => {
    const name = state.value;
    createEvent({ variables: { name } });
  };

  const handleKeyDown = (event) => {
    if ("Enter" === event.key) {
      event.preventDefault();
      const name = state.value;
      createEvent({ variables: { name } });

      setState((prevState) => ({ ...prevState, value: "" }));
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography>GraphQL Mutation and Subscription</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box sx={{ marginTop: "64px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              columnGap: "16px",
              paddingBottom: "16px",
            }}
          >
            <TextField
              value={state.value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              size="small"
              fullWidth
            />
            <Button
              onClick={handleClick}
              disabled={state.value.length === 0 || mutationLoading}
              size="small"
              variant="contained"
            >
              Create
            </Button>
          </Box>
          <Paper>
            <List>
              {state.events.map((event, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Box></Box>"{event.name}" created at {event.createdOn}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};
