import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import ConfirmModal from "src/components/ConfirmModal";
import { HOME } from "src/constants/pages";

import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { isNumber } from "util";
import { logout } from "../Authorize/reducer";
import ChangePassword from "../Authorize/ChangePassword";

// eslint-disable-next-line react/display-name
const CustomToggle = React.forwardRef<any, any>(({ children, onClick }, ref): any => (
  <a
    className="btn btn-link dropdownButton"
    ref={ref as any}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children} <span>&#x25bc;</span>
  </a>
));

const Header = () => {
  const navigate = useNavigate();
  const location= useLocation();
  const { account, isAuth } = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();

  const [showModalChangePassword, setShowModalChangePassword] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const headerName = () => {
    const pathnameSplit = location.pathname.split('/');
    pathnameSplit.shift();

    // pathnameSplit.forEach(split=>{
    //   if(split == "asset"){
    //     const index = pathnameSplit.findIndex(s=>s== split)
    //     pathnameSplit[index] = "Manage Asset";
    //   }
      
    //   else if(split == "create"){
    //     const index = pathnameSplit.findIndex(s=>s== split)
    //     pathnameSplit[index] = "Create Asset";
    //   }
    //   else if(split == "edit"){
    //     const index = pathnameSplit.findIndex(s=>s== split)
    //     pathnameSplit[index] = "Edit Asset";
    //   }else if(!isNaN(Number(split)) || split == "*"){
    //     const index = pathnameSplit.findIndex(s=>s== split)
    //     pathnameSplit.splice(index,1)
    //   }
    //   if(split == "user"){
    //     const index = pathnameSplit.findIndex(s=>s== split)
    //     pathnameSplit[index] = "Manage User";
    //   }
    //   else if(split == "create"){
    //     const index = pathnameSplit.findIndex(s=>s== split)
    //     pathnameSplit[index] = "Create User";
    //   }
    //   else if(split == "edit"){
    //     const index = pathnameSplit.findIndex(s=>s== split)
    //     pathnameSplit[index] = "Edit User";
    //   }else if(!isNaN(Number(split)) || split == "*"){
    //     const index = pathnameSplit.findIndex(s=>s== split)
    //     pathnameSplit.splice(index,1)
    //   }
      
    // })
    let type="";
    pathnameSplit.forEach(split=>{
      if(split == "user"){
        const index = pathnameSplit.findIndex(s=>s== split)
        pathnameSplit[index] = "Manage User";
        type="user";
      }
      if(split == "asset"){
        const index = pathnameSplit.findIndex(s=>s== split)
        pathnameSplit[index] = "Manage Asset";
        type="asset"
      } 
      if(split == "assignment"){
        const index = pathnameSplit.findIndex(s=>s== split)
        pathnameSplit[index] = "Manage Assignment";
        type="assignment"
      } 
      if(type=="user")
      {
        if(split == "create"){
          const index = pathnameSplit.findIndex(s=>s== split)
          pathnameSplit[index] = "Create New User";
        }
        else if(split == "edit"){
          const index = pathnameSplit.findIndex(s=>s== split)
          pathnameSplit[index] = "Edit User";
        }else if(!isNaN(Number(split)) || split == "*"){
          const index = pathnameSplit.findIndex(s=>s== split)
          pathnameSplit.splice(index,1)
        }
      } 
      else if(type=="asset")
      {
        if(split == "create"){
          const index = pathnameSplit.findIndex(s=>s== split)
          pathnameSplit[index] = "Create New Asset";
        }
        else if(split == "edit"){
          const index = pathnameSplit.findIndex(s=>s== split)
          pathnameSplit[index] = "Edit Asset";
        }else if(!isNaN(Number(split)) || split == "*"){
          const index = pathnameSplit.findIndex(s=>s== split)
          pathnameSplit.splice(index,1)
        }     
      }       
      else if(type=="assignment")
      {
        if(split == "create"){
          const index = pathnameSplit.findIndex(s=>s== split)
          pathnameSplit[index] = "Create New Assignment";
        }
        else if(split == "edit"){
          const index = pathnameSplit.findIndex(s=>s== split)
          pathnameSplit[index] = "Edit Assignment";
        }else if(!isNaN(Number(split)) || split == "*"){
          const index = pathnameSplit.findIndex(s=>s== split)
          pathnameSplit.splice(index,1)
        }     
      }            
    })
    
    return pathnameSplit.join(' > ').toString() || 'Home' ;
  }

  const openModal = () => {
    setShowModalChangePassword(true);
  };
  const hideChangePass = ()=>{
    setShowModalChangePassword(false);
  }

  const handleLogout = () => {
    setShowConfirmLogout(true);
  };

  const handleCancleLogout = () => {
    setShowConfirmLogout(false);
  };

  const handleConfirmedLogout = () => {
    navigate(HOME);
    setShowConfirmLogout(false);
    dispatch(logout());
  };
  
  return (
    <>
      <div className='header align-items-center font-weight-bold'>
        <div className="container-lg-min container-fluid d-flex ">
          {(headerName().toLowerCase() === "login") ? (
            <div className="d-flex" style={{ marginLeft: 110 }}>
              <img src={window.location.origin + '/images/Logo_lk.png'} alt="" width={45} height={45} className="logo" style={{ marginTop: 2, marginRight: 50 }} />
              <p className='headText'>Online Asset Management</p>
            </div>
          ) : (
            <p className='headText'>{`${headerName()}`}</p>
          )}
          {isAuth && (
            <div className='ml-auto text-white'>
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  {account?.userName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={openModal}>
                    Change Password
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        title="Are you sure"
        isShow={showConfirmLogout}
        onHide={handleCancleLogout}
      >
        <div>
          <div className="text-center">Do you want to log out?</div>
          <div className="text-center mt-3">
            <button className="btn btn-danger mr-3" onClick={handleConfirmedLogout} type="button">Log out</button>
            <button className="btn btn-outline-secondary" onClick={handleCancleLogout} type="button">Cancel</button>
          </div>
        </div>
      </ConfirmModal>
      <ChangePassword show={showModalChangePassword} onClose={hideChangePass} />
    </>
  );
};

export default Header;
