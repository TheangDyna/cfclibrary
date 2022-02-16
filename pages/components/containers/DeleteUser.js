import React, { useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { CLDEU } from '../../../state/mapState';
import { firestore } from '../../../services/firebase';
import {
    makeStyles,
    Grid,
    Typography,
    IconButton,
    Divider,
    Card,
    Button,
    Avatar,
    CircularProgress,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { USER } from '../../../state/mapState';


const useStyles = makeStyles((theme) => {
    return {
        addBook__form: {
            width: '100%',
        },
        addBook__button: {
            display: 'block',
            margin: '0 auto'
        },
        addBook__card: {
            padding: 20
        },
        body: {
            marginTop: theme.spacing(2)
        },
        divider: {
            marginTop: 10
        },
        closeDialogButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
        },
        cover: {
            width: 125,
            height: 125
        },
        err: {
            textAlign: 'center',
            color: 'red',
        },
        head: {
            padding: '13px 0px'
        }

    }
});

const DeleteUser = () => {
    const classes = useStyles();
    const setClDeU = useSetRecoilState(CLDEU);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [btn, setBtn] = useState(false);

    const user = useRecoilValue(USER);
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setBtn(true);
        firestore.collection('users')
            .doc(user.id)
            .delete()
            .then(() => {
                setClDeU(false);
            }).catch((err) => {
                setError(err.message);
                setLoading(false);
                setBtn(false);
            })
    };
    return (
        <div>
            <div className={classes.addBook__form}>
                <Card className={classes.addBook__card}>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.head}>
                            <IconButton className={classes.closeDialogButton} onClick={() => (setClDeU(false))}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <div className={classes.body}>
                            <Grid container spacing={2}>
                                <Grid item sm={12} md={12} lg={4}>
                                    <Avatar
                                        variant='rounded'
                                        src={user.profileURL}
                                        className={classes.cover}
                                    />
                                </Grid>
                                <Grid item sm={12} md={12} lg={8} style={{ textAlign: 'left', paddingLeft: 25, paddingRight: 10 }}>
                                    <Typography variant='h6'>
                                        Are you sure you want to delete{<br />}" {user.email}"?
                                    </Typography>
                                    <Typography style={{ color: 'red' }}>
                                        This User will be deleted immediately.{<br />}You can not undo this action.
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} md={12} lg={12}>
                                    <Typography
                                        className={classes.err}
                                        variant='body2'
                                    >
                                        {error}
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} md={12} lg={6}>
                                    <Button
                                        variant='outlined'
                                        fullWidth
                                        type='submit'
                                        style={{ color: 'red', border: '1px solid red' }}
                                        disabled={btn}
                                    >
                                        {loading ? <CircularProgress size={24} /> : 'Delete'}
                                    </Button>
                                </Grid>
                                <Grid item sm={12} md={12} lg={6}>
                                    <Button
                                        variant='contained'
                                        fullWidth
                                        style={{ color: 'white', background: '#0066ff' }}
                                        onClick={() => (setClDeU(false))}
                                    >
                                        Cancle
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default DeleteUser;