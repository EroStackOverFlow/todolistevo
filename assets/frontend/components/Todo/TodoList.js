import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";



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
            console.log(user.name);
            if(id === "/api/users/"+user.id){
                return (user.name);
            }
        }
    }


    const renderTodos = () =>{
        return (
            <div>
                {items.map((item) => (
                        <div className="list-group-item" key={item.id}>
                            name:<Button  variant="outlined" color="primary">{item.title}</Button>|
                            status:<Button  variant="outlined" color="secondary">{item.status}</Button>|
                            <EmojiPeopleRoundedIcon />: {getUserName(item.userOwner)}|
                        </div>
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
                                <Paper className={classes.paper}>{renderTodos()}</Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
           </div>
          )

}

export default TodoList;
