import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Container, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Input, InputAdornment, InputLabel, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { isMobile, isAndroid, isFirefox, isIOS, isOpera, browserVersion } from "mobile-device-detect";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function RegisterDialog({ open, ipv4, onClose }: { open: boolean, ipv4: string, onClose: any }) {
    // const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [confirmPassword, setConfirmPassword] = React.useState<string>("")
    const [gender, setGender] = React.useState<string>("S")
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    function validateEmail(v: string) {
        let validate = /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/.test(
            v
        )

        if (v === "") {
            return false
        } else if (!validate) {
            return false
        } else {
            return true
        }
    }

    function validatePassword(v: string) {
        let validate = /^([a-zA-Z0-9@$!%*?&%#._-]{8,})$/.test(v)
        if (v === "") {
            return false
        } else if (!validate) {
            return false
        } else {
            return true
        }

    }

    function validateUsername(v: string) {
        let validate = /^[a-zA-Z0-9]*$/.test(v)
        if (v === "") {
            return false
        } else if (/^[0-9]*$/.test(v.split("")[0])) {
            return false
        } else if (v.length < 4) {
            return false
        } else if (!validate) {
            return false
        } else {
            return true
        }

    }

    function onDisabled(data: any) {

        if (validateUsername(data.username) === false || validateEmail(data.email) === false || validatePassword(data.password) === false || data.confirmPassword === "") {
            return true
        } else {
            if (data.password !== data.confirmPassword) {
                return true
            } else {
                return false
            }
        }

    }

    function onSubmit(data: any) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "userid": data.username,
            "user_pass": data.password,
            "sex": data.gender,
            "email": data.email
        });

        const requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        fetch(`https://${ipv4}:7373/api/register`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result) {
                    onClose()
                }
            })
            .catch((error) => console.error(error));

    }


    return (
        <React.Fragment>

            <Dialog
                fullScreen
                open={open}
                onClose={onClose}
                TransitionComponent={Transition}
            >
                <AppBar position="fixed" style={{
                    backgroundColor: "#24292e"
                }} >
                    <Toolbar variant="dense">

                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Register
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={onClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>

                    </Toolbar>
                </AppBar>
                <Container maxWidth="sm">
                    {isMobile &&(<div style={{height:"190px"}}></div>)}
                    <Box sx={{
                        height: '100vh', display: 'flex', justifyContent: 'center',
                        alignItems: 'center',
                    }} >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Paper style={{
                                width: '470px',
                                padding: '50px',
                            }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField id="userid" label="Username" variant="standard" style={{ width: "100%" }}
                                            value={username}
                                            onChange={(e) => {
                                                setUsername(e.target.value)

                                            }}

                                            error={!validateUsername(username)}
                                            helperText={!validateUsername(username) && "Username ไม่ถูกต้อง"}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField id="email" label="E-Mail" variant="standard" style={{ width: "100%" }}
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                                validateEmail(e.target.value)

                                            }}
                                            error={!validateEmail(email)}
                                            helperText={!validateEmail(email) && "Email ไม่ถูกต้อง"} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl sx={{
                                            width: '100%',
                                            margin: 0
                                        }} variant="standard">
                                            <InputLabel htmlFor="password">Password</InputLabel>
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                onChange={(e) => {
                                                    setPassword(e.target.value)

                                                }}
                                            />
                                            {!validatePassword(password) && (<FormHelperText id="helper-text" style={{ color: "red" }}>Password must have least 8 characters and mustn't have characters in thai language</FormHelperText>)}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl sx={{
                                            width: '100%',
                                            margin: 0
                                        }} variant="standard">
                                            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                                            <Input
                                                id="confirm-password"
                                                value={confirmPassword}
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                onChange={(e) => {
                                                    setConfirmPassword(e.target.value)

                                                }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle confirm-password visibility"
                                                            onClick={handleClickShowConfirmPassword}
                                                            onMouseDown={handleMouseDownConfirmPassword}
                                                        >
                                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl>
                                            <FormLabel id="row-radio-buttons-group-label">Gender</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                value={gender}
                                            >
                                                <FormControlLabel value="F" control={<Radio />} label="Female" onClick={() => {
                                                    setGender("F")
                                                }} />
                                                <FormControlLabel value="M" control={<Radio />} label="Male" onClick={() => {
                                                    setGender("M")
                                                }} />
                                                <FormControlLabel value="S" control={<Radio />} label="Other" onClick={() => {
                                                    setGender("S")
                                                }} />

                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {onDisabled({
                                            username: username,
                                            email: email,
                                            password: password,
                                            confirmPassword: confirmPassword
                                        }) ? (<>
                                            <Button variant="outlined" style={{
                                                width: '100%',
                                                fontSize: 'xxx-large',
                                            }} disabled={true}>สมัครเลย! </Button></>) : (<>
                                                <Button variant="outlined" style={{
                                                    width: '100%',
                                                    fontSize: 'xxx-large',
                                                }}
                                                    disabled={false}
                                                    onClick={() => {
                                                        onSubmit({
                                                            username: username,
                                                            email: email,
                                                            password: password,
                                                            gender: gender
                                                        })
                                                    }}
                                                >สมัครเลย! </Button></>)}

                                    </Grid>
                                </Grid>
                            </Paper>
                        </div>

                    </Box>
                    {isMobile &&(<div style={{height:"190px"}}></div>)}
                </Container>
            </Dialog>
        </React.Fragment>
    );
}
