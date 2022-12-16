import React, { useState } from "react";
import { PencilFill, XCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import ButtonIcon from "src/components/ButtonIcon";
import { NotificationManager } from 'react-notifications';

import Table, { SortType } from "src/components/Table";
import IColumnOption from "src/interfaces/IColumnOption";
import IPagedModel from "src/interfaces/IPagedModel";
import formatDateTime, { convertDDMMYYYY } from "src/utils/formatDateTime";
import Info from "../Info";
//import { disableUser } from "../reducer";

import { EDIT_ASSET_ID, EDIT_ASSIGNMENT_ID } from "src/constants/pages";
import ConfirmModal from "src/components/ConfirmModal";
import { useAppDispatch } from "src/hooks/redux";
import IAsset from "src/interfaces/Asset/IAsset";
import { Link } from "react-router-dom";


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
  handleDisable: Function;

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
  handleDisable,
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [assetDetail, setAssetDetail] = useState(null as IAsset | null);
  const [disableState, setDisable] = useState({
    isOpen: false,
    id: 0,
    title: '',
    message: (<></>),
    isDisable: true,
  });

  const handleShowInfo = (id: number) => {
    const asset = result?.id == id ? (result) : (assets?.items.find((item) => item.id === id));

    if (asset) {
      setAssetDetail(asset);
      setShowDetail(true);
    }
  };

  const handleShowDisable = async (id: number) => {
    const asset = assets?.items.find(i => i.id == id)
    if (!asset) {
      return;
    }
    if (asset.isHaveAsssignment) {
      setDisable({
        id,
        isOpen: true,
        title: 'Cannot Delete Asset',
        message: (<p>
          <p>Cannot delete the asset because it belongs to one or more historical assignments.</p>
          <p>If the asset is not able to be used anymore, please update its state in <Link to={EDIT_ASSIGNMENT_ID(id)}>Edit Asset page?</Link></p>
        </p>),
        isDisable: false,
      });
    } else {
      setDisable({
        id,
        isOpen: true,
        title: 'Are you sure?',
        message: (<>Do you want to delete this asset?</>),
        isDisable: true,
      });
    }
  };

  const handleCloseDisable = () => {
    setDisable({
      isOpen: false,
      id: 0,
      title: '',
      message: (<></>),
      isDisable: true,
    });
  };

  const onDisable = () => {
    handleDisable(disableState.id)
    setDisable({
      isOpen: false,
      id: 0,
      title: '',
      message: (<></>),
      isDisable: true,
    });
  }

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
    const index = rows.findIndex(r => r.id === result.id)
    if (index >= 0) {
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
          <tr key={index} className="" onClick={() => handleShowInfo(data.id)}>
            <td>{data.assetCode}</td>
            <td>{data.assetName}</td>
            <td>{data.category}</td>
            <td>{data.state}</td>
            <td className="d-flex">
              <ButtonIcon disable={!data.isEditable} onClick={() => handleEdit(data.id)}>
                <PencilFill className="text-black" />
              </ButtonIcon>
              <ButtonIcon disable={!data.isEditable} onClick={() => handleShowDisable(data.id)}>
                <XCircle className="text-danger mx-2" />
              </ButtonIcon>
            </td>
          </tr>

        ))}
      </Table>
      {assetDetail && showDetail && (
        <Info asset={assetDetail} handleClose={handleCloseDetail} />
      )}
      <ConfirmModal
        dialogClassName="asset-modal"
        title={disableState.title}
        isShow={disableState.isOpen}
        onHide={handleCloseDisable}
      >
        <div>

          <div className="text-start">
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
                  Delete
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
