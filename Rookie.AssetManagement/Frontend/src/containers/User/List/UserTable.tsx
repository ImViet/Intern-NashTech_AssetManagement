import React, { useState } from "react";
import { PencilFill, XCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import ButtonIcon from "src/components/ButtonIcon";
import { NotificationManager } from 'react-notifications';

import Table, { SortType } from "src/components/Table";
import IColumnOption from "src/interfaces/IColumnOption";
import IPagedModel from "src/interfaces/IPagedModel";
import IUser from "src/interfaces/User/IUser";
import formatDateTime, { convertDDMMYYYY } from "src/utils/formatDateTime";
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
import { resultsAriaMessage } from "react-select/src/accessibility";


const columns: IColumnOption[] = [
  { columnName: "Staff Code ", columnValue: "staffCode" },
  { columnName: "Full Name ", columnValue: "fullName" },
  { columnName: "Username ", columnValue: "userName" },
  { columnName: "Joined Date ", columnValue: "joinedDate" },
  { columnName: "Type ", columnValue: "Type" },
];

type Props = {
  users: IPagedModel<IUser> | null;
  result: IUser | null;
  handlePage: (page: number) => void;
  handleSort: (colValue: string) => void;
  sortState: SortType;
  fetchData: Function;
  handleDisable: Function;
};

const UserTable: React.FC<Props> = ({
  users,
  result,
  handlePage,
  handleSort,
  sortState,
  fetchData,
  handleDisable
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
    const user = result?.id == id ? (result) : (users?.items.find((item) => item.id === id));

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
      title: 'Are you sure?',
      message: 'Do you want to disable this user?',
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

  const onDisable = () => {
    handleDisable(disableState.id)
    setDisable({
      isOpen: false,
      id: 0,
      title: '',
      message: '',
      isDisable: true,
    });
  }

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

  let rows
  if (result && users) {
    rows = [...users.items]
    const index = rows.findIndex(r => r.id === result.id)
    if (index >= 0) {
      rows.splice(index, 1)
    }
    rows.unshift(result)
  } else if (users) {
    rows = [...users.items]
  }

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
        {rows?.map((data, index) => (
          <tr key={index} className="" onClick={() => handleShowInfo(data.id)}>
            <td>{data.staffCode}</td>
            <td>{data.fullName}</td>
            <td>{data.userName}</td>
            <td>{convertDDMMYYYY(data.joinedDate)}</td>
            <td>{getUserTypeName(data.type)}</td>

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

          <div className="text-start ">
            {disableState.message}
          </div>
          {
            disableState.isDisable && (
              <div className="text-start mt-3">
                <button
                  className="btn btn-danger mr-3"
                  type="button"
                  onClick={onDisable}
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
