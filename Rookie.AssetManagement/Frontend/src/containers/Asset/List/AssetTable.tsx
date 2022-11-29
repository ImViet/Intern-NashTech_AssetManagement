import React, { useState } from "react";
import { PencilFill, XCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import ButtonIcon from "src/components/ButtonIcon";
import { NotificationManager } from 'react-notifications';

import Table, { SortType } from "src/components/Table";
import IColumnOption from "src/interfaces/IColumnOption";
import IPagedModel from "src/interfaces/IPagedModel";
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
import IAsset from "src/interfaces/Asset/IAsset";


const columns: IColumnOption[] = [
  { columnName: "Asset Code ", columnValue: "assetCode" },
  { columnName: "Asset Name ", columnValue: "assetName" },
  { columnName: "Category ", columnValue: "category" },
  { columnName: "State ", columnValue: "state" },
];

type Props = {
  assets: IPagedModel<IAsset> | null;
  result: IAsset | null;
  handlePage: (page: number) => void;
  handleSort: (colValue: string) => void;
  sortState: SortType;
  fetchData: Function;
};

const AssetTable: React.FC<Props> = ({
  assets,
  result,
  handlePage,
  handleSort,
  sortState,
  fetchData,
}) => {
  const dispatch = useAppDispatch();

  const [showDetail, setShowDetail] = useState(false);
  const [userDetail, setUserDetail] = useState(null as IAsset | null);
  const [disableState, setDisable] = useState({
    isOpen: false,
    id: 0,
    title: '',
    message: '',
    isDisable: true,
  });

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
  if (result && assets) {
    rows = [...assets.items]
    const index = rows.findIndex(r=>r.id === result.id)
    if(index >= 0){
      rows.splice(index, 1)
    }
    rows.unshift(result)  
  } else if (assets) {
    rows = [...assets.items]
  }

  return (
    <>
      <Table
        columns={columns}
        handleSort={handleSort}
        sortState={sortState}
        page={{
          currentPage: assets?.currentPage,
          totalPage: assets?.totalPages,
          handleChange: handlePage,
        }}
      >
        {rows?.map((data, index) => (
          <tr key={index} className="">
            <td>{data.assetCode}</td>
            <td>{data.assetName}</td>
            <td>{data.category}</td>
            <td>{data.state}</td>
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