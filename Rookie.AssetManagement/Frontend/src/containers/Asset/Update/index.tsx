import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ASSET_LIST_LINK } from "src/constants/pages";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import AssetFormContainer from "../AssetForm";
import { getAssetFormData } from "../reducer";

const UpdateAssetContainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { assetFormData } = useAppSelector((state) => state.assetReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAssetFormData(Number(id)))
  }, [])

  useEffect(() => {
    if (assetFormData?.isEditable == false) {
      navigate(ASSET_LIST_LINK)
    }
  }, [assetFormData?.state])

  return (
    <div className="ml-5">
      <div className="primaryColor text-title intro-x">Edit Asset</div>

      <div className="row">
        {assetFormData && <AssetFormContainer initialAssetForm={assetFormData} />}
      </div>
    </div>
  );
};

export default UpdateAssetContainer;