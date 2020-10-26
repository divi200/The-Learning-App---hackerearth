import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      promptEvent: null,
      appAccepted: false
    };

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      this.setState({ promptEvent: e });
    });

    this.installApp = this.installApp.bind(this);
  }

  installApp() {
    const { promptEvent } = this.state;
    // console.log('Init Func ==>', promptEvent);

    promptEvent.prompt();
    promptEvent.userChoice.then(result => {
      if (result.outcome === 'accepted') {
        // console.log('User accepted the A2HS prompt');
        this.setState({ appAccepted: true });
      } else {
        // console.log('User dismissed the A2HS prompt');
      }
    });
  }

  render() {
    const { promptEvent, appAccepted } = this.state;
    let isAppInstalled = false;

    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      appAccepted
    ) {
      isAppInstalled = true;
    }

    return (
      <Menu stackable inverted size="massive" style={{backgroundColor: "purple"}}>
        <Menu.Item>
          <h1
            style={{
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Test your skills by taking quiz in various domains
          </h1>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Header;
