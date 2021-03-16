import React, { useState, useEffect} from 'react';
import CookieService from '../../services/CookieService';
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import EmojiPeopleRoundedIcon from '@material-ui/icons/EmojiPeopleRounded';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';




const TodoList = (props) =>{
    const data ={
        title:'',
        status:'',
        owner:''
    }
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


    const [todoData, setTodoData] = useState(data);


    const { title, status, owner, } = todoData;


    const handleChange = (event) => {
        setTodoData({...todoData, [event.target.id]: event.target.value});
    }



    const onSubmit =() => {
        if(status === '' || title === '' || owner === ''){
            alert("fill in all fields");
            return;
        }

        for(let item of items){
            if( title === item.title){
                alert("this item name is already in use!");
                return;
            }

        }

        axios.post(
            `https://localhost:8000/api/tasks`,
            {
                title:title,
                description:title,
                status:status,
                userOwner:owner
            }
        ).then(res => {
            console.log(res);
            console.log(res.data);
        })

    }

    const addTodo = () =>{
        onSubmit();
        setTodoData({...todoData, ['Title']: ''});
        setTodoData({...todoData, ['Status']: ''});
        setTodoData({...todoData, ['Owner']: ''});
    }

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

    const getUserEmail = (id) =>{
        for(let user of users){
            if(id === "/api/users/"+user.id){
                return (user.email);
            }
        }
    }

    const deleteTodo = (id) => {

         axios.delete(`https://localhost:8000/api/tasks/${id}`)
            .then(res => {
                console.log(res.data);
            })

        window.location.reload(true);
    }


    const editTodo = (id) => {

        const new_status = prompt("enter a new value status");
        if(new_status === ''){
            alert("fill in all fields");
            return;
        }

        axios.patch(`https://localhost:8000/api/tasks/${id}`, {status:new_status })
            .then(res => {
                console.log(res.data);
            })

        window.location.reload(true);
    }

    const  renderTodos = () =>{

            return (
                <div>
                    {items.map((item) => (
                            <div className="list-group-item" key={item.id}>
                                name:<Button  variant="outlined" color="primary">{item.title}</Button>|
                                status:<Button  variant="outlined" color="secondary">{item.status}</Button>|
                                <EmojiPeopleRoundedIcon />:{getUserName(item.userOwner)}|
                                edit status:<EditRoundedIcon onClick={() =>editTodo(item.id)} />|
                                delete:<DeleteForeverIcon onClick={() =>deleteTodo(item.id)} />|
                            </div>
                        )
                    )}
                </div>
            )
        }



   const  signOut = (event) =>{
      CookieService.remove('name');
      CookieService.remove('nachname');
      CookieService.remove('email');
      CookieService.remove('role');
      CookieService.remove('activ');
      props.history.push('/');
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
        button: {
            margin: theme.spacing(1),
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        if (CookieService.get('name') == null)
            props.history.push('/backend/login');
        taskDidMount();
        userDidMount();
    },[]);

        return(
            <div>
                <div className={classes.root} >
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Button onClick={signOut} variant="contained" color="secondary" className={classes.button} startIcon={<DeleteIcon />} >sign out</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>Connected as {CookieService.get('name')} Role: {CookieService.get('role')}</Paper>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={6}>
                                  <Paper className={classes.paper}>Add a task</Paper>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Paper className={classes.paper}>
                            <form className="form-row align-items-center">
                                <input value={title}
                                     type="text"
                                     placeholder="add a item"
                                     onChange={handleChange}
                                     className="form-control mb-2"
                                     id="title"
                                 />

                                <select className="form-control mb-3" onChange={handleChange} id="status">
                                    <option value="">select a Status</option>
                                    <option value="Offen">Offen</option>
                                    <option value="in Bearbeitung" >Bearbeitung</option>
                                    <option value="Erledigt">Erledigt</option>
                                </select>
                                <select className="form-control mb-3" onChange={handleChange} id="owner">
                                    <option value="">select a task owner</option>
                                    {users.map((user) => {return (<option value={'/api/users/'+user.id} key={user.id}>{user.name}</option>);})}
                                </select>
                                <button
                                    onClick={() =>addTodo()}
                                    className="btn btn-primary"
                                >
                                    Add
                                </button>
                          </form>
                          </Paper>
                        </Grid>
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
