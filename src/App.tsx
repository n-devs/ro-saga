import React from 'react';
import './button-install.css';
import { useReactPWAInstall } from './components/pwa-install';
import { Grid } from '@mui/material';
import RegisterDialog from './components/RegisterDialog';

function App() {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const [ipv4, setIPv4] = React.useState<string>("")
  const [play, setPlay] = React.useState<boolean>(false)
  const [register, setRegister] = React.useState<boolean>(false)

  const handleClickPlay = () => {
    setPlay(true)
  }

  const handleClickRegister = () => {
    setRegister(true)
  }

  const handleCloseRegister = () => {
    setRegister(false)
  }

  const handleClickInstall = () => {
    pwaInstall({
      title: "Install RO Saga Launcher",
      logo: "favicon.ico",
      features: (
        <ul>
          <li>เพื่อเป็นทางเข้าในรูปแบบ Application โดยไม่ต้องเข้าผ่านเว็บไซต์</li>
          <li>Offline Mode</li>
          <li>Suport Window, MacOS, ChromeOS, Android, IOS</li>
        </ul>
      ),
      description: "Ragnarok Saga เป็นเกม MMORPG Online ยดนิยมสามารถเล่นได้ทุกแพลตฟอร์ม",
    })
      .then(() => {
        console.log("App installed successfully or the install instruction was shown");
      })
      .catch(() => {
        console.log("App not installed, user opted out.");

      });
  };
  React.useEffect(() => {
    if (isInstalled()) {
      fetch("https://raw.githubusercontent.com/n-devs/public-ip/data/ip-address.json").then(res => res.json())
        .then(data => {
          setIPv4(data.ipv4)
        })
    }
  }, [])

  return (
    <>
      {play ? (<>
        {ipv4 && (<iframe src={`https://${ipv4}:8000`} width="100%" height="100%" style={{ border: "none" }} allowFullScreen={true}></iframe>)}
      </>) : (<>
        <RegisterDialog open={register} ipv4={ipv4} onClose={handleCloseRegister}></RegisterDialog>
        <div id="box-install" style={{
          position: 'fixed',
          zIndex: 1,
          bottom: '10vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6} style={{
                  justifyContent: 'flex-end',
                  display: 'flex',
                }}>
                  <button className="button-install" style={{
                    display: 'block',
                    fontSize: 'xxx-large',
                    fontWeight: 'bold',
                  }} onClick={handleClickRegister}>
                    Register
                  </button>
                </Grid>
                <Grid item xs={6} >
                  <button className="button-install" style={{
                    display: 'block',
                    fontSize: 'xxx-large',
                    fontWeight: 'bold',
                  }} onClick={handleClickPlay}>
                    Play Now!
                  </button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{
              justifyContent: 'center',
              display: 'flex',
            }}>
              {!isInstalled() && (
                <button className="button-install" style={{
                  display: 'block',
                  fontSize: 'xxx-large',
                  fontWeight: 'bold',
                }} onClick={handleClickInstall}>
                  Install
                </button>
              )}
            </Grid>
          </Grid>
        </div>
      </>)}
    </>
  );
}

export default App;
