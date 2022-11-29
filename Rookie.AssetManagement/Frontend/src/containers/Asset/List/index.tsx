import React, { useEffect, useState } from "react";
import { FunnelFill } from "react-bootstrap-icons";
import { Search } from "react-feather";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import AssetTable from "./AssetTable";
import ISelectOption from "src/interfaces/ISelectOption";
import { Link, useLocation } from "react-router-dom";
import {
  ACCSENDING,
  DECSENDING,
  DEFAULT_PAGE_LIMIT,
  DEFAULT_ASSET_SORT_COLUMN_NAME,
} from "src/constants/paging";
import { FilterAssetStateOptions, FilterCategoryOptions } from "src/constants/selectOptions";
import IPagedModel from "src/interfaces/IPagedModel";
import { DefaultLimit } from "src/constants/User/UserContants";
import { getAssetList } from "../reducer";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";
import SelectBox from "src/components/SelectBox";

const ListAsset = () => {
  const dispatch = useAppDispatch();
  const { assets, actionResult } = useAppSelector((state) => state.assetReducer);

  const [query, setQuery] = useState({
    page: assets?.currentPage ?? 1,
    limit: DefaultLimit,
    sortOrder: DECSENDING,
    sortColumn: DEFAULT_ASSET_SORT_COLUMN_NAME,
  } as IQueryAssetModel);

  const [search, setSearch] = useState("");

  const [selectedState, setSelectedState] = useState([
    { id: 1, label: "State", value: "ALL" },
  ] as ISelectOption[]);

  const [selectedCategory, setSelectedCategory] = useState([
    { id: 1, label: "Category", value: "ALL" },
  ] as ISelectOption[]);

  const handleState = (selected: ISelectOption[]) => {
    if (selected.length === 0) {
      setQuery({
        ...query,
        types: ["ALL"],
      });

      setSelectedState([FilterAssetStateOptions[0]]);

      return;
    }

    const selectedAll = selected.find((item) => item.id === 1);

    setSelectedState((prevSelected) => {
      if (!prevSelected.some((item) => item.id === 1) && selectedAll) {
        setQuery({
          ...query,
          types: ["ALL"],
        });

        return [selectedAll];
      }
      const newSelected = selected.filter((item) => item.id !== 1);
      const types = newSelected.map((item) => item.value as string);

      setQuery({
        ...query,
        types,
      });

      return newSelected;
    });
    console.log(query)
  };
  
  const handleCategory = (selected: ISelectOption[]) => {
    if (selected.length === 0) {
      setQuery({
        ...query,
        types: ["ALL"],
      });

      setSelectedCategory([FilterCategoryOptions[0]]);

      return;
    }

    const selectedAll = selected.find((item) => item.id === 1);

    setSelectedCategory((prevSelected) => {
      if (!prevSelected.some((item) => item.id === 1) && selectedAll) {
        setQuery({
          ...query,
          types: ["ALL"],
        });

        return [selectedAll];
      }
      const newSelected = selected.filter((item) => item.id !== 1);
      const types = newSelected.map((item) => item.value as string);

      setQuery({
        ...query,
        types,
      });

      return newSelected;
    });
    console.log(query)
  };

  const handleChangeSearch = (e) => {
    e.preventDefault();

    const search = e.target.value;
    setSearch(search);
    console.log(query)
  };

  const handlePage = (page: number) => {
    setQuery({
      ...query,
      page,
    });
    console.log(query)
  };

  const handleSearch = () => {
    setQuery({
      ...query,
      search,
      page: 1
    });
    console.log(query)
  };

  const handleSort = (sortColumn: string) => {
    const sortOrder = query.sortOrder === ACCSENDING ? DECSENDING : ACCSENDING;
    setQuery({
      ...query,
      sortColumn,
      sortOrder,
    });
  };

  const fetchData = () => {
    dispatch(getAssetList(query))
  };

  useEffect(() => {
    fetchData();
  }, [query]);


  return (
    <>
      <div className="primaryColor text-title intro-x ">Asset List</div>

      <div>
        <div className="d-flex mb-5 intro-x">
          <div className="d-flex align-items-center w-md mr-5">
            <div className="button">
              <div className="filter-state">
                <SelectBox               
                options={FilterAssetStateOptions}
                placeholderButtonLabel="Type"
                value={selectedState}
                onChange={handleState}/>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center w-md mr-5">
            <div className="button">
                <div className="filter-category">
                  <SelectBox
                  options={FilterCategoryOptions}
                  placeholderButtonLabel="Type"
                  value={selectedCategory}
                  onChange={handleCategory}
                  />
                </div>
            </div>
          </div>
          <div className="d-flex align-items-center w-ld ml-auto mr-2">
            <div className="input-group">
              <input
                onChange={handleChangeSearch}
                value={search}
                type="text"
                className="input-search  form-control"
              />
              <span onClick={handleSearch} className=" search-icon p-1 pointer">
                <Search />
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center ml-3">
            <Link to="/asset/create" type="button" className="btn btn-danger">
              Create new asset
            </Link>
          </div>
        </div>

        <AssetTable
          assets={assets}
          result={actionResult}
          handlePage={handlePage}
          handleSort={handleSort}
          sortState={{
            columnValue: query.sortColumn,
            orderBy: query.sortOrder,
          }}
          fetchData={fetchData}
        />
      </div>
    </>
  );
};

export default ListAsset;
