import React from 'react';
import './button-install.css';
import { useReactPWAInstall } from './components/pwa-install';
import { Grid } from '@mui/material';
import RegisterDialog from './components/RegisterDialog';
import { isMobile, isAndroid, isFirefox, isIOS, isOpera, browserVersion } from "mobile-device-detect";
import pkg from '../package.json'

function App() {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const [ipv4, setIPv4] = React.useState<string>("")
  const [play, setPlay] = React.useState<boolean>(false)
  const [register, setRegister] = React.useState<boolean>(false)
  const [newUpdate, setNewUpdate] = React.useState<boolean>(false)

  const handleClickPlay = () => {
    setPlay(true)
  }

  const handleClickRegister = () => {
    setRegister(true)
  }

  const handleCloseRegister = () => {
    setRegister(false)
  }

  const handleClickUpdate = () => {
    if ('caches' in window) {
      caches.keys().then(function (cacheNames) {
        cacheNames.forEach(function (cacheName) {
          caches.delete(cacheName);
          window.location.reload()
        });
      });
    }
  }


  function validateVersion(v: string) {
    fetch("https://raw.githubusercontent.com/n-devs/ro-saga/main/package.json").then(res => res.json())
      .then(data => {
        if (pkg.version === data.version) {
          setNewUpdate(false)
        } else {
          let pa = pkg.version.split(".")
          let da = data.version.split(".")

          if (pa[0] < da[0]) {
            setNewUpdate(true)
          } else if (pa[0] === da[0]) {
            if (pa[1] < da[1]) {
              setNewUpdate(true)
            } else if (pa[1] === da[1]) {
              if (pa[2] < da[2]) {
                setNewUpdate(true)
              } else if (pa[2] === da[2]) {
                setNewUpdate(true)
              } else {
                setNewUpdate(false)
              }
            } else {
              setNewUpdate(false)
            }
          } else {
            setNewUpdate(false)
          }
        }

      })
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
    validateVersion(pkg.version)

  }, [])

  return (
    <>

      {play ? (<>
        {isInstalled() ? (<>
          {ipv4 && (<object data={`https://${ipv4}:8000`} width="100%" height="100%" style={{ border: "none" }} ></object>)}
        </>) : (<>
          <div id="box-install" style={{
            position: 'fixed',
            zIndex: 1,
            bottom: '10vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <button className="button-install" style={{
              display: 'block',
              fontSize: 'xxx-large',
              fontWeight: 'bold',
            }} onClick={handleClickInstall}>
              Install
            </button>
          </div>
        </>)}

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
                    fontSize: isMobile ? "large" : 'xxx-large',
                    fontWeight: 'bold',
                  }} onClick={handleClickRegister}>
                    Register
                  </button>
                </Grid>
                {newUpdate ? (<>
                  <Grid item xs={6} >
                    <button className="button-install" style={{
                      display: 'block',
                      fontSize: isMobile ? "large" : 'xxx-large',
                      fontWeight: 'bold',
                    }} onClick={handleClickUpdate}>
                      Update Now!
                    </button>
                  </Grid>
                </>) : (<>
                  <Grid item xs={6} >
                    <button className="button-install" style={{
                      display: 'block',
                      fontSize: isMobile ? "large" : 'xxx-large',
                      fontWeight: 'bold',
                    }} onClick={handleClickPlay}>
                      Play Now!
                    </button>
                  </Grid>
                </>)}

              </Grid>
            </Grid>
            <Grid item xs={12} style={{
              justifyContent: 'center',
              display: 'flex',
            }}>
              {!isInstalled() && (
                <button className="button-install" style={{
                  display: 'block',
                  fontSize: isMobile ? "large" : 'xxx-large',
                  fontWeight: 'bold',
                }} onClick={handleClickInstall}>
                  Install
                </button>
              )}
            </Grid>
          </Grid>
        </div>
      </>)}
      <span style={{
        fontSize: '10px',
        fontWeight: 'lighter',
        position: 'fixed',
        bottom: '0',
        right: '3px',
      }}>v{pkg.version}</span>
    </>
  );
}

export default App;
