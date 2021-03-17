import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";



const TodoList = (props) =>{

   const itemsState={
       items : []
   }

    const usersState={
        users : []
    }

    const [ usersData, setUsers] = useState(usersState);
    const [ itemsData, setItems] = useState(itemsState);

    const { users } = usersData;
    const { items } = itemsData;

    const taskDidMount = () => {
        axios.get(`https://localhost:8000/api/tasks`)
            .then(res => {
                setItems({...itemsData, ['items']: res.data['hydra:member']});
            })
    }

    const userDidMount = () => {
        axios.get(`https://localhost:8000/api/users`)
            .then(res => {
                setUsers({...usersData, ['users']: res.data['hydra:member']});
            })
    }

    const getUserName = (id) =>{
        for(let user of users){
            if(id === "/api/users/"+user.id){
                return (user.name);
            }
        }
    }


    const renderTodos = () =>{
        return (
            <div>
                {items.map((item) => (
                    <Grid container spacing={1} className="list-group-item" key={item.id}>
                        <Grid item xs={4}>
                            <Button  variant="outlined" color="primary">{item.title}</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button  variant="outlined" color="secondary">{item.status}</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <EmojiPeopleRoundedIcon />:{getUserName(item.userOwner)}
                        </Grid>
                    </Grid>
                    )
                )}
            </div>
        )
    }



    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        userDidMount();
        taskDidMount();
    },[]);

        return(
            <div>

                <div className={classes.root} >
                    <Grid container spacing={3}>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                          >
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes.paper}>All Tasks</Paper>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={2} className="list-group-item" >
                                        <Grid item xs={4}>
                                            name
                                        </Grid>
                                        <Grid item xs={4}>
                                            status
                                        </Grid>
                                        <Grid item xs={4}>
                                            owner
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <Paper className={classes.paper}>{renderTodos()}</Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
           </div>
          )

}

export default TodoList;
