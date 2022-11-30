import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import AssetFormContainer from "../AssetForm";
import { getAssetFormData } from "../reducer";

const UpdateAssetContainer = () => {
    const { id } = useParams<{ id: string }>();
    const { assetFormData } = useAppSelector((state) => state.assetReducer);
    const dispatch = useAppDispatch();
    useEffect(()=>{
      dispatch(getAssetFormData(Number(id)))
    }, [])
  
    return (
      <div className="ml-5">
        <div className="primaryColor text-title intro-x">Edit Asset</div>
  
        <div className="row">
          {assetFormData && <AssetFormContainer initialAssetForm={assetFormData}/>}
        </div>
      </div>
    );
  };
  
  export default UpdateAssetContainer;