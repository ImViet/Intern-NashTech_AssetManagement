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
// import Info from "../Info";
//import { disableUser } from "../reducer";

import { EDIT_ASSET_ID } from "src/constants/pages";
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
  { columnName: "Asset Code ", columnValue: "assetCode" },
  { columnName: "Asset Name ", columnValue: "assetName" },
  { columnName: "Category ", columnValue: "category" },
  { columnName: "State ", columnValue: "state" },
];

type Props = {
  users: IPagedModel<IUser> | null;
  result: IUser | null;
  handlePage: (page: number) => void;
  handleSort: (colValue: string) => void;
  sortState: SortType;
  fetchData: Function;
};

const AssetTable: React.FC<Props> = ({
  users,
  result,
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
      message: 'Do you want to disable this asset?',
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

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const navigate = useNavigate();
  const handleEdit = (id: number) => {
    navigate(EDIT_ASSET_ID(id));
  };

  let rows
  if (result && users) {
    rows = [...users.items]
    const index = rows.findIndex(r=>r.id === result.id)
    if(index >= 0){
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
        {/* {rows?.map((data, index) => (
          <tr key={index} className="">
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

        ))} */}
       <tr key='1' className="">
            <td>LA0001</td>
            <td>Laptop HP Probook 450 G1</td>
            <td>Laptop</td>
            <td>Available</td>
            <td className="d-flex">
              <ButtonIcon onClick={() => handleEdit(1)}>
                <PencilFill className="text-black" />
              </ButtonIcon>
              <ButtonIcon onClick={() => handleShowDisable(1)}>
                <XCircle className="text-danger mx-2" />
              </ButtonIcon>
            </td>
        </tr>
        <tr key='2' className="">
            <td>MO0001</td>
            <td>Monitor Dell UltraSharp</td>
            <td>Monitor</td>
            <td>Not available</td>
            <td className="d-flex">
              <ButtonIcon onClick={() => handleEdit(2)}>
                <PencilFill className="text-black" />
              </ButtonIcon>
              <ButtonIcon onClick={() => handleShowDisable(3)}>
                <XCircle className="text-danger mx-2" />
              </ButtonIcon>
            </td>
        </tr>
        <tr key='3' className="">
            <td>PC0001</td>
            <td>Personal Computer</td>
            <td>Personal Computer</td>
            <td>Assigned</td>
            <td className="d-flex">
              <ButtonIcon onClick={() => handleEdit(3)}>
                <PencilFill className="text-black" />
              </ButtonIcon>
              <ButtonIcon onClick={() => handleShowDisable(3)}>
                <XCircle className="text-danger mx-2" />
              </ButtonIcon>
            </td>
        </tr>
        <tr key='4' className="">
            <td>LA0002</td>
            <td>Personal Computer</td>
            <td>Personal Computer</td>
            <td>Available</td>
            <td className="d-flex">
              <ButtonIcon onClick={() => handleEdit(4)}>
                <PencilFill className="text-black" />
              </ButtonIcon>
              <ButtonIcon onClick={() => handleShowDisable(4)}>
                <XCircle className="text-danger mx-2" />
              </ButtonIcon>
            </td>
        </tr>
        <tr key='5' className="">
            <td>LA0003</td>
            <td>Personal Computer</td>
            <td>Personal Computer</td>
            <td>Available</td>
            <td className="d-flex">
              <ButtonIcon onClick={() => handleEdit(5)}>
                <PencilFill className="text-black" />
              </ButtonIcon>
              <ButtonIcon onClick={() => handleShowDisable(5)}>
                <XCircle className="text-danger mx-2" />
              </ButtonIcon>
            </td>
        </tr>
        <tr key='6' className="">
            <td>LA0004</td>
            <td>Personal Computer</td>
            <td>Personal Computer</td>
            <td>Available</td>
            <td className="d-flex">
              <ButtonIcon onClick={() => handleEdit(6)}>
                <PencilFill className="text-black" />
              </ButtonIcon>
              <ButtonIcon onClick={() => handleShowDisable(6)}>
                <XCircle className="text-danger mx-2" />
              </ButtonIcon>
            </td>
        </tr>
      </Table>
      {/* {userDetail && showDetail && (
        <Info user={userDetail} handleClose={handleCloseDetail} />
      )} */}
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

export default AssetTable;
