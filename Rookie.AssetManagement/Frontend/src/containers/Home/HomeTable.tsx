import React, { useState } from "react";
import { ArrowCounterclockwise, CheckLg, XLg } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import ButtonIcon from "src/components/ButtonIcon";
import { NotificationManager } from 'react-notifications';

import Table, { SortType } from "src/components/Table";
import IColumnOption from "src/interfaces/IColumnOption";
import IPagedModel from "src/interfaces/IPagedModel";
import IUser from "src/interfaces/User/IUser";
import formatDateTime from "src/utils/formatDateTime";

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
    { columnName: "Asset Code ", columnValue: "assetCode" },
    { columnName: "Asset Name ", columnValue: "assetName" },
    { columnName: "Category ", columnValue: "category" },
    { columnName: "Assigned Date ", columnValue: "assgignedDate" },
    { columnName: "State ", columnValue: "state" },
];

type Props = {
    //users: IPagedModel<IUser> | null;
    handlePage: (page: number) => void;
    handleSort: (colValue: string) => void;
    sortState: SortType;
    fetchData: Function;
};

const HomeTable: React.FC<Props> = ({
    // users,
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

    // const handleShowInfo = (id: number) => {
    //     const user = users?.items.find((item) => item.id === id);

    //     if (user) {
    //         setUserDetail(user);
    //         setShowDetail(true);
    //     }
    // };

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
            // page={{
            //     currentPage: users?.currentPage,
            //     totalPage: users?.totalPages,
            //     handleChange: handlePage,
            // }}
            >
                {/* {users?.items.map((data, index) => (
                    <tr key={index} className="" onClick={() => handleShowInfo(data.id)}>
                        <td>{data.staffCode}</td>
                        <td>{data.fullName}</td>
                        <td>{data.userName}</td>
                        <td>{data.joinedDate}</td>
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
                <tr key={0} className="">
                    <td>PC100125</td>
                    <td>Personal Cumputer</td>
                    <td>Personal Computer</td>
                    <td>07/06/2020</td>
                    <td>Accepted</td>

                    <td className="d-flex">
                        <ButtonIcon >
                            <CheckLg className="text-danger" />
                        </ButtonIcon>
                        <ButtonIcon >
                            <XLg className="text-danger mx-2" />
                        </ButtonIcon>
                        <ButtonIcon >
                            <ArrowCounterclockwise className="text-primary " />
                        </ButtonIcon>
                    </td>
                </tr>
                <tr key={1} className="">
                    <td>LA100125</td>
                    <td>Personal Cumputer</td>
                    <td>Personal Computer</td>
                    <td>07/08/2020</td>
                    <td>Accepted</td>

                    <td className="d-flex">
                        <ButtonIcon >
                            <CheckLg className="text-danger" />
                        </ButtonIcon>
                        <ButtonIcon >
                            <XLg className="text-danger mx-2" />
                        </ButtonIcon>
                        <ButtonIcon >
                            <ArrowCounterclockwise className="text-primary " />
                        </ButtonIcon>
                    </td>
                </tr>
            </Table>
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

export default HomeTable;
