import React, { useState } from "react";
import { PencilFill, XCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import ButtonIcon from "src/components/ButtonIcon";
import { NotificationManager } from 'react-notifications';

import Table, { SortType } from "src/components/Table";
import IColumnOption from "src/interfaces/IColumnOption";
import IPagedModel from "src/interfaces/IPagedModel";
import IUser from "src/interfaces/User/IUser";
import formatDateTime from "src/utils/formatDateTime";
import Info from "../Info";
//import { disableUser } from "../reducer";

import { EDIT_USER_ID } from "src/constants/pages";
import ConfirmModal from "src/components/ConfirmModal";
import { useAppDispatch } from "src/hooks/redux";
import {
  AdminUserType,
  StaffUserType,
  AllUserType,
  AdminUserTypeLabel,
  StaffUserTypeLabel,
  AllUserTypeLabel,
} from "src/constants/User/UserContants";


const columns: IColumnOption[] = [
  { columnName: "Staff Code ", columnValue: "staffCode" },
  { columnName: "Full Name ", columnValue: "fullName" },
  { columnName: "Username ", columnValue: "userName" },
  { columnName: "Joined Date ", columnValue: "joinedDate" },
  { columnName: "Role Type ", columnValue: "Type" },
];

type Props = {
  users: IPagedModel<IUser> | null;
  handlePage: (page: number) => void;
  handleSort: (colValue: string) => void;
  sortState: SortType;
  fetchData: Function;
};

const UserTable: React.FC<Props> = ({
  users,
  handlePage,
  handleSort,
  sortState,
  fetchData,
}) => {
  const dispatch = useAppDispatch();

  const [showDetail, setShowDetail] = useState(false);
  const [userDetail, setUserDetail] = useState(null as IUser | null);
  const [disableState, setDisable] = useState({
    isOpen: false,
    id: 0,
    title: '',
    message: '',
    isDisable: true,
  });

  const handleShowInfo = (id: number) => {
    const user = users?.items.find((item) => item.id === id);

    if (user) {
      setUserDetail(user);
      setShowDetail(true);
    }
  };

  const getUserTypeName = (type: string) => {
    return type == AdminUserType ? AdminUserTypeLabel : StaffUserTypeLabel;
  }

  const handleShowDisable = async (id: number) => {
    setDisable({
      id,
      isOpen: true,
      title: 'Are you sure',
      message: 'Do you want to disable this User?',
      isDisable: true,
    });
  };

  const handleCloseDisable = () => {
    setDisable({
      isOpen: false,
      id: 0,
      title: '',
      message: '',
      isDisable: true,
    });
  };

  // const handleConfirmDisable = () => {
  //   dispatch(disableUser({
  //     handleResult,
  //     brandId: disableState.id,
  //   }));
  // };
  // const handleResult = (result: boolean, message: string) => {
  //   if (result) {
  //     handleCloseDisable();
  //     fetchData();
  //     NotificationManager.success(
  //       `Remove Brand Successful`,
  //       `Remove Successful`,
  //       2000,
  //   );
  //   } else {
  //     setDisable({
  //       ...disableState,
  //       title: 'Can not disable Brand',
  //       message,
  //       isDisable: result
  //     });
  //   }
  // };



  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const navigate = useNavigate();
  const handleEdit = (id: number) => {
    navigate(EDIT_USER_ID(id));
  };

  return (
    <>
      <Table
        columns={columns}
        handleSort={handleSort}
        sortState={sortState}
        page={{
          currentPage: users?.currentPage,
          totalPage: users?.totalPages,
          handleChange: handlePage,
        }}
      >
        {users?.items.map((data, index) => (
          <tr key={index} className="" onClick={() => handleShowInfo(data.id)}>
            <td>{data.staffCode}</td>
            <td>{data.fullName}</td>
            <td>{data.userName}</td>
            <td>{data.joinedDate}</td>
            <td>{getUserTypeName(data.roleType)}</td>

            <td className="d-flex">
              <ButtonIcon onClick={() => handleEdit(data.id)}>
                <PencilFill className="text-black" />
              </ButtonIcon>
              <ButtonIcon onClick={() => handleShowDisable(data.id)}>
                <XCircle className="text-danger mx-2" />
              </ButtonIcon>
            </td>
          </tr>

        ))}
        <tr >
          <td>SD0001</td>
          <td>abc</td>
          <td>an</td>
          <td>11/10/2001</td>
          <td>staff</td>
          <td className="d-flex">
            <ButtonIcon >
              <PencilFill className="text-black" />
            </ButtonIcon>
            <ButtonIcon >
              <XCircle className="text-danger mx-2" />
            </ButtonIcon>
          </td>
        </tr>
        <tr >
          <td>SD0002</td>
          <td>abc</td>
          <td>an</td>
          <td>11/10/2001</td>
          <td>staff</td>
          <td className="d-flex">
            <ButtonIcon >
              <PencilFill className="text-black" />
            </ButtonIcon>
            <ButtonIcon >
              <XCircle className="text-danger mx-2" />
            </ButtonIcon>
          </td>
        </tr>
        <tr >
          <td>SD0003</td>
          <td>abc</td>
          <td>an</td>
          <td>11/10/2001</td>
          <td>staff</td>
          <td className="d-flex">
            <ButtonIcon >
              <PencilFill className="text-black" />
            </ButtonIcon>
            <ButtonIcon >
              <XCircle className="text-danger mx-2" />
            </ButtonIcon>
          </td>
        </tr>
      </Table>
      {userDetail && showDetail && (
        <Info user={userDetail} handleClose={handleCloseDetail} />
      )}
      <ConfirmModal
        title={disableState.title}
        isShow={disableState.isOpen}
        onHide={handleCloseDisable}
      >
        <div>

          <div className="text-center">
            {disableState.message}
          </div>
          {
            disableState.isDisable && (
              <div className="text-center mt-3">
                <button
                  className="btn btn-danger mr-3"
                  type="button"
                >
                  Disable
                </button>

                <button
                  className="btn btn-outline-secondary"
                  onClick={handleCloseDisable}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            )
          }
        </div>
      </ConfirmModal>
    </>
  );
};

export default UserTable;
