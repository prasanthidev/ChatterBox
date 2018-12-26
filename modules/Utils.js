//Type your code here
var isMenuOpen = 0;

function onMenuClick() {
  if(isMenuOpen % 2 === 0) {
  	frmChatListKA.flxOptionsKA.setVisibility(true);
  } else {
    frmChatListKA.flxOptionsKA.setVisibility(false);
  }
  
  isMenuOpen++;
}

